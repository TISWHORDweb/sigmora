import { useState, useEffect } from 'react';
import { tradeService } from '../../services/tradeService';
import toast from 'react-hot-toast';

const CompletedTrades = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrades();
  }, []);

  const loadTrades = async () => {
    try {
      const data = await tradeService.getCompletedTrades();
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
      <h1>Completed Trades</h1>
      {trades.length === 0 ? (
        <p>No completed trades</p>
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
                <p>PIP: {trade.pip}</p>
                <p>Spread: {trade.spread}</p>
                <p>TP: {trade.takeProfit}</p>
                <p>SL: {trade.stopLoss}</p>
                <p>Closed: {trade.closeReason}</p>
                <p>Closed At: {new Date(trade.closedAt).toLocaleString()}</p>
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

export default CompletedTrades;

