import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { ActivityIcon, ShieldIcon, TargetIcon, ChartIcon } from '../icons/Icons';
import './Footer.css';

const Footer = () => {
  const { theme, isDark } = useTheme();

  return (
    <footer
      className="footer-modern"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #0D1B2A 0%, #1B263B 100%)'
          : 'linear-gradient(135deg, #F5F7FA 0%, #E8ECF1 100%)',
        borderTop: `1px solid ${theme.colors.border}`,
      }}
    >
      <div className="footer-container-modern">
        <div className="footer-content-modern">
          <div className="footer-section-modern">
            <h3 className="footer-logo-modern">SIGMORA</h3>
            <p className="footer-description-modern" style={{ color: theme.colors.textSecondary }}>
              Professional forex trading management platform. Connect with expert traders,
              follow proven strategies, and elevate your trading journey.
            </p>
            <div className="social-links-modern">
              {[
                { name: 'Twitter', icon: ActivityIcon },
                { name: 'LinkedIn', icon: ChartIcon },
                { name: 'Facebook', icon: TargetIcon },
                { name: 'Instagram', icon: ShieldIcon },
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={social.name}
                  className="social-link-modern"
                  style={{
                    background: `${theme.colors.secondary}10`,
                    border: `1px solid ${theme.colors.secondary}30`,
                    color: theme.colors.secondary,
                  }}
                >
                  <social.icon size={18} color={theme.colors.secondary} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section-modern">
            <h4 style={{ color: theme.colors.text }}>Quick Links</h4>
            <ul>
              <li>
                <Link to="/" style={{ color: theme.colors.textSecondary }}>Home</Link>
              </li>
              <li>
                <Link to="/about" style={{ color: theme.colors.textSecondary }}>About Us</Link>
              </li>
              <li>
                <Link to="/features" style={{ color: theme.colors.textSecondary }}>Features</Link>
              </li>
              <li>
                <Link to="/faq" style={{ color: theme.colors.textSecondary }}>FAQ</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section-modern">
            <h4 style={{ color: theme.colors.text }}>Resources</h4>
            <ul>
              <li>
                <Link to="/contact" style={{ color: theme.colors.textSecondary }}>Contact</Link>
              </li>
              <li>
                <a href="#" style={{ color: theme.colors.textSecondary }}>Documentation</a>
              </li>
              <li>
                <a href="#" style={{ color: theme.colors.textSecondary }}>API Reference</a>
              </li>
              <li>
                <a href="#" style={{ color: theme.colors.textSecondary }}>Support</a>
              </li>
            </ul>
          </div>

          <div className="footer-section-modern">
            <h4 style={{ color: theme.colors.text }}>Legal</h4>
            <ul>
              <li>
                <a href="#" style={{ color: theme.colors.textSecondary }}>Privacy Policy</a>
              </li>
              <li>
                <a href="#" style={{ color: theme.colors.textSecondary }}>Terms of Service</a>
              </li>
              <li>
                <a href="#" style={{ color: theme.colors.textSecondary }}>Cookie Policy</a>
              </li>
              <li>
                <a href="#" style={{ color: theme.colors.textSecondary }}>Disclaimer</a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="footer-bottom-modern"
          style={{
            borderTop: `1px solid ${theme.colors.border}`,
          }}
        >
          <p style={{ color: theme.colors.textSecondary }}>
            &copy; {new Date().getFullYear()} Sigmora. All rights reserved.
          </p>
          <p className="footer-tagline-modern" style={{ color: theme.colors.secondary }}>
            Trade Smart. Trade Professional.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
