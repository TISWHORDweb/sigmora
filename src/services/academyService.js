import api from './api';

export const academyService = {
  // Get academy code (creator)
  getAcademyCode: async () => {
    const response = await api.get('/academy/code');
    return response.data;
  },

  // Get academy info by code
  getAcademyByCode: async (code) => {
    const response = await api.get(`/academy/${code}`);
    return response.data;
  },
};

