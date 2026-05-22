import { useState } from 'react';
import { academyService } from '../../services/academyService';
import { paymentService } from '../../services/paymentService';
import toast from 'react-hot-toast';
import '../../styles/landing-tokens.css';
import '../../styles/app-shell.css';

const JoinAcademy = () => {
  const [academyCode, setAcademyCode] = useState('');
  const [academyInfo, setAcademyInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await academyService.getAcademyByCode(academyCode);
      setAcademyInfo(data);
    } catch {
      toast.error('Invalid academy code');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (packageId) => {
    setLoading(true);
    try {
      const { paymentLink } = await paymentService.initializePayment(packageId);
      window.location.href = paymentLink;
    } catch {
      toast.error('Failed to initialize payment');
      setLoading(false);
    }
  };

  return (
    <div className="app-shell-page app-shell-page--centered landing-premium">
      <div className="app-shell-card app-shell-card--wide">
        <h1>Join Academy</h1>

        {!academyInfo ? (
          <form onSubmit={handleCodeSubmit}>
            <div className="app-shell-form-group">
              <label className="app-shell-label">Enter Academy Code</label>
              <input
                type="text"
                value={academyCode}
                onChange={(e) => setAcademyCode(e.target.value.toUpperCase())}
                required
                maxLength={6}
                placeholder="Enter 6-character code"
                className="app-shell-input app-shell-code-input"
              />
            </div>
            <button type="submit" disabled={loading} className="app-shell-btn">
              {loading ? 'Loading...' : 'Continue'}
            </button>
          </form>
        ) : (
          <div>
            <h2>{academyInfo.creator.creatorName}</h2>
            <p style={{ color: 'var(--muted-foreground)', marginBottom: '1.5rem' }}>
              Academy Code: {academyInfo.creator.academyCode}
            </p>
            <h3>Available Packages</h3>
            <div className="app-shell-packages">
              {academyInfo.packages.map((pkg) => (
                <div key={pkg._id} className="app-shell-package-card">
                  <h4>{pkg.name}</h4>
                  <p style={{ color: 'var(--muted-foreground)' }}>{pkg.description}</p>
                  <p className="app-shell-price">₦{pkg.price.toLocaleString()}</p>
                  <ul style={{ color: 'var(--muted-foreground)', marginBottom: '1rem' }}>
                    {pkg.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => handleSubscribe(pkg._id)}
                    disabled={loading}
                    className="app-shell-btn app-shell-btn--success"
                  >
                    Subscribe
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinAcademy;
