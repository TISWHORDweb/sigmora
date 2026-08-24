'use client';

import { useState } from 'react';
import { Link, useNavigate } from '../../lib/router';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from './AuthLayout';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(formData.email, formData.password);
      navigate(user.role === 'creator' ? '/creator/dashboard' : '/subscriber/dashboard');
    } catch {
      // handled in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Link to="/" className="auth-logo auth-logo-mobile-only">
        <img src="/logo.png" alt="Sigmora" className="auth-logo-img" />
        <span className="auth-logo-text">SIGMORA</span>
      </Link>
      <h1 className="auth-heading">Sign in</h1>
      <p className="auth-subheading">Welcome back to Sigmora</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
          />
        </div>
        <div className="auth-field">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Your password"
          />
          <div className="auth-field-row">
            <Link to="/forgot-password" className="auth-forgot-link">
              Forgot password?
            </Link>
          </div>
        </div>
        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <p className="auth-footer-link">
        Don&apos;t have an account? <Link to="/register">Create your account</Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
