import api from './api';

export const paymentService = {
  // Initialize payment
  initializePayment: async (packageId) => {
    const response = await api.post('/payments/initialize', { packageId });
    return response.data;
  },

  // Verify payment
  verifyPayment: async (data) => {
    const response = await api.post('/payments/verify', data);
    return response.data;
  },
};

