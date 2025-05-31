import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URI
export const axiosConfig = axios.create({
  baseURL,
});

axiosConfig.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default axiosConfig;
