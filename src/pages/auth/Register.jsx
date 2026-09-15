'use client';

import { useState } from 'react';
import { Link, useNavigate } from '../../lib/router';
import { useAuth } from '../../context/AuthContext';
import SigmoraLoader from '../../components/common/SigmoraLoader';
import AuthLayout from './AuthLayout';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const { registerSubscriber } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerSubscriber({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      setRedirecting(true);
      navigate('/subscriber/dashboard');
    } catch {
      setLoading(false);
      setRedirecting(false);
    }
  };

  if (redirecting) {
    return <SigmoraLoader fullScreen message="Opening dashboard…" />;
  }

  return (
    <AuthLayout wide>
      <h1 className="auth-heading">Create your account</h1>
      <p className="auth-subheading">Subscribe to Sigmora signals and packages</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="reg-name">Display name</label>
          <input
            id="reg-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your display name"
          />
        </div>

        <div className="auth-field">
          <label htmlFor="reg-email">Email</label>
          <input
            id="reg-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
          />
        </div>

        <div className="auth-field">
          <label htmlFor="reg-password">Password</label>
          <input
            id="reg-password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            placeholder="Min. 6 characters"
          />
        </div>

        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="auth-footer-link">
        Already have one? <Link to="/login">Sign in</Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
