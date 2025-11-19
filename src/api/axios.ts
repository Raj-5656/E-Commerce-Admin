// axiosInstance.js
import axios from 'axios';

const axiosInterceptor = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  withCredentials: true, // 👈 crucial for cookies
});

// Request interceptor (optional)
axiosInterceptor.interceptors.request.use(
  (config) => {
    console.log('Sending request with credentials');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (e.g., handle 401 for expired sessions)
axiosInterceptor.interceptors.response.use(
  (response) => {
    // Cookies are already handled by browser — nothing to do here!
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login, clear local state, etc.
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInterceptor;