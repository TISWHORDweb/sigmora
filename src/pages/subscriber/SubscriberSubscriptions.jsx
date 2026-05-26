import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Receipt } from 'lucide-react';
import SubscriberShell from '../../components/subscriber/SubscriberShell';
import TradeSearchBar from '../../components/creator/TradeSearchBar';
import { subscriptionService } from '../../services/subscriptionService';
import toast from 'react-hot-toast';

const formatDate = (d) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const SubscriberSubscriptions = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await subscriptionService.getSubscriptions();
        setSubscriptions(Array.isArray(data) ? data : []);
      } catch {
        toast.error('Failed to load subscription history');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return subscriptions;
    return subscriptions.filter((sub) => {
      const hay = [
        sub.package?.name,
        sub.creator?.creatorName,
        sub.status,
        String(sub.amountPaid),
        formatDate(sub.createdAt),
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [subscriptions, search]);

  return (
    <SubscriberShell
      title="Subscription history"
      subtitle="Packages you have subscribed to"
      activeNav="subscriptions"
      loading={loading}
      topAction={
        <button type="button" className="cr-btn-ghost cr-btn-with-icon" onClick={() => navigate('/subscriber/academy')}>
          <ArrowLeft size={16} />
          Academy
        </button>
      }
    >
      {!loading && subscriptions.length > 0 && (
        <TradeSearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search package, status, amount…"
          filteredCount={filtered.length}
          totalCount={subscriptions.length}
        />
      )}

      {!loading && subscriptions.length === 0 ? (
        <div className="cr-card cr-empty">
          <Receipt size={32} color="#8b92a8" style={{ marginBottom: 12 }} />
          <h3>No subscriptions yet</h3>
          <p>When you subscribe to a package, your payment history will appear here.</p>
          <button
            type="button"
            className="cr-btn-primary cr-btn-sm no-pulse"
            style={{ marginTop: 16, width: 'auto' }}
            onClick={() => navigate('/subscriber/academy')}
          >
            Browse packages
          </button>
        </div>
      ) : !loading && filtered.length === 0 ? (
        <div className="cr-card cr-empty">
          <p>No subscriptions match &ldquo;{search}&rdquo;.</p>
        </div>
      ) : (
        !loading && (
          <div className="cr-card cr-feed-card">
            <div className="cr-table-wrap">
              <table className="cr-table">
                <thead>
                  <tr>
                    <th>Package</th>
                    <th>Academy</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Started</th>
                    <th>Expires</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((sub) => (
                    <tr key={sub._id}>
                      <td>
                        <strong>{sub.package?.name || '—'}</strong>
                      </td>
                      <td>{sub.creator?.creatorName || '—'}</td>
                      <td className="cr-table-mono">
                        {sub.amountPaid != null ? `₦${Number(sub.amountPaid).toLocaleString()}` : '—'}
                      </td>
                      <td>
                        <span className={`cr-status-pill cr-status-pill--${sub.status}`}>{sub.status}</span>
                      </td>
                      <td className="cr-table-mono">{formatDate(sub.startDate || sub.createdAt)}</td>
                      <td className="cr-table-mono">{formatDate(sub.expiryDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}
    </SubscriberShell>
  );
};

export default SubscriberSubscriptions;
