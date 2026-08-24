'use client';

import { Link } from '../../lib/router';
import { FOOTER_COLUMNS } from '../../content/siteNav';
import './Footer.css';

const Footer = ({ landing = false }) => {
  return (
    <footer className={`footer-modern ${landing ? 'footer-landing' : ''}`}>
      <div className="footer-container-modern">
        <div className="footer-content-modern">
          <div className="footer-section-modern footer-brand-col">
            <h3 className="footer-logo-modern">
              <img src="/logo.png" alt="" className="footer-logo-img" />
              Sig<span>mora</span>
            </h3>
            <p className="footer-description-modern">
              Institutional-grade signals without the noise. Connect with verified creators, join an academy, and
              follow live trades — then execute on your own broker.
            </p>
            <div className="social-links-modern">
              <a href="#" aria-label="X" className="social-link-modern">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7.1l-5.5-7.2L4.4 22H1.3l8.1-9.3L1 2h7.3l5 6.6L18.9 2Z" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="social-link-modern">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.9.3-1.6 1.6-1.6h1.7V3.2C16.5 3.1 15.4 3 14.2 3c-2.6 0-4.4 1.6-4.4 4.5v2.3H7v3.2h2.8v8h3.7Z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="social-link-modern">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.9 8.4H3.6V20h3.3V8.4ZM5.3 3.5a1.9 1.9 0 1 0 0 3.9 1.9 1.9 0 0 0 0-3.9ZM20.4 20h-3.3v-6.1c0-1.4 0-3.3-2-3.3s-2.3 1.6-2.3 3.2V20H9.5V8.4h3.2v1.6h.1c.4-.8 1.6-1.7 3.2-1.7 3.4 0 4 2.2 4 5.1V20Z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="social-link-modern">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2c2.7 0 3.1 0 4.1.1 1.1 0 1.8.2 2.5.5.7.3 1.2.6 1.8 1.2.6.6.9 1.1 1.2 1.8.3.7.5 1.4.5 2.5.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1.1-.2 1.8-.5 2.5-.3.7-.6 1.2-1.2 1.8-.6.6-1.1.9-1.8 1.2-.7.3-1.4.5-2.5.5-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1.1 0-1.8-.2-2.5-.5-.7-.3-1.2-.6-1.8-1.2-.6-.6-.9-1.1-1.2-1.8-.3-.7-.5-1.4-.5-2.5C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1.1.2-1.8.5-2.5.3-.7.6-1.2 1.2-1.8.6-.6 1.1-.9 1.8-1.2.7-.3 1.4-.5 2.5-.5C8.9 2 9.3 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-8.4a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" />
                </svg>
              </a>
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div className="footer-section-modern" key={col.heading}>
              <h4>{col.heading}</h4>
              <ul>
                {col.links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom-modern">
          <p>&copy; {new Date().getFullYear()} Sigmora. All rights reserved.</p>
          <p className="footer-tagline-modern">Trade Smart. Trade Professional.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
