import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CreatorDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <h1>Sigmora - Creator Dashboard</h1>
        <div>
          <span style={styles.userName}>{user?.creatorName || user?.name}</span>
          <button onClick={logout} style={styles.logoutBtn}>Logout</button>
        </div>
      </nav>

      <div style={styles.content}>
        <h2>Welcome, {user?.creatorName || user?.name}!</h2>
        
        <div style={styles.grid}>
          <Link to="/creator/packages/create" style={styles.card}>
            <h3>Create Package</h3>
            <p>Create subscription packages for your students</p>
          </Link>

          <Link to="/creator/assets" style={styles.card}>
            <h3>Asset Management</h3>
            <p>Manage trading assets (USD/JPY, GOLD, etc.)</p>
          </Link>

          <Link to="/creator/trades/create" style={styles.card}>
            <h3>Create Trade</h3>
            <p>Place a new trade for your subscribers</p>
          </Link>

          <Link to="/creator/trades/active" style={styles.card}>
            <h3>Active Trades</h3>
            <p>View and manage active trades</p>
          </Link>

          <Link to="/creator/trades/completed" style={styles.card}>
            <h3>Completed Trades</h3>
            <p>View completed trade history</p>
          </Link>

          <Link to="/creator/academy-code" style={styles.card}>
            <h3>Academy Code</h3>
            <p>View and share your academy code</p>
          </Link>
        </div>
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
    transition: 'transform 0.2s',
  },
};

export default CreatorDashboard;

