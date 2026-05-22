import { useState, useEffect, useMemo } from 'react';
import { Users } from 'lucide-react';
import CreatorShell from '../../components/creator/CreatorShell';
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

const CreatorSubscribers = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    try {
      const data = await subscriptionService.getCreatorSubscriptions();
      setSubscriptions(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const uniqueIds = new Set(
      subscriptions.map((s) => s.subscriber?._id || s.subscriber).filter(Boolean)
    );
    const active = subscriptions.filter((s) => s.status === 'active').length;
    return { total: uniqueIds.size, active, rows: subscriptions.length };
  }, [subscriptions]);

  const filtered = useMemo(() => {
    if (filter === 'active') return subscriptions.filter((s) => s.status === 'active');
    if (filter === 'expired') return subscriptions.filter((s) => s.status === 'expired');
    return subscriptions;
  }, [subscriptions, filter]);

  return (
    <CreatorShell
      title="Subscribers"
      subtitle="Everyone subscribed to your academy packages"
      activeNav="subscribers"
      loading={loading}
    >
      {!loading && (
        <>
          <div className="cr-stat-row" style={{ marginBottom: 20 }}>
            <div className="cr-card cr-stat-tile">
              <div className="cr-stat-tile-label">Unique subscribers</div>
              <div className="cr-stat-tile-value accent">{stats.total}</div>
            </div>
            <div className="cr-card cr-stat-tile">
              <div className="cr-stat-tile-label">Active subscriptions</div>
              <div className="cr-stat-tile-value">{stats.active}</div>
            </div>
            <div className="cr-card cr-stat-tile">
              <div className="cr-stat-tile-label">Total records</div>
              <div className="cr-stat-tile-value">{stats.rows}</div>
            </div>
          </div>

          <div className="cr-dash-toolbar" style={{ marginBottom: 16 }}>
            {[
              { id: 'all', label: 'All' },
              { id: 'active', label: 'Active' },
              { id: 'expired', label: 'Expired' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                className={`cr-dash-link ${filter === f.id ? 'cr-dash-link--active' : ''}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="cr-card cr-empty">
              <Users size={32} color="#8b92a8" style={{ marginBottom: 12 }} />
              <h3>No subscribers yet</h3>
              <p>Share your academy code so students can join and subscribe to your packages.</p>
            </div>
          ) : (
            <div className="cr-card cr-feed-card">
              <div className="cr-table-wrap">
                <table className="cr-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Package</th>
                      <th>Status</th>
                      <th>Expires</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((sub) => (
                      <tr key={sub._id}>
                        <td>
                          <strong>{sub.subscriber?.name || '—'}</strong>
                        </td>
                        <td className="cr-table-mono">{sub.subscriber?.email || '—'}</td>
                        <td>{sub.package?.name || '—'}</td>
                        <td>
                          <span className={`cr-status-pill cr-status-pill--${sub.status}`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="cr-table-mono">{formatDate(sub.expiryDate)}</td>
                        <td className="cr-table-mono">{formatDate(sub.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </CreatorShell>
  );
};

export default CreatorSubscribers;
