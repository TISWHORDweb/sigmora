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

  setSubscriberDisabled: async (subscriberId, disabled) => {
    const response = await api.patch(`/subscriptions/creator/subscribers/${subscriberId}`, {
      disabled,
    });
    return response.data;
  },

  /** Mock subscribe — no live payment gateway */
  subscribeToPackage: async (packageId) => {
    const response = await api.post('/subscriptions/subscribe', { packageId });
    return response.data;
  },
};

