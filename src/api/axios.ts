// 

// src/api/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  withCredentials: true, // 🔥 Essential for sending cookies automatically
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR - Minimal & Clean
axiosInstance.interceptors.request.use(
  (config) => {
    // Optional: Add request logging in development
    if (import.meta.env.DEV) {
      // console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR - Handles 401 gracefully
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;

    // Handle 401 Unauthorized (Token invalid/expired)
    if (response?.status === 401) {
      console.warn("🔐 Session expired or invalid - AuthContext will handle");
      
      // Clear user state by emitting event (AuthContext listens for this)
      window.dispatchEvent(new CustomEvent("auth:unauthorized"));
    }

    // Handle other common errors (optional)
    else if (response?.status === 404) {
      console.error("🔍 Resource not found:", config.url);
    }
    else if (response?.status === 500) {
      console.error("🚨 Server error:", config.url);
    }
    else if (!response) {
      console.error("🌐 Network error - server unreachable");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;