import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tradeService } from '../../services/tradeService';
import toast from 'react-hot-toast';

const ActiveTrades = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrades();
    const interval = setInterval(loadTrades, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const loadTrades = async () => {
    try {
      const data = await tradeService.getActiveTrades();
      setTrades(data);
    } catch (error) {
      toast.error('Failed to load trades');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseTrade = async (tradeId, closeReason) => {
    if (!window.confirm(`Close trade with ${closeReason}?`)) return;

    try {
      await tradeService.closeTrade(tradeId, closeReason);
      toast.success('Trade closed successfully!');
      loadTrades();
    } catch (error) {
      toast.error('Failed to close trade');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1>Active Trades</h1>
      {trades.length === 0 ? (
        <p>No active trades</p>
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
                <p>Status: {trade.status}</p>
              </div>
              <div style={styles.actions}>
                <button
                  onClick={() => handleCloseTrade(trade._id, 'TP')}
                  style={{ ...styles.closeBtn, backgroundColor: '#28a745' }}
                >
                  Close with TP
                </button>
                <button
                  onClick={() => handleCloseTrade(trade._id, 'SL')}
                  style={{ ...styles.closeBtn, backgroundColor: '#dc3545' }}
                >
                  Close with SL
                </button>
                <button
                  onClick={() => handleCloseTrade(trade._id, 'Manual')}
                  style={{ ...styles.closeBtn, backgroundColor: '#ffc107' }}
                >
                  Manual Close
                </button>
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
  actions: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  closeBtn: {
    padding: '0.5rem 1rem',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
};

export default ActiveTrades;

