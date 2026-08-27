'use client';

import { useState, useEffect, useMemo } from 'react';
import { Ban, CheckCircle2, Users } from 'lucide-react';
import CreatorShell from '../../components/creator/CreatorShell';
import TradeSearchBar from '../../components/creator/TradeSearchBar';
import { subscriptionService } from '../../services/subscriptionService';
import { getApiErrorMessage } from '../../utils/apiErrors';
import { useConfirm } from '../../context/ConfirmContext';
import toast from 'react-hot-toast';

const formatDate = (d) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/** Collapse subscription rows into one row per unique subscriber email/id. */
function aggregateSubscribers(subscriptions) {
  const map = new Map();
  subscriptions.forEach((sub) => {
    const person = sub.subscriber;
    const id = person?._id || person;
    if (!id) return;
    const key = String(id);
    const email = (person?.email || '').toLowerCase();
    if (!map.has(key)) {
      map.set(key, {
        id: key,
        name: person?.name || '—',
        email: email || '—',
        disabled: Boolean(person?.disabled),
        joinedAt: person?.createdAt || sub.createdAt,
        packages: [],
        statuses: new Set(),
        latestExpiry: null,
      });
    }
    const row = map.get(key);
    if (person?.disabled != null) row.disabled = Boolean(person.disabled);
    if (sub.package?.name) {
      const label = sub.package.name;
      if (!row.packages.includes(label)) row.packages.push(label);
    }
    if (sub.status) row.statuses.add(sub.status);
    if (sub.expiryDate) {
      const exp = new Date(sub.expiryDate).getTime();
      if (!row.latestExpiry || exp > row.latestExpiry) row.latestExpiry = exp;
    }
  });
  return [...map.values()].sort((a, b) => a.email.localeCompare(b.email));
}

const CreatorSubscribers = () => {
  const confirm = useConfirm();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [busyId, setBusyId] = useState(null);

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

  const subscribers = useMemo(() => aggregateSubscribers(subscriptions), [subscriptions]);

  const stats = useMemo(() => {
    const active = subscribers.filter((s) => !s.disabled).length;
    const disabled = subscribers.filter((s) => s.disabled).length;
    return { total: subscribers.length, active, disabled };
  }, [subscribers]);

  const filtered = useMemo(() => {
    let list = subscribers;
    if (filter === 'active') list = list.filter((s) => !s.disabled);
    if (filter === 'disabled') list = list.filter((s) => s.disabled);
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter((s) => {
      const hay = [s.name, s.email, s.packages.join(' ')].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [subscribers, filter, search]);

  const toggleDisabled = async (row) => {
    const next = !row.disabled;
    const ok = await confirm({
      title: next ? 'Disable subscriber?' : 'Enable subscriber?',
      message: next
        ? `${row.name} (${row.email}) will be blocked from logging in and using the academy.`
        : `${row.name} (${row.email}) will be able to access the academy again.`,
      confirmLabel: next ? 'Disable' : 'Enable',
      variant: next ? 'danger' : 'default',
    });
    if (!ok) return;

    setBusyId(row.id);
    try {
      await subscriptionService.setSubscriberDisabled(row.id, next);
      setSubscriptions((prev) =>
        prev.map((sub) => {
          const sid = String(sub.subscriber?._id || sub.subscriber);
          if (sid !== row.id) return sub;
          return {
            ...sub,
            subscriber: sub.subscriber
              ? { ...sub.subscriber, disabled: next }
              : sub.subscriber,
          };
        })
      );
      toast.success(next ? 'Subscriber disabled' : 'Subscriber enabled');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to update subscriber'));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <CreatorShell
      title="Subscribers"
      subtitle="Unique members in your academy — one account per email"
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
              <div className="cr-stat-tile-label">Enabled</div>
              <div className="cr-stat-tile-value">{stats.active}</div>
            </div>
            <div className="cr-card cr-stat-tile">
              <div className="cr-stat-tile-label">Disabled</div>
              <div className="cr-stat-tile-value">{stats.disabled}</div>
            </div>
          </div>

          {subscribers.length > 0 && (
            <TradeSearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search name, email, package…"
              filteredCount={filtered.length}
              totalCount={subscribers.length}
            />
          )}

          <div className="cr-dash-toolbar" style={{ marginBottom: 16 }}>
            {[
              { id: 'all', label: 'All' },
              { id: 'active', label: 'Enabled' },
              { id: 'disabled', label: 'Disabled' },
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
              <h3>{subscribers.length === 0 ? 'No subscribers yet' : 'No matches'}</h3>
              <p>
                {subscribers.length === 0
                  ? 'Share your academy code so students can join and subscribe to your packages.'
                  : `No subscribers match "${search}".`}
              </p>
            </div>
          ) : (
            <div className="cr-card cr-feed-card">
              <div className="cr-table-wrap">
                <table className="cr-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Packages</th>
                      <th>Account</th>
                      <th>Joined</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <strong>{row.name}</strong>
                        </td>
                        <td className="cr-table-mono">{row.email}</td>
                        <td>{row.packages.length ? row.packages.join(', ') : '—'}</td>
                        <td>
                          <span
                            className={`cr-status-pill ${
                              row.disabled ? 'cr-status-pill--expired' : 'cr-status-pill--active'
                            }`}
                          >
                            {row.disabled ? 'Disabled' : 'Enabled'}
                          </span>
                        </td>
                        <td className="cr-table-mono">{formatDate(row.joinedAt)}</td>
                        <td>
                          <button
                            type="button"
                            className={`cr-btn-ghost cr-btn-sm cr-btn-with-icon ${
                              row.disabled ? '' : 'cr-btn-danger-ghost'
                            }`}
                            disabled={busyId === row.id}
                            onClick={() => toggleDisabled(row)}
                          >
                            {row.disabled ? <CheckCircle2 size={14} /> : <Ban size={14} />}
                            {row.disabled ? 'Enable' : 'Disable'}
                          </button>
                        </td>
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
