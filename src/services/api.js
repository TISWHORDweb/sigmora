import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Check if token is expired or about to expire (within 5 minutes)
const isTokenExpired = () => {
  const expiresAt = localStorage.getItem('tokenExpiresAt');
  if (!expiresAt) return true;
  
  const expirationTime = new Date(expiresAt).getTime();
  const currentTime = new Date().getTime();
  const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
  
  // Return true if expired or expires within 5 minutes
  return (expirationTime - currentTime) < fiveMinutes;
};

// Refresh token function
const refreshToken = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const response = await axios.post(
      `${API_URL}/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { token: newToken, expiresAt } = response.data;
    localStorage.setItem('token', newToken);
    localStorage.setItem('tokenExpiresAt', expiresAt);
    
    return newToken;
  } catch (error) {
    // If refresh fails, logout user
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiresAt');
    localStorage.removeItem('user');
    window.location.href = '/login';
    return null;
  }
};

// Add token to requests and check expiration
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Check if token is expired or about to expire
      if (isTokenExpired()) {
        // Try to refresh token
        const newToken = await refreshToken();
        if (newToken) {
          config.headers.Authorization = `Bearer ${newToken}`;
        } else {
          // Refresh failed, request will fail with 401
          return Promise.reject(new Error('Token expired and refresh failed'));
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration and errors
api.interceptors.response.use(
  (response) => {
    // Update token expiration if provided in response
    if (response.data?.expiresAt) {
      localStorage.setItem('tokenExpiresAt', response.data.expiresAt);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Check error code
      const errorCode = error.response?.data?.code;
      
      if (errorCode === 'TOKEN_EXPIRED' || errorCode === 'SESSION_EXPIRED') {
        // Try to refresh token
        const newToken = await refreshToken();
        
        if (newToken) {
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      }

      // If refresh fails or other 401 error, logout
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiresAt');
      localStorage.removeItem('user');
      
      // Only redirect if not already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;

