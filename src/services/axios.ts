import { config } from "@/lib/config";
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";

// Define base API configuration
const baseConfig = {
  baseURL: config.baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

// Create Axios instance
const axiosInstance: AxiosInstance = axios.create(baseConfig);

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // would ideally check for token and add it to the header here
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    //Error logging being carried out here (401 unauthorized error can also be handled here)

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.error("Resource not found:", error.config?.url);
    }

    // Handle 500 Internal Server Error
    if (error.response?.status === 500) {
      console.error("Server error:", error.message);
    }

    // Network errors
    if (error.message === "Network Error") {
      console.error("Network error - please check your internet connection");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
