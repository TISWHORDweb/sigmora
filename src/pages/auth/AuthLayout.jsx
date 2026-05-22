import { Link } from 'react-router-dom';
import '../../styles/landing-tokens.css';
import './Auth.css';

const AuthLayout = ({ children, wide = false }) => (
  <div className="auth-page landing-premium">
    <div className="auth-split">
      <aside className="auth-visual" aria-hidden="true">
        <img src="/auth-hero.png" alt="" className="auth-visual-img" />
        <div className="auth-visual-overlay" />
        <div className="auth-visual-content">
          <Link to="/" className="auth-visual-logo">
            <span className="auth-logo-spark" />
            <span>SIGMORA</span>
          </Link>
          <h2>Institutional grade signals</h2>
          <p>
            Connect with verified creators. Real-time trade signals and structured learning
            paths for serious traders.
          </p>
        </div>
      </aside>

      <main className="auth-panel">
        <div className={`auth-card ${wide ? 'auth-card-wide' : ''}`}>{children}</div>
      </main>
    </div>
  </div>
);

export default AuthLayout;
