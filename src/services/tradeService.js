import api from './api';

export const tradeService = {
  createTrade: async (data) => {
    const response = await api.post('/trades', data);
    return response.data;
  },

  getActiveTrades: async () => {
    const response = await api.get('/trades/active');
    return response.data;
  },

  getCompletedTrades: async () => {
    const response = await api.get('/trades/completed');
    return response.data;
  },

  getSubscriberActiveTrades: async () => {
    const response = await api.get('/trades/subscriber/active');
    return response.data;
  },

  getSubscriberCompletedTrades: async () => {
    const response = await api.get('/trades/subscriber/completed');
    return response.data;
  },

  closeTrade: async (id, closeReason) => {
    const response = await api.put(`/trades/${id}/close`, { closeReason });
    return response.data;
  },

  getTrade: async (id) => {
    const response = await api.get(`/trades/${id}`);
    return response.data;
  },

  acknowledgeTrade: async (id) => {
    const response = await api.post(`/trades/${id}/acknowledge`);
    return response.data;
  },

  toggleTradeLike: async (id) => {
    const response = await api.post(`/trades/${id}/like`);
    return response.data;
  },

  commentOnTrade: async (id, text) => {
    const response = await api.post(`/trades/${id}/comments`, { text });
    return response.data;
  },
};
