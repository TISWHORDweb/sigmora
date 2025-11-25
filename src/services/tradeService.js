import api from './api';

export const tradeService = {
  // Create trade (creator)
  createTrade: async (data) => {
    const response = await api.post('/trades', data);
    return response.data;
  },

  // Get active trades (creator)
  getActiveTrades: async () => {
    const response = await api.get('/trades/active');
    return response.data;
  },

  // Get completed trades (creator)
  getCompletedTrades: async () => {
    const response = await api.get('/trades/completed');
    return response.data;
  },

  // Get active trades (subscriber)
  getSubscriberActiveTrades: async () => {
    const response = await api.get('/trades/subscriber/active');
    return response.data;
  },

  // Get completed trades (subscriber)
  getSubscriberCompletedTrades: async () => {
    const response = await api.get('/trades/subscriber/completed');
    return response.data;
  },

  // Close trade
  closeTrade: async (id, closeReason) => {
    const response = await api.put(`/trades/${id}/close`, { closeReason });
    return response.data;
  },

  // Get single trade
  getTrade: async (id) => {
    const response = await api.get(`/trades/${id}`);
    return response.data;
  },
};

