import { useState, useEffect } from 'react';
import { tradeService } from '../../services/tradeService';
import toast from 'react-hot-toast';

const SubscriberActiveTrades = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrades();
    const interval = setInterval(loadTrades, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadTrades = async () => {
    try {
      const data = await tradeService.getSubscriberActiveTrades();
      setTrades(data);
    } catch (error) {
      toast.error('Failed to load trades');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1>Active Trades</h1>
      {trades.length === 0 ? (
        <p>No active trades available</p>
      ) : (
        <div style={styles.tradesList}>
          {trades.map((trade) => (
            <div
              key={trade._id}
              style={{
                ...styles.tradeCard,
                borderLeft: `4px solid ${trade.type === 'BUY' ? '#28a745' : '#dc3545'}`,
              }}
            >
              <div style={styles.tradeHeader}>
                <h3>{trade.asset?.symbol}</h3>
                <span
                  style={{
                    ...styles.typeBadge,
                    backgroundColor: trade.type === 'BUY' ? '#28a745' : '#dc3545',
                  }}
                >
                  {trade.type}
                </span>
              </div>
              <div style={styles.tradeDetails}>
                <p><strong>PIP:</strong> {trade.pip}</p>
                <p><strong>Spread:</strong> {trade.spread}</p>
                <p><strong>Take Profit:</strong> {trade.takeProfit}</p>
                <p><strong>Stop Loss:</strong> {trade.stopLoss}</p>
                <p><strong>Status:</strong> {trade.status}</p>
                <p><strong>Creator:</strong> {trade.creator?.creatorName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  tradesList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
  },
  tradeCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  tradeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  typeBadge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '4px',
    color: 'white',
    fontWeight: 'bold',
  },
  tradeDetails: {
    marginBottom: '1rem',
  },
};

export default SubscriberActiveTrades;

