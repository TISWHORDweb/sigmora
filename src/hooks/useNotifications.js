import { useState, useEffect, useCallback } from 'react';
import { notificationService } from '../services/notificationService';

const POLL_MS = 20000;

export function useNotifications(enabled = true) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshCount = useCallback(async () => {
    if (!enabled) return;
    try {
      const { count } = await notificationService.getUnreadCount();
      setUnreadCount(count ?? 0);
    } catch {
      /* ignore poll errors */
    }
  }, [enabled]);

  const loadNotifications = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    try {
      const data = await notificationService.getNotifications(50);
      setNotifications(Array.isArray(data) ? data : []);
      const unread = (Array.isArray(data) ? data : []).filter((n) => !n.read).length;
      setUnreadCount(unread);
    } catch {
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  const markAsRead = useCallback(
    async (id) => {
      await notificationService.markAsRead(id);
      setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, read: true } : n)));
      setUnreadCount((c) => Math.max(0, c - 1));
    },
    []
  );

  const markAllAsRead = useCallback(async () => {
    await notificationService.markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    refreshCount();
    const interval = setInterval(refreshCount, POLL_MS);
    return () => clearInterval(interval);
  }, [enabled, refreshCount]);

  return {
    unreadCount,
    notifications,
    loading,
    refreshCount,
    loadNotifications,
    markAsRead,
    markAllAsRead,
  };
}
