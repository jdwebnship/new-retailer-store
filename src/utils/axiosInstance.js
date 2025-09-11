import axios from "axios";

const baseConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
};

// Axios instance for APIs that require authentication
const authenticatedAxios = axios.create(baseConfig);

// Axios instance for APIs that work without authentication
const publicAxios = axios.create(baseConfig);

// Add token to authenticated requests
authenticatedAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Export both instances
export { authenticatedAxios, publicAxios };

// Default export for backward compatibility (authenticated)
export default authenticatedAxios;
