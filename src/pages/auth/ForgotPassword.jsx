import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../../services/authService';
import AuthLayout from './AuthLayout';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [resetUrl, setResetUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResetUrl('');
    try {
      const data = await authService.forgotPassword(email);
      setSent(true);
      if (data.resetUrl) {
        setResetUrl(data.resetUrl);
      }
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to process request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="auth-heading">Forgot password</h1>
      <p className="auth-subheading">
        Enter your email and we&apos;ll send you a link to reset your password.
      </p>

      {sent ? (
        <div className="auth-success-box">
          <p>
            If an account exists for that email, reset instructions have been generated.
            Check your inbox, or use the link below in development.
          </p>
          {resetUrl && (
            <p style={{ marginTop: 12 }}>
              <a href={resetUrl}>{resetUrl}</a>
            </p>
          )}
          <p className="auth-dev-hint">
            In production, this link would be emailed to you.
          </p>
        </div>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="forgot-email">Email</label>
            <input
              id="forgot-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
        </form>
      )}

      <p className="auth-footer-link">
        <Link to="/login">Back to sign in</Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPassword;
