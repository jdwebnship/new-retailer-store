import axios from 'axios';

// Store cancel tokens for active requests
const pendingRequests = new Map();

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // baseURL: "http://192.168.29.103:8001/api/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Add API Key
    const apiKey = import.meta.env.VITE_API_KEY;
    if (apiKey) {
      config.headers['API-KEY'] = apiKey;
    }

    // Add User Token (from localStorage)
    const persistedState = localStorage.getItem("reduxState");
    if (persistedState) {
      try {
        const parsedState = JSON.parse(persistedState);
        const token = parsedState?.auth?.user?.token;
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      } catch (err) {
        console.error("Failed to parse reduxState:", err);
      }
    }

    // Create a unique key for the request (URL + params)
    const requestKey = `${config.url}_${JSON.stringify(config.params)}`;

    // Create a new cancel token for the current request
    const source = axios.CancelToken.source();
    config.cancelToken = source.token;
    pendingRequests.set(requestKey, source);

    return config;
  },
  (error) => {
    console.error("Interceptor Error", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const requestKey = `${response.config.url}_${JSON.stringify(response.config.params)}`;
    pendingRequests.delete(requestKey);
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.resolve(null); // canceled request
    }
    const requestKey = `${error.config?.url}_${JSON.stringify(error.config?.params)}`;
    pendingRequests.delete(requestKey);
    console.error("Response Error", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
