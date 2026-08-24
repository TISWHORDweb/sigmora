'use client';

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from '../../lib/router';
import {
  Activity,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getAcademyName, getAcademyCode } from '../../utils/subscriberAcademy';
import NotificationBell from '../common/NotificationBell';
import SigmoraLoader from '../common/SigmoraLoader';
import '../../styles/creator-admin.css';

const NAV_SECTIONS = [
  {
    label: 'Main',
    items: [
      { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, path: '/subscriber/dashboard' },
      { id: 'academy', label: 'My Academy', icon: GraduationCap, path: '/subscriber/academy' },
    ],
  },
  {
    label: 'Signals',
    items: [
      { id: 'active-trades', label: 'Active Trades', icon: Activity, path: '/subscriber/trades/active' },
      { id: 'completed-trades', label: 'Completed', icon: CheckCircle2, path: '/subscriber/trades/completed' },
    ],
  },
  {
    label: 'Billing',
    items: [
      { id: 'subscriptions', label: 'Subscriptions', icon: History, path: '/subscriber/subscriptions' },
    ],
  },
];

export function getSubscriberActiveNav(pathname) {
  if (pathname === '/subscriber/academy') return 'academy';
  if (pathname === '/subscriber/checkout') return 'academy';
  if (pathname === '/subscriber/subscriptions') return 'subscriptions';
  if (pathname === '/subscriber/trades/active') return 'active-trades';
  if (pathname === '/subscriber/trades/completed') return 'completed-trades';
  if (pathname === '/subscriber/profile') return 'profile';
  if (pathname === '/subscriber/notifications') return 'notifications';
  return 'dashboard';
}

const SubscriberShell = ({
  title,
  subtitle,
  children,
  activeNav: activeNavProp,
  loading = false,
  topAction,
}) => {
  const { user, logout, refreshUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeNav = activeNavProp ?? getSubscriberActiveNav(location.pathname);
  const displayName = user?.name || 'Subscriber';
  const academyName = getAcademyName(user) || 'Your academy';
  const academyCode = getAcademyCode(user) || '—';
  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    if (user?.role === 'subscriber' && user?.subscribedTo && !user?.creatorInfo?.creatorName) {
      refreshUser().catch(() => {});
    }
  }, [user?.role, user?.subscribedTo, user?.creatorInfo?.creatorName, refreshUser]);

  return (
    <div className={`cr-app ${sidebarOpen ? 'cr-sidebar-open' : ''}`}>
      <div className="cr-grain" aria-hidden="true" />

      {sidebarOpen && (
        <button
          type="button"
          className="cr-sidebar-backdrop"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className="cr-sidebar" aria-label="Subscriber navigation">
        <div className="cr-sidebar-brand">
          <button type="button" className="cr-logo-btn" onClick={() => navigate('/subscriber/dashboard')}>
            <img src="/logo.png" alt="" className="cr-logo-img" />
            <span className="cr-logo">Sigmora</span>
          </button>
          <span className="cr-sidebar-badge">Subscriber Studio</span>
        </div>

        <nav className="cr-sidebar-nav">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label} className="cr-nav-group">
              <span className="cr-nav-group-label">{section.label}</span>
              <ul>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeNav === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        className={`cr-nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => {
                          navigate(item.path);
                          setSidebarOpen(false);
                        }}
                      >
                        <Icon size={18} strokeWidth={2} />
                        <span>{item.label}</span>
                        {isActive && <ChevronRight size={14} className="cr-nav-chevron" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="cr-sidebar-footer">
          <button
            type="button"
            className={`cr-nav-item cr-nav-item-muted ${activeNav === 'profile' ? 'active' : ''}`}
            onClick={() => navigate('/subscriber/profile')}
          >
            <User size={18} />
            <span>Profile</span>
          </button>
          <div className="cr-sidebar-user">
            <div className="cr-avatar">{initials}</div>
            <div className="cr-sidebar-user-text">
              <strong>{displayName}</strong>
              <span>{academyName}</span>
            </div>
          </div>
          <button type="button" className="cr-nav-item cr-nav-logout" onClick={logout}>
            <LogOut size={18} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      <div className="cr-shell-main">
        <header className="cr-topbar">
          <div className="cr-topbar-left">
            <button
              type="button"
              className="cr-menu-btn"
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="cr-page-title">{title}</h1>
              {subtitle && <p className="cr-page-subtitle">{subtitle}</p>}
            </div>
          </div>
          <div className="cr-topbar-actions">
            <NotificationBell />
            <button
              type="button"
              className="cr-topbar-chip"
              onClick={() => navigate('/subscriber/academy')}
              title={academyName}
            >
              <GraduationCap size={14} />
              <span className="cr-topbar-chip__text">{academyCode}</span>
            </button>
            {topAction}
          </div>
        </header>

        <main className={`cr-main ${loading ? 'cr-main--loading' : ''}`}>
          {loading ? (
            <div className="cr-main-loader">
              <SigmoraLoader fullScreen={false} inline />
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
};

export default SubscriberShell;
