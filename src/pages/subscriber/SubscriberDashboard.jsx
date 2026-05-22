import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SubscriberShell from '../../components/subscriber/SubscriberShell';
import { subscriptionService } from '../../services/subscriptionService';
import toast from 'react-hot-toast';

const SubscriberDashboard = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscriptionStatus();
  }, []);

  const loadSubscriptionStatus = async () => {
    try {
      const data = await subscriptionService.getSubscriptionStatus();
      setSubscriptionStatus(data);
    } catch {
      toast.error('Failed to load subscription status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SubscriberShell
      title="Dashboard"
      subtitle="Your subscription and trade signals"
      activeNav="dashboard"
      loading={loading}
    >
      {subscriptionStatus?.hasActiveSubscription ? (
        <div className="cr-card" style={{ marginBottom: 24, borderColor: 'rgba(52, 211, 153, 0.35)' }}>
          <h3 style={{ margin: '0 0 8px', color: '#34d399' }}>Active Subscription</h3>
          <p style={{ margin: 0, color: 'var(--cr-muted)' }}>
            Expires: {new Date(subscriptionStatus.nearestExpiry).toLocaleDateString()}
          </p>
        </div>
      ) : (
        <div className="cr-card" style={{ marginBottom: 24, borderColor: 'rgba(251, 191, 36, 0.35)' }}>
          <h3 style={{ margin: '0 0 8px', color: '#fbbf24' }}>No Active Subscription</h3>
          <p style={{ margin: 0, color: 'var(--cr-muted)' }}>
            Your subscription has expired. Renew to continue viewing trades.
          </p>
          <Link to="/join" className="cr-dash-link" style={{ display: 'inline-block', marginTop: 12 }}>
            Renew Subscription
          </Link>
        </div>
      )}

      <div className="cr-stat-row" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <Link to="/subscriber/trades/active" className="cr-card cr-stat-tile" style={{ textDecoration: 'none' }}>
          <div className="cr-stat-tile-label">Active Trades</div>
          <div className="cr-stat-tile-value accent">View →</div>
        </Link>
        <Link to="/subscriber/trades/completed" className="cr-card cr-stat-tile" style={{ textDecoration: 'none' }}>
          <div className="cr-stat-tile-label">Completed Trades</div>
          <div className="cr-stat-tile-value accent">View →</div>
        </Link>
      </div>
    </SubscriberShell>
  );
};

export default SubscriberDashboard;
