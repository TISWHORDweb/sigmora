'use client';

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from '../../lib/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { NAV_MENUS, isMenuActive, pathMatches } from '../../content/siteNav';
import './Navbar.css';

const Caret = () => (
  <svg className="nav-caret" width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Navbar = ({ landing = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [openMobileAccordion, setOpenMobileAccordion] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setIsMobileMenuOpen(false);
    setOpenMobileAccordion(null);
  }, [location.pathname]);

  useEffect(() => {
    const onDoc = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      ref={navRef}
      className={`navbar-modern ${landing ? 'navbar-landing' : ''} ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container-modern">
        <Link to="/" className="navbar-logo-modern" aria-label="Sigmora home">
          <img src="/logo.png" alt="Sigmora" className="navbar-logo-img" />
        </Link>

        <div className="navbar-links-modern">
          {NAV_MENUS.map((menu) => {
            const active = isMenuActive(menu, location.pathname);
            const expanded = openMenu === menu.id;
            return (
              <div
                key={menu.id}
                className={`nav-item-wrap ${expanded ? 'open' : ''} ${active ? 'active' : ''}`}
                onMouseEnter={() => setOpenMenu(menu.id)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  className={`nav-link-modern nav-link-parent ${active ? 'active' : ''}`}
                  aria-expanded={expanded}
                  aria-haspopup="true"
                  onClick={() => setOpenMenu(expanded ? null : menu.id)}
                >
                  {menu.label}
                  <Caret />
                </button>
                <div
                  className={`nav-dropdown ${menu.columns.length > 1 ? 'cols-2' : 'cols-1'} ${menu.id === 'trade' ? 'align-start' : ''} ${menu.id === 'company' ? 'align-end' : ''}`}
                >
                  {menu.columns.map((col) => (
                    <div className="nav-dropdown-col" key={col.heading}>
                      <h5>{col.heading}</h5>
                      {col.links.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={`nav-dropdown-link ${pathMatches(link.path, location.pathname) ? 'active' : ''}`}
                        >
                          <span className="nav-dropdown-label">{link.label}</span>
                          {link.desc && <span className="nav-dropdown-desc">{link.desc}</span>}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
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
            <>
              <Link to="/login" className="btn-nav-login">
                Log in
              </Link>
              <Link to="/register" className="btn-nav-primary">
                Start Trading →
              </Link>
            </>
          )}

          <button
            type="button"
            className="mobile-menu-toggle-modern"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
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
            {NAV_MENUS.map((menu) => {
              const open = openMobileAccordion === menu.id;
              return (
                <div key={menu.id} className="mobile-accordion">
                  <button
                    type="button"
                    className={`mobile-nav-link-modern mobile-accordion-btn ${isMenuActive(menu, location.pathname) ? 'active' : ''}`}
                    onClick={() => setOpenMobileAccordion(open ? null : menu.id)}
                    aria-expanded={open}
                  >
                    {menu.label}
                    <Caret />
                  </button>
                  {open && (
                    <div className="mobile-accordion-panel">
                      {menu.columns.map((col) => (
                        <div key={col.heading}>
                          <p className="mobile-accordion-heading">{col.heading}</p>
                          {col.links.map((link) => (
                            <Link
                              key={link.path}
                              to={link.path}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`mobile-nav-link-modern nested ${pathMatches(link.path, location.pathname) ? 'active' : ''}`}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
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
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mobile-nav-link-modern"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mobile-nav-link-modern mobile-nav-cta"
                >
                  Start Trading →
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
