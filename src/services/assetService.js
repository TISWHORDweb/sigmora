import api from './api';

export const assetService = {
  // Create asset
  createAsset: async (data) => {
    const response = await api.post('/assets', data);
    return response.data;
  },

  // Get creator's assets
  getAssets: async () => {
    const response = await api.get('/assets');
    return response.data;
  },

  // Get single asset
  getAsset: async (id) => {
    const response = await api.get(`/assets/${id}`);
    return response.data;
  },

  // Update asset
  updateAsset: async (id, data) => {
    const response = await api.put(`/assets/${id}`, data);
    return response.data;
  },

  // Delete asset
  deleteAsset: async (id) => {
    const response = await api.delete(`/assets/${id}`);
    return response.data;
  },
};

