'use client';

import { useEffect } from 'react';
import { useNavigate } from '../../lib/router';
import { Bell, CheckCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import CreatorShell from '../../components/creator/CreatorShell';
import SubscriberShell from '../../components/subscriber/SubscriberShell';
import { useNotifications } from '../../hooks/useNotifications';

const formatTime = (date) =>
  new Date(date).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const NotificationsList = () => {
  const navigate = useNavigate();
  const { notifications, loading, loadNotifications, markAsRead, markAllAsRead, unreadCount } =
    useNotifications(true);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const handleClick = async (n) => {
    if (!n.read) await markAsRead(n._id);
    if (n.link) navigate(n.link);
  };

  if (loading) {
    return <p className="cr-signal-meta">Loading notifications…</p>;
  }

  if (notifications.length === 0) {
    return (
      <div className="cr-card cr-empty">
        <Bell size={32} color="#8b92a8" style={{ marginBottom: 12 }} />
        <h3>No notifications</h3>
        <p>You&apos;re all caught up. New alerts will show up here.</p>
      </div>
    );
  }

  return (
    <>
      {unreadCount > 0 && (
        <div className="cr-notif-page-toolbar">
          <span className="cr-search-bar__count">{unreadCount} unread</span>
          <button type="button" className="cr-dash-link cr-btn-with-icon" onClick={markAllAsRead}>
            <CheckCheck size={16} />
            Mark all read
          </button>
        </div>
      )}
      <ul className="cr-notif-page-list">
        {notifications.map((n) => (
          <li key={n._id}>
            <button
              type="button"
              className={`cr-card cr-notif-page-item ${n.read ? '' : 'cr-notif-page-item--unread'}`}
              onClick={() => handleClick(n)}
            >
              <div className="cr-notif-page-item__head">
                <strong>{n.title}</strong>
                <time>{formatTime(n.createdAt)}</time>
              </div>
              <p>{n.message}</p>
              {!n.read && <span className="cr-notif-page-item__dot" aria-hidden />}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

const NotificationsPage = () => {
  const { user } = useAuth();
  const isCreator = user?.role === 'creator';

  if (isCreator) {
    return (
      <CreatorShell
        title="Notifications"
        subtitle="Academy activity and subscriber updates"
        activeNav="notifications"
      >
        <NotificationsList />
      </CreatorShell>
    );
  }

  return (
    <SubscriberShell
      title="Notifications"
      subtitle="Trade signals and updates from your academy"
      activeNav="notifications"
    >
      <NotificationsList />
    </SubscriberShell>
  );
};

export default NotificationsPage;
