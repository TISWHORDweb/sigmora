import api from './api';

export const authService = {
  // Creator registration
  registerCreator: async (data) => {
    const response = await api.post('/auth/register/creator', data);
    return response.data;
  },

  // Subscriber registration
  registerSubscriber: async (data) => {
    const response = await api.post('/auth/register/subscriber', data);
    return response.data;
  },

  // Login
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  // Get current user
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Logout from all devices
  logoutAll: async () => {
    const response = await api.post('/auth/logout-all');
    return response.data;
  },

  // Refresh token
  refreshToken: async () => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },
};

