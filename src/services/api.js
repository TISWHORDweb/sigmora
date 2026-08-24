import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const isTokenExpired = () => {
  if (typeof window === 'undefined') return true;
  const expiresAt = localStorage.getItem('tokenExpiresAt');
  if (!expiresAt) return true;

  const expirationTime = new Date(expiresAt).getTime();
  const currentTime = new Date().getTime();
  const fiveMinutes = 5 * 60 * 1000;

  return expirationTime - currentTime < fiveMinutes;
};

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
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiresAt');
    localStorage.removeItem('user');
    if (typeof window !== 'undefined') window.location.href = '/login';
    return null;
  }
};

api.interceptors.request.use(
  async (config) => {
    if (typeof window === 'undefined') return config;
    const token = localStorage.getItem('token');

    if (token) {
      if (isTokenExpired()) {
        const newToken = await refreshToken();
        if (newToken) {
          config.headers.Authorization = `Bearer ${newToken}`;
        } else {
          return Promise.reject(new Error('Token expired and refresh failed'));
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    if (typeof window !== 'undefined' && response.data?.expiresAt) {
      localStorage.setItem('tokenExpiresAt', response.data.expiresAt);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      const errorCode = error.response?.data?.code;

      if (errorCode === 'TOKEN_EXPIRED' || errorCode === 'SESSION_EXPIRED') {
        const newToken = await refreshToken();

        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      }

      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiresAt');
      localStorage.removeItem('user');

      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
