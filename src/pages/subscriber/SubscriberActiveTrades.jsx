import { useState, useEffect, useRef } from 'react';
import SubscriberShell from '../../components/subscriber/SubscriberShell';
import { tradeService } from '../../services/tradeService';
import toast from 'react-hot-toast';

const SubscriberActiveTrades = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialLoad = useRef(true);

  useEffect(() => {
    loadTrades();
    const interval = setInterval(loadTrades, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadTrades = async () => {
    try {
      const data = await tradeService.getSubscriberActiveTrades();
      setTrades(Array.isArray(data) ? data : []);
    } catch {
      if (initialLoad.current) toast.error('Failed to load trades');
    } finally {
      if (initialLoad.current) {
        initialLoad.current = false;
        setLoading(false);
      }
    }
  };

  return (
    <SubscriberShell
      title="Active Trades"
      subtitle="Live signals from your academy"
      activeNav="active-trades"
      loading={loading}
    >
      {trades.length === 0 ? (
        <div className="cr-card cr-empty">
          <h3>No active trades</h3>
          <p>Signals from your academy will appear here when live.</p>
        </div>
      ) : (
        <div className="cr-trade-grid">
          {trades.map((trade) => (
            <article
              key={trade._id}
              className={`cr-card cr-trade-card ${trade.type === 'BUY' ? 'buy' : 'sell'}`}
            >
              <div className="cr-trade-head">
                <span className="cr-trade-symbol">{trade.asset?.symbol || '—'}</span>
                <span className={`cr-trade-badge ${trade.type === 'BUY' ? 'buy' : 'sell'}`}>{trade.type}</span>
              </div>
              <dl className="cr-trade-meta">
                <div>
                  <dt>PIP</dt>
                  <dd>{trade.pip}</dd>
                </div>
                <div>
                  <dt>Spread</dt>
                  <dd>{trade.spread}</dd>
                </div>
                <div>
                  <dt>Take Profit</dt>
                  <dd>{trade.takeProfit}</dd>
                </div>
                <div>
                  <dt>Stop Loss</dt>
                  <dd>{trade.stopLoss}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{trade.status}</dd>
                </div>
                <div>
                  <dt>Creator</dt>
                  <dd>{trade.creator?.creatorName || '—'}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </SubscriberShell>
  );
};

export default SubscriberActiveTrades;
