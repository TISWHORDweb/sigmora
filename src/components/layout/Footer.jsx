import { Link } from 'react-router-dom';
import { ActivityIcon, ShieldIcon, TargetIcon, ChartIcon } from '../icons/Icons';
import './Footer.css';

const Footer = ({ landing = false }) => {
  return (
    <footer className={`footer-modern ${landing ? 'footer-landing' : ''}`}>
      <div className="footer-container-modern">
        <div className="footer-content-modern">
          <div className="footer-section-modern footer-brand-col">
            <h3 className="footer-logo-modern">
              <span className="footer-logo-spark" aria-hidden="true" />
              SIGMORA
            </h3>
            <p className="footer-description-modern">
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
                <a key={i} href="#" aria-label={social.name} className="social-link-modern">
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section-modern">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-section-modern">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API Reference</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>

          <div className="footer-section-modern">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-modern">
          <p>
            <span className="footer-copy-symbol" aria-hidden="true">◆</span>
            &copy; {new Date().getFullYear()} Sigmora. All rights reserved.
          </p>
          <p className="footer-tagline-modern">Trade Smart. Trade Professional.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
