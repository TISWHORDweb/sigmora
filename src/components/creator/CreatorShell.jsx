import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Activity,
  Boxes,
  CheckCircle2,
  ChevronRight,
  KeyRound,
  Layers,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  User,
  Users,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import NotificationBell from '../common/NotificationBell';
import SigmoraLoader from '../common/SigmoraLoader';
import '../../styles/creator-admin.css';

const VIEWS = {
  dashboard: 'dashboard',
  trade: 'trade',
  assets: 'assets',
  packages: 'packages',
};

const NAV_SECTIONS = [
  {
    label: 'Main',
    items: [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/creator/dashboard' },
      { id: 'subscribers', label: 'Subscribers', icon: Users, path: '/creator/subscribers' },
    ],
  },
  {
    label: 'Trading',
    items: [
      { id: 'trade', label: 'New Trade', icon: Plus, path: '/creator/dashboard?view=trade' },
      { id: 'active-trades', label: 'Active Trades', icon: Activity, path: '/creator/trades/active' },
      { id: 'completed-trades', label: 'Completed', icon: CheckCircle2, path: '/creator/trades/completed' },
    ],
  },
  {
    label: 'Catalog',
    items: [
      { id: 'assets', label: 'Assets', icon: Layers, path: '/creator/dashboard?view=assets' },
      { id: 'packages', label: 'Packages', icon: Boxes, path: '/creator/dashboard?view=packages' },
    ],
  },
];

export function getCreatorActiveNav(pathname, search) {
  if (pathname === '/creator/trades/active') return 'active-trades';
  if (pathname === '/creator/trades/completed') return 'completed-trades';
  if (pathname === '/creator/academy-code') return 'academy-code';
  if (pathname === '/creator/subscribers') return 'subscribers';
  if (pathname === '/creator/profile') return 'profile';
  if (pathname === '/creator/notifications') return 'notifications';
  const view = new URLSearchParams(search).get('view');
  if (view === 'trade') return 'trade';
  if (view === 'assets') return 'assets';
  if (view === 'packages') return 'packages';
  return 'overview';
}

const CreatorShell = ({
  title,
  subtitle,
  children,
  activeNav: activeNavProp,
  topAction,
  loading = false,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeNav =
    activeNavProp ?? getCreatorActiveNav(location.pathname, location.search);

  const displayName = user?.creatorName || user?.name || 'Creator';
  const academyCode = user?.academyCode || '—';
  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const goTrade = () => navigate('/creator/dashboard?view=trade');

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

      <aside className="cr-sidebar" aria-label="Creator navigation">
        <div className="cr-sidebar-brand">
          <button type="button" className="cr-logo-btn" onClick={() => navigate('/creator/dashboard')}>
            <span className="cr-logo">Sigmora</span>
          </button>
          <span className="cr-sidebar-badge">Creator Studio</span>
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
            onClick={() => navigate('/creator/profile')}
          >
            <User size={18} />
            <span>Profile</span>
          </button>
          <button
            type="button"
            className={`cr-nav-item cr-nav-item-muted ${activeNav === 'academy-code' ? 'active' : ''}`}
            onClick={() => navigate('/creator/academy-code')}
          >
            <KeyRound size={18} />
            <span>Academy Code</span>
            <code className="cr-nav-code">{academyCode}</code>
          </button>
          <div className="cr-sidebar-user">
            <div className="cr-avatar">{initials}</div>
            <div className="cr-sidebar-user-text">
              <strong>{displayName}</strong>
              <span>Creator account</span>
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
            <button type="button" className="cr-topbar-chip" onClick={() => navigate('/creator/academy-code')}>
              <KeyRound size={14} />
              {academyCode}
            </button>
            {topAction ?? (
              <button type="button" className="cr-btn-primary cr-btn-sm" onClick={goTrade}>
                <Plus size={16} />
                New Trade
              </button>
            )}
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

export { VIEWS, NAV_SECTIONS };
export default CreatorShell;
