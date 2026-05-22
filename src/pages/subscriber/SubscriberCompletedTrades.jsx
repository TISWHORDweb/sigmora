import { useState, useEffect, useRef } from 'react';
import SubscriberShell from '../../components/subscriber/SubscriberShell';
import { tradeService } from '../../services/tradeService';
import toast from 'react-hot-toast';

const SubscriberCompletedTrades = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialLoad = useRef(true);

  useEffect(() => {
    loadTrades();
  }, []);

  const loadTrades = async () => {
    try {
      const data = await tradeService.getSubscriberCompletedTrades();
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
      title="Completed Trades"
      subtitle="Closed signals from your academy"
      activeNav="completed-trades"
      loading={loading}
    >
      {trades.length === 0 ? (
        <div className="cr-card cr-empty">
          <h3>No completed trades</h3>
          <p>Your closed signals will show up here.</p>
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
                  <dt>Closed</dt>
                  <dd>{trade.closeReason || '—'}</dd>
                </div>
                <div>
                  <dt>Closed At</dt>
                  <dd>{trade.closedAt ? new Date(trade.closedAt).toLocaleString() : '—'}</dd>
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

export default SubscriberCompletedTrades;
