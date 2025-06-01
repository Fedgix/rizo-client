import axios from "axios";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_BASE_URI;

export const axiosConfig = axios.create({
  baseURL,
  withCredentials: true, 
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

axiosConfig.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");
    
    
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

axiosConfig.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          const newAccessToken = Cookies.get("accessToken");
          if (newAccessToken) {
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          }
          return axiosConfig(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosConfig.post('/users/auth/refresh-token');
                const newAccessToken = Cookies.get("accessToken");
        
        if (newAccessToken) {
          processQueue(null, newAccessToken);
          
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          
          return axiosConfig(originalRequest);
        } else {
          throw new Error("No access token received after refresh");
        }
        
      } catch (refreshError) {
        console.log("catching error")
        processQueue(refreshError, null);
        
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("rizoUser");
        
   
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosConfig;