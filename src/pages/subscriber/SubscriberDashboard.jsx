import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { subscriptionService } from '../../services/subscriptionService';
import toast from 'react-hot-toast';

const SubscriberDashboard = () => {
  const { user, logout } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscriptionStatus();
  }, []);

  const loadSubscriptionStatus = async () => {
    try {
      const data = await subscriptionService.getSubscriptionStatus();
      setSubscriptionStatus(data);
    } catch (error) {
      toast.error('Failed to load subscription status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <h1>Sigmora - Subscriber Dashboard</h1>
        <div>
          <span style={styles.userName}>{user?.name}</span>
          <button onClick={logout} style={styles.logoutBtn}>Logout</button>
        </div>
      </nav>

      <div style={styles.content}>
        <h2>Welcome, {user?.name}!</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {subscriptionStatus?.hasActiveSubscription ? (
              <div style={styles.successBox}>
                <h3>✓ Active Subscription</h3>
                <p>
                  Expires: {new Date(subscriptionStatus.nearestExpiry).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <div style={styles.warningBox}>
                <h3>⚠ No Active Subscription</h3>
                <p>Your subscription has expired. Please renew to continue viewing trades.</p>
                <Link to="/join" style={styles.renewBtn}>
                  Renew Subscription
                </Link>
              </div>
            )}

            <div style={styles.grid}>
              <Link to="/subscriber/trades/active" style={styles.card}>
                <h3>Active Trades</h3>
                <p>View currently running trades</p>
              </Link>

              <Link to="/subscriber/trades/completed" style={styles.card}>
                <h3>Completed Trades</h3>
                <p>View trade history</p>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  nav: {
    backgroundColor: 'white',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  userName: {
    marginRight: '1rem',
    fontWeight: '500',
  },
  logoutBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  content: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  successBox: {
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '2rem',
  },
  warningBox: {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '2rem',
  },
  renewBtn: {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    marginTop: '0.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textDecoration: 'none',
    color: 'inherit',
  },
};

export default SubscriberDashboard;

