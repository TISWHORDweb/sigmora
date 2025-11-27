import api from './api';

export const subscriptionService = {
  // Get subscriptions
  getSubscriptions: async () => {
    const response = await api.get('/subscriptions');
    return response.data;
  },

  // Get subscription status
  getSubscriptionStatus: async () => {
    const response = await api.get('/subscriptions/status');
    return response.data;
  },

  // Get creator subscriptions (for analytics)
  getCreatorSubscriptions: async () => {
    const response = await api.get('/subscriptions/creator');
    return response.data;
  },
};

