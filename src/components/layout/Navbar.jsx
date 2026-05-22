import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = ({ landing = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
      className={`navbar-modern ${landing ? 'navbar-landing' : ''} ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container-modern">
        <Link to="/" className="navbar-logo-modern">
          <span className="logo-spark" aria-hidden="true" />
          <span className="logo-text-modern">SIGMORA</span>
        </Link>

        <div className="navbar-links-modern">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link-modern ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar-actions-modern">
          {user ? (
            <div className="user-menu-modern">
              <Link
                to={user.role === 'creator' ? '/creator/dashboard' : '/subscriber/dashboard'}
                className="btn-nav-primary"
              >
                Dashboard
              </Link>
              <button type="button" onClick={handleLogout} className="btn-nav-secondary">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/register" className="btn-nav-primary">
              Start Trading
            </Link>
          )}

          <button
            type="button"
            className="mobile-menu-toggle-modern"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
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
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mobile-nav-link-modern ${location.pathname === link.path ? 'active' : ''}`}
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
                >
                  Dashboard
                </Link>
                <button type="button" onClick={handleLogout} className="mobile-nav-link-modern">
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-nav-link-modern mobile-nav-cta"
              >
                Start Trading
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
