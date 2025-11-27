import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/features', label: 'Features' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      className={`navbar-modern ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: isScrolled
          ? isDark
            ? 'rgba(20, 27, 45, 0.95)'
            : 'rgba(255, 255, 255, 0.95)'
          : isDark
          ? 'rgba(20, 27, 45, 0.8)'
          : 'rgba(255, 255, 255, 0.8)',
        borderBottom: `1px solid ${theme.colors.border}`,
        boxShadow: isScrolled ? `0 4px 20px ${theme.colors.shadow}` : 'none',
      }}
    >
      <div className="navbar-container-modern">
        <Link to="/" className="navbar-logo-modern">
          <motion.div
            className="logo-icon-modern"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
              <path
                d="M20 0L24.49 15.51L40 20L24.49 24.49L20 40L15.51 24.49L0 20L15.51 15.51L20 0Z"
                fill="url(#gradient)"
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
                  <stop offset="0%" stopColor="#FFB800" />
                  <stop offset="100%" stopColor="#FF8F00" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          <span className="logo-text-modern" style={{ color: theme.colors.text }}>
            SIGMORA
          </span>
        </Link>

        <div className="navbar-links-modern">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link-modern ${location.pathname === link.path ? 'active' : ''}`}
              style={{
                color: location.pathname === link.path ? theme.colors.secondary : theme.colors.textSecondary,
              }}
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.div
                  className="nav-link-indicator"
                  layoutId="activeIndicator"
                  style={{ background: theme.colors.secondary }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="navbar-actions-modern">
          {user ? (
            <div className="user-menu-modern">
              <Link
                to={user.role === 'creator' ? '/creator/dashboard' : '/subscriber/dashboard'}
                className="btn-nav-primary"
                style={{
                  background: theme.colors.secondary,
                  color: theme.colors.primary,
                }}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="btn-nav-secondary"
                style={{
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/register/creator"
              className="btn-nav-primary"
              style={{
                background: theme.colors.secondary,
                color: theme.colors.primary,
              }}
            >
              Get Started
            </Link>
          )}

          <button
            className="mobile-menu-toggle-modern"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            style={{ color: theme.colors.text }}
          >
            <span style={{ background: theme.colors.text }}></span>
            <span style={{ background: theme.colors.text }}></span>
            <span style={{ background: theme.colors.text }}></span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu-modern"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: theme.colors.card,
              borderTop: `1px solid ${theme.colors.border}`,
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-nav-link-modern"
                style={{
                  color: location.pathname === link.path ? theme.colors.secondary : theme.colors.text,
                }}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to={user.role === 'creator' ? '/creator/dashboard' : '/subscriber/dashboard'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mobile-nav-link-modern"
                  style={{ color: theme.colors.text }}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="mobile-nav-link-modern"
                  style={{ color: theme.colors.text }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/register/creator"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-nav-link-modern"
                style={{ color: theme.colors.secondary }}
              >
                Get Started
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
