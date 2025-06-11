import axios from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_BASE_URI;

export const axiosConfig = axios.create({
  baseURL,
});

// REQUEST INTERCEPTOR
axiosConfig.interceptors.request.use(
  (config) => {
    const cookieStr = Cookies.get("rizoUser");
    if (cookieStr) {
      try {
        const cookie = JSON.parse(cookieStr);
        const accessToken = cookie.accessToken;
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
      } catch (error) {
        console.error("Invalid rizoUser cookie format:", error);
        Cookies.remove("rizoUser");
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR FOR TOKEN REFRESH
axiosConfig.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const cookieStr = Cookies.get("rizoUser");
        if (!cookieStr) throw new Error("No refresh token available");

        const cookie = JSON.parse(cookieStr);
        const refreshToken = cookie.refreshToken;
        const { data } = await axios.post(
          `${baseURL}users/auth/refresh-token`,
          {
            refreshToken,
          }
        );

        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken;

        const updatedCookie = {
          ...cookie,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        };
        Cookies.set("rizoUser", JSON.stringify(updatedCookie), { expires: 7 });

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosConfig(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        Cookies.remove("rizoUser");
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosConfig;
