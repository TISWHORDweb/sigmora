import api from './api';

export const packageService = {
  // Create package (creator)
  createPackage: async (data) => {
    const response = await api.post('/packages', data);
    return response.data;
  },

  // Get creator's packages
  getCreatorPackages: async () => {
    const response = await api.get('/packages/creator');
    return response.data;
  },

  // Get packages by creator ID (for subscribers)
  getPackagesByCreator: async (creatorId) => {
    const response = await api.get(`/packages/creator/${creatorId}`);
    return response.data;
  },

  // Get single package
  getPackage: async (id) => {
    const response = await api.get(`/packages/${id}`);
    return response.data;
  },

  // Update package
  updatePackage: async (id, data) => {
    const response = await api.put(`/packages/${id}`, data);
    return response.data;
  },

  // Delete package
  deletePackage: async (id) => {
    const response = await api.delete(`/packages/${id}`);
    return response.data;
  },
};

