import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../hooks/useNotifications';

const formatTime = (date) => {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now - d;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

const NotificationBell = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const {
    unreadCount,
    notifications,
    loading,
    loadNotifications,
    markAsRead,
    refreshCount,
  } = useNotifications(!!user);

  const notificationsPath =
    user?.role === 'creator' ? '/creator/notifications' : '/subscriber/notifications';

  useEffect(() => {
    if (open) loadNotifications();
  }, [open, loadNotifications]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  const handleItemClick = async (n) => {
    if (!n.read) await markAsRead(n._id);
    setOpen(false);
    if (n.link) navigate(n.link);
    else navigate(notificationsPath);
    refreshCount();
  };

  const preview = notifications.slice(0, 8);

  return (
    <div className="cr-notif-bell" ref={panelRef}>
      <button
        type="button"
        className="cr-notif-bell__btn"
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="cr-notif-bell__icon">
          <Bell size={20} strokeWidth={2} />
          {unreadCount > 0 && (
            <span
              className={`cr-notif-bell__badge ${unreadCount > 9 ? 'cr-notif-bell__badge--wide' : ''}`}
              aria-hidden
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </span>
      </button>

      {open && (
        <div className="cr-notif-panel" role="dialog" aria-label="Notifications">
          <div className="cr-notif-panel__head">
            <h3>Notifications</h3>
            {unreadCount > 0 && <span className="cr-notif-panel__unread">{unreadCount} new</span>}
          </div>
          <div className="cr-notif-panel__body">
            {loading && preview.length === 0 ? (
              <p className="cr-notif-panel__empty">Loading…</p>
            ) : preview.length === 0 ? (
              <p className="cr-notif-panel__empty">No notifications yet</p>
            ) : (
              <ul className="cr-notif-list">
                {preview.map((n) => (
                  <li key={n._id}>
                    <button
                      type="button"
                      className={`cr-notif-item ${n.read ? '' : 'cr-notif-item--unread'}`}
                      onClick={() => handleItemClick(n)}
                    >
                      <span className="cr-notif-item__title">{n.title}</span>
                      <span className="cr-notif-item__msg">{n.message}</span>
                      <span className="cr-notif-item__time">{formatTime(n.createdAt)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="cr-notif-panel__foot">
            <button
              type="button"
              className="cr-dash-link"
              onClick={() => {
                setOpen(false);
                navigate(notificationsPath);
              }}
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
