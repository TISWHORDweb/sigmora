import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Activity,
  CheckCircle2,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SigmoraLoader from '../common/SigmoraLoader';
import '../../styles/creator-admin.css';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/subscriber/dashboard' },
  { id: 'active-trades', label: 'Active Trades', icon: Activity, path: '/subscriber/trades/active' },
  { id: 'completed-trades', label: 'Completed', icon: CheckCircle2, path: '/subscriber/trades/completed' },
  { id: 'profile', label: 'Profile', icon: User, path: '/subscriber/profile' },
];

export function getSubscriberActiveNav(pathname) {
  if (pathname === '/subscriber/trades/active') return 'active-trades';
  if (pathname === '/subscriber/trades/completed') return 'completed-trades';
  if (pathname === '/subscriber/profile') return 'profile';
  return 'dashboard';
}

const SubscriberShell = ({
  title,
  subtitle,
  children,
  activeNav: activeNavProp,
  loading = false,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeNav = activeNavProp ?? getSubscriberActiveNav(location.pathname);
  const displayName = user?.name || 'Subscriber';
  const academyName = user?.creatorInfo?.creatorName || 'Your academy';
  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

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
            <span className="cr-logo">Sigmora</span>
          </button>
          <span className="cr-sidebar-badge">Subscriber</span>
        </div>

        <nav className="cr-sidebar-nav">
          <div className="cr-nav-group">
            <span className="cr-nav-group-label">Menu</span>
            <ul>
              {NAV_ITEMS.map((item) => {
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
        </nav>

        <div className="cr-sidebar-footer">
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
