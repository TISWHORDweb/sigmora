'use client';

import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from '../../lib/router';
import toast from 'react-hot-toast';
import { authService } from '../../services/authService';
import AuthLayout from './AuthLayout';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!token) {
      toast.error('Invalid or missing reset token');
      return;
    }
    setLoading(true);
    try {
      await authService.resetPassword(token, password);
      toast.success('Password updated. You can sign in now.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <AuthLayout>
        <h1 className="auth-heading">Invalid link</h1>
        <p className="auth-subheading">
          This password reset link is invalid or has expired. Request a new one.
        </p>
        <Link to="/forgot-password" className="auth-submit auth-submit-link">
          Request new link
        </Link>
        <p className="auth-footer-link">
          <Link to="/login">Back to sign in</Link>
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <h1 className="auth-heading">Reset password</h1>
      <p className="auth-subheading">Choose a new password for your account.</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="new-password">New password</label>
          <input
            id="new-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            placeholder="Min. 6 characters"
          />
        </div>
        <div className="auth-field">
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            placeholder="Repeat password"
          />
        </div>
        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update password'}
        </button>
      </form>

      <p className="auth-footer-link">
        <Link to="/login">Back to sign in</Link>
      </p>
    </AuthLayout>
  );
};

export default ResetPassword;
