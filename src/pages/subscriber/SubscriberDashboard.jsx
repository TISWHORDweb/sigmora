'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from '../../lib/router';
import { Activity, ArrowRight, CheckCircle2, GraduationCap, History, User } from 'lucide-react';
import { motion } from 'framer-motion';
import SubscriberShell from '../../components/subscriber/SubscriberShell';
import { useAuth } from '../../context/AuthContext';
import { useCountUp } from '../../hooks/useCountUp';
import { getAcademyName } from '../../utils/subscriberAcademy';
import { tradeService } from '../../services/tradeService';
import toast from 'react-hot-toast';

function computeOutcomes(completed) {
  if (!completed.length) {
    return [
      { label: 'Take Profit', pct: 0, key: 'tp' },
      { label: 'Stop Loss', pct: 0, key: 'sl' },
      { label: 'Manual Close', pct: 0, key: 'manual' },
    ];
  }
  const tp = completed.filter((t) => t.closeReason === 'TP').length;
  const sl = completed.filter((t) => t.closeReason === 'SL').length;
  const manual = completed.filter((t) => t.closeReason === 'Manual').length;
  const total = completed.length;
  return [
    { label: 'Take Profit', pct: Math.round((tp / total) * 100), key: 'tp' },
    { label: 'Stop Loss', pct: Math.round((sl / total) * 100), key: 'sl' },
    { label: 'Manual Close', pct: Math.round((manual / total) * 100), key: 'manual' },
  ];
}

const SubscriberDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ active: 0, completed: 0, winRate: 0 });
  const [recentSignals, setRecentSignals] = useState([]);
  const [outcomes, setOutcomes] = useState(() => computeOutcomes([]));

  const academyName = getAcademyName(user) || 'Your academy';

  useEffect(() => {
    const load = async () => {
      try {
        const [active, completed] = await Promise.all([
          tradeService.getSubscriberActiveTrades(),
          tradeService.getSubscriberCompletedTrades(),
        ]);
        const activeList = Array.isArray(active) ? active : [];
        const completedList = Array.isArray(completed) ? completed : [];

        const tp = completedList.filter((t) => t.closeReason === 'TP').length;
        const winRate =
          completedList.length > 0 ? Math.round((tp / completedList.length) * 100) : 0;

        setStats({
          active: activeList.length,
          completed: completedList.length,
          winRate,
        });
        setOutcomes(computeOutcomes(completedList));
        setRecentSignals(
          [...activeList, ...completedList.slice(0, 8)]
            .slice(0, 6)
            .map((t) => ({
              id: t._id,
              pair: t.asset?.symbol || '—',
              type: t.type,
              close: t.status === 'active' ? 'Open' : t.closeReason || 'Closed',
              time:
                t.status === 'active'
                  ? 'Live'
                  : t.closedAt
                    ? new Date(t.closedAt).toLocaleDateString()
                    : '—',
              pips:
                t.status === 'active'
                  ? '—'
                  : t.closeReason === 'TP'
                    ? '+TP'
                    : t.closeReason === 'SL'
                      ? '-SL'
                      : '—',
            }))
        );
      } catch {
        toast.error('Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const activeCount = useCountUp(stats.active, 1200, !loading);
  const completedCount = useCountUp(stats.completed, 1200, !loading);
  const winRateDisplay = useCountUp(stats.winRate, 1200, !loading);

  const winClass =
    stats.winRate === 0 ? 'win-low' : stats.winRate > 50 ? 'win-high' : '';

  return (
    <SubscriberShell
      title="Overview"
      subtitle={`Signals from ${academyName}`}
      activeNav="dashboard"
      loading={loading}
      topAction={
        <div className="cr-topbar-actions-group">
          <button
            type="button"
            className="cr-btn-ghost cr-btn-with-icon"
            onClick={() => navigate('/subscriber/academy')}
          >
            <GraduationCap size={16} />
            My academy
          </button>
          <button
            type="button"
            className="cr-btn-primary cr-btn-sm no-pulse cr-btn-with-icon"
            onClick={() => navigate('/subscriber/trades/active')}
          >
            <Activity size={16} />
            View signals
          </button>
        </div>
      }
    >
      <motion.div
        className="cr-dashboard-page"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Subscription banner disabled for now — full academy trade access without paid subscription */}
        {/*
        <div className="cr-card cr-sub-banner">...</div>
        */}

        <div className="cr-card cr-academy-hero cr-academy-hero--compact">
          <div className="cr-academy-hero__icon">
            <GraduationCap size={22} />
          </div>
          <div className="cr-academy-hero__body">
            <h3 className="cr-academy-hero__title">{academyName}</h3>
            <p className="cr-academy-hero__text">
              All signals from your academy are available. Manage packages and billing from My Academy.
            </p>
          </div>
          <button
            type="button"
            className="cr-btn-primary cr-btn-sm no-pulse cr-btn-with-icon"
            onClick={() => navigate('/subscriber/academy')}
          >
            Academy details
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="cr-stat-row">
          <button
            type="button"
            className="cr-card cr-stat-tile cr-stat-tile--link"
            onClick={() => navigate('/subscriber/trades/active')}
          >
            <div className="cr-stat-tile-label">Active Trades</div>
            <div className="cr-stat-tile-value accent">{activeCount}</div>
          </button>
          <button
            type="button"
            className="cr-card cr-stat-tile cr-stat-tile--link"
            onClick={() => navigate('/subscriber/trades/completed')}
          >
            <div className="cr-stat-tile-label">Completed</div>
            <div className="cr-stat-tile-value">{completedCount}</div>
          </button>
          <div className="cr-card cr-stat-tile">
            <div className="cr-stat-tile-label">Win Rate</div>
            <div className={`cr-stat-tile-value ${winClass}`}>{winRateDisplay}%</div>
          </div>
          <button
            type="button"
            className="cr-card cr-stat-tile cr-stat-tile--link"
            onClick={() => navigate('/subscriber/academy')}
          >
            <div className="cr-stat-tile-label">Academy</div>
            <div className="cr-stat-tile-value cr-stat-tile-value--sm">{academyName}</div>
          </button>
        </div>

        <div className="cr-overview-grid">
          <div className="cr-card cr-feed-card">
            <div className="cr-feed-head">
              <h3 className="cr-section-title">Recent Signals</h3>
              <button
                type="button"
                className="cr-dash-link cr-btn-with-icon"
                onClick={() => navigate('/subscriber/trades/active')}
              >
                <Activity size={14} />
                All active
              </button>
            </div>
            {recentSignals.length === 0 ? (
              <p className="cr-signal-meta cr-signal-empty">No signals yet. They will appear when your academy goes live.</p>
            ) : (
              <ul className="cr-signal-list">
                {recentSignals.map((s) => (
                  <li key={s.id} className="cr-signal-item">
                    <div className="cr-signal-item__main">
                      <div className="cr-signal-pair">{s.pair}</div>
                      <div className="cr-signal-meta">
                        {s.type} · {s.time}
                      </div>
                    </div>
                    <span className={`cr-trade-badge ${s.type === 'BUY' ? 'buy' : 'sell'}`}>{s.type}</span>
                    <span
                      className={`cr-signal-outcome ${
                        s.pips.startsWith('+') ? 'up' : s.pips.startsWith('-') ? 'down' : 'neutral'
                      }`}
                    >
                      {s.close} {s.pips}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="cr-outcome-grid">
            <div className="cr-card cr-panel-card">
              <h3 className="cr-section-title">Close Outcomes</h3>
              {outcomes.map((o) => (
                <div key={o.key} className="cr-outcome-bar-wrap">
                  <div className="cr-outcome-bar-label">
                    <span>{o.label}</span>
                    <span>{o.pct}%</span>
                  </div>
                  <div className="cr-outcome-bar">
                    <div className={`cr-outcome-bar-fill ${o.key}`} style={{ width: `${o.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="cr-card cr-panel-card">
              <h3 className="cr-section-title">At a glance</h3>
              <div className="cr-aside-row">
                <span>Live signals</span>
                <span>{stats.active}</span>
              </div>
              <div className="cr-aside-row">
                <span>Closed signals</span>
                <span>{stats.completed}</span>
              </div>
              <div className="cr-aside-row">
                <span>Academy</span>
                <span className="cr-aside-row__value">{academyName}</span>
              </div>
              <button
                type="button"
                className="cr-btn-primary cr-btn-sm no-pulse cr-btn-block cr-btn-with-icon"
                onClick={() => navigate('/subscriber/trades/active')}
              >
                View active trades
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="cr-dash-toolbar">
          {[
            { path: '/subscriber/academy', icon: GraduationCap, label: 'My Academy' },
            { path: '/subscriber/trades/active', icon: Activity, label: 'Active Trades' },
            { path: '/subscriber/trades/completed', icon: CheckCircle2, label: 'Completed' },
            { path: '/subscriber/subscriptions', icon: History, label: 'Subscriptions' },
            { path: '/subscriber/profile', icon: User, label: 'Profile' },
          ].map((item) => (
            <button
              key={item.path}
              type="button"
              className="cr-dash-link cr-btn-with-icon"
              onClick={() => navigate(item.path)}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </div>
      </motion.div>
    </SubscriberShell>
  );
};

export default SubscriberDashboard;
