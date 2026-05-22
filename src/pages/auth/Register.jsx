import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from './AuthLayout';

const Register = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'creator' ? 'creator' : 'subscriber';
  const [role, setRole] = useState(initialRole);
  const [loading, setLoading] = useState(false);
  const { registerCreator, registerSubscriber } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    creatorName: '',
    academyCode: searchParams.get('code')?.toUpperCase() || '',
  });

  useEffect(() => {
    const r = searchParams.get('role');
    if (r === 'creator' || r === 'subscriber') setRole(r);
    const code = searchParams.get('code');
    if (code) {
      setFormData((prev) => ({ ...prev, academyCode: code.toUpperCase() }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'academyCode' ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (role === 'creator') {
        await registerCreator({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          creatorName: formData.creatorName || formData.name,
        });
        navigate('/creator/dashboard');
      } else {
        await registerSubscriber({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          academyCode: formData.academyCode,
        });
        navigate('/subscriber/dashboard');
      }
    } catch {
      // handled in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout wide>
      <h1 className="auth-heading">Create your account</h1>
      <p className="auth-subheading">Pick how you&apos;ll use Sigmora</p>

      <div className="auth-role-toggle" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={role === 'subscriber'}
          className={`auth-role-btn ${role === 'subscriber' ? 'active' : ''}`}
          onClick={() => setRole('subscriber')}
        >
          I&apos;m a Subscriber
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={role === 'creator'}
          className={`auth-role-btn ${role === 'creator' ? 'active' : ''}`}
          onClick={() => setRole('creator')}
        >
          I&apos;m a Creator
        </button>
      </div>

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

        {role === 'creator' && (
          <div className="auth-field">
            <label htmlFor="reg-academy">Academy name (optional)</label>
            <input
              id="reg-academy"
              type="text"
              name="creatorName"
              value={formData.creatorName}
              onChange={handleChange}
              placeholder="e.g. Alpha FX Academy"
            />
          </div>
        )}

        {role === 'subscriber' && (
          <div className="auth-field">
            <label htmlFor="reg-code">Academy code</label>
            <input
              id="reg-code"
              type="text"
              name="academyCode"
              value={formData.academyCode}
              onChange={handleChange}
              required
              maxLength={6}
              placeholder="e.g. TRD782"
            />
          </div>
        )}

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
          {loading
            ? 'Creating account...'
            : role === 'creator'
              ? 'Create creator account'
              : 'Create subscriber account'}
        </button>
      </form>

      <p className="auth-footer-link">
        Already have one? <Link to="/login">Sign in</Link>
      </p>
    </AuthLayout>
  );
};

export default Register;
