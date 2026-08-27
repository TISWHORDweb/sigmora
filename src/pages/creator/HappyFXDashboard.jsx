'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from '../../lib/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  ChevronRight,
  Crown,
  Diamond,
  Package,
  Plus,
  Search,
  Target,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import DetailModal, { DetailRow } from '../../components/common/DetailModal';
import CreatePackageModal from '../../components/creator/CreatePackageModal';
import CreateAssetModal from '../../components/creator/CreateAssetModal';
import AssetAvatar from '../../components/creator/AssetAvatar';
import AssetSelect from '../../components/creator/AssetSelect';
import TradeSearchBar from '../../components/creator/TradeSearchBar';
import toast from 'react-hot-toast';
import CreatorShell from '../../components/creator/CreatorShell';
import SigmoraLoader from '../../components/common/SigmoraLoader';
import { useConfirm } from '../../context/ConfirmContext';
import { assetService } from '../../services/assetService';
import { packageService } from '../../services/packageService';
import { tradeService } from '../../services/tradeService';
import { subscriptionService } from '../../services/subscriptionService';
import { getApiErrorMessage } from '../../utils/apiErrors';
import { useAuth } from '../../context/AuthContext';
import { tradeResultScore } from '../../utils/assetLogo';

const VIEWS = {
  dashboard: 'dashboard',
  trade: 'trade',
  assets: 'assets',
  packages: 'packages',
};

const EMPTY_OUTCOMES = [
  { label: 'Take Profit', pct: 0, key: 'tp' },
  { label: 'Stop Loss', pct: 0, key: 'sl' },
  { label: 'Manual Close', pct: 0, key: 'manual' },
];

const PACKAGE_ICONS = [Package, Diamond, Crown];

/** Equity curve: one point per closed trade (cumulative score over time). */
function buildEquityCurve(completedList, limit = 24) {
  const sorted = [...completedList].sort(
    (a, b) => new Date(a.closedAt || a.createdAt || 0) - new Date(b.closedAt || b.createdAt || 0)
  );
  const slice = sorted.slice(-limit);
  let running = 0;
  const points = [{ d: 'Start', cum: 0, pair: null, reason: null, score: 0 }];
  slice.forEach((t) => {
    const score = tradeResultScore(t);
    running += score;
    const day = new Date(t.closedAt || t.createdAt || Date.now());
    points.push({
      d: day.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      cum: running,
      pair: t.asset?.symbol || '—',
      reason: t.closeReason || 'Closed',
      score,
    });
  });
  return points;
}

function periodDelta(completedList) {
  const now = Date.now();
  const day = 86400000;
  const last30 = completedList.filter((t) => {
    const ts = new Date(t.closedAt || t.createdAt || 0).getTime();
    return now - ts <= 30 * day;
  });
  const prev30 = completedList.filter((t) => {
    const ts = new Date(t.closedAt || t.createdAt || 0).getTime();
    return now - ts > 30 * day && now - ts <= 60 * day;
  });
  const sum = (list) => list.reduce((acc, t) => acc + tradeResultScore(t), 0);
  const a = sum(last30);
  const b = sum(prev30);
  if (b === 0) return { pct: null, label: last30.length ? 'Last 30 days' : 'No closed trades yet' };
  const pct = Math.round(((a - b) / Math.abs(b)) * 1000) / 10;
  return { pct, label: 'vs previous 30 days' };
}

function formatAxisPts(value) {
  const n = Number(value) || 0;
  if (Math.abs(n) >= 1000) return `${Math.round(n / 1000)}k`;
  return `${Math.round(n)}`;
}

function EquityTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  if (!row) return null;
  return (
    <div className="cr-chart-tooltip">
      <span>{row.pair ? `${row.pair} · ${row.reason}` : 'Baseline'}</span>
      <strong className={row.cum >= 0 ? 'up' : 'down'}>
        {row.cum >= 0 ? '+' : ''}
        {Number(row.cum).toLocaleString()} pts
      </strong>
      {row.score ? (
        <span>
          This close {row.score >= 0 ? '+' : ''}
          {Number(row.score).toLocaleString()}
        </span>
      ) : null}
    </div>
  );
}

function relativeTime(dateLike) {
  if (!dateLike) return '—';
  const t = new Date(dateLike).getTime();
  if (Number.isNaN(t)) return '—';
  const diff = Date.now() - t;
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function useCountUp(target, duration = 1200, enabled = true) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const startTime = performance.now();
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - p) ** 3;
      setValue(Math.floor(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, enabled]);
  return value;
}

const PageLoader = () => (
  <div className="cr-main-loader" style={{ minHeight: 240 }}>
    <SigmoraLoader fullScreen={false} inline />
  </div>
);

const DashboardView = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeTrades: 0,
    completedTrades: 0,
    totalPackages: 0,
    subscribers: 0,
    winRate: 0,
    totalProfit: 0,
    profitDelta: null,
    profitDeltaLabel: 'Last 30 days',
    outcomes: EMPTY_OUTCOMES,
    tpCount: 0,
    slCount: 0,
    manualCount: 0,
  });
  const [recentTrades, setRecentTrades] = useState([]);
  const [packages, setPackages] = useState([]);
  const [equityCurve, setEquityCurve] = useState([{ d: 'Start', cum: 0 }]);

  useEffect(() => {
    const load = async () => {
      try {
        const [active, completed, pkgs, subs] = await Promise.all([
          tradeService.getActiveTrades(),
          tradeService.getCompletedTrades(),
          packageService.getCreatorPackages(),
          subscriptionService.getCreatorSubscriptions(),
        ]);
        const activeList = Array.isArray(active) ? active : [];
        const completedList = Array.isArray(completed) ? completed : [];
        const pkgList = Array.isArray(pkgs) ? pkgs : [];
        const subList = Array.isArray(subs) ? subs : [];
        const uniqueSubs = new Set(
          subList.map((s) => s.subscriber?._id || s.subscriber).filter(Boolean)
        );

        const tp = completedList.filter((t) => t.closeReason === 'TP').length;
        const sl = completedList.filter((t) => t.closeReason === 'SL').length;
        const manual = completedList.filter((t) => t.closeReason === 'Manual').length;
        const closed = completedList.length;
        const winRate = closed > 0 ? Math.round((tp / closed) * 100) : 0;
        const totalProfit = completedList.reduce((acc, t) => acc + tradeResultScore(t), 0);
        const delta = periodDelta(completedList);

        const outcomes =
          closed > 0
            ? [
                { label: 'Take Profit', pct: Math.round((tp / closed) * 100), key: 'tp', count: tp },
                { label: 'Stop Loss', pct: Math.round((sl / closed) * 100), key: 'sl', count: sl },
                {
                  label: 'Manual Close',
                  pct: Math.round((manual / closed) * 100),
                  key: 'manual',
                  count: manual,
                },
              ]
            : EMPTY_OUTCOMES.map((o) => ({ ...o, count: 0 }));

        const pkgBreakdown = pkgList.slice(0, 4).map((p) => {
          const count = subList.filter((s) => {
            const pkgId = s.package?._id || s.package;
            return String(pkgId) === String(p._id);
          }).length;
          return {
            id: p._id,
            name: p.name,
            subs: count,
            revenue: `₦${Number(p.price || 0).toLocaleString()}`,
          };
        });

        setPackages(pkgBreakdown);
        setEquityCurve(buildEquityCurve(completedList, 24));
        setStats({
          activeTrades: activeList.length,
          completedTrades: completedList.length,
          totalPackages: pkgList.length,
          subscribers: uniqueSubs.size,
          winRate,
          totalProfit,
          profitDelta: delta.pct,
          profitDeltaLabel: delta.label,
          outcomes,
          tpCount: tp,
          slCount: sl,
          manualCount: manual,
        });

        setRecentTrades(
          [...activeList, ...completedList]
            .sort(
              (a, b) =>
                new Date(b.createdAt || b.closedAt || 0) - new Date(a.createdAt || a.closedAt || 0)
            )
            .slice(0, 5)
            .map((t) => {
              const isClosed = t.status === 'closed';
              return {
                id: t._id,
                pair: t.asset?.symbol || '—',
                type: t.type,
                close: t.status === 'active' ? 'Open' : t.closeReason || 'Closed',
                when:
                  t.status === 'active'
                    ? 'Live now'
                    : relativeTime(t.closedAt || t.updatedAt || t.createdAt),
                score: isClosed ? tradeResultScore(t) : null,
                open: t.status === 'active',
              };
            })
        );
      } catch {
        setPackages([]);
        setRecentTrades([]);
        setEquityCurve([{ d: 'Start', cum: 0 }]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const active = useCountUp(stats.activeTrades);
  const packagesCount = useCountUp(stats.totalPackages);
  const subs = useCountUp(stats.subscribers);
  const profitAbs = useCountUp(Math.abs(stats.totalProfit));
  const profitSigned = stats.totalProfit;
  const winDisplay = useCountUp(stats.winRate);

  const hasEquity = equityCurve.length > 1;
  const cumVals = equityCurve.map((p) => p.cum);
  const yMin = Math.min(0, ...cumVals);
  const yMax = Math.max(0, ...cumVals);
  const yPad = Math.max(8, (yMax - yMin) * 0.15 || 8);
  const strokeColor = profitSigned >= 0 ? '#a855f7' : '#f43f5e';

  if (loading) return <PageLoader />;

  const kpis = [
    {
      key: 'score',
      label: 'Signal score',
      value: `${profitSigned >= 0 ? '+' : '−'}${profitAbs.toLocaleString()}`,
      hint:
        stats.profitDelta == null
          ? stats.profitDeltaLabel
          : `${stats.profitDelta >= 0 ? '▲' : '▼'} ${Math.abs(stats.profitDelta)}% ${stats.profitDeltaLabel}`,
      tone: profitSigned >= 0 ? 'good' : 'bad',
      icon: TrendingUp,
    },
    {
      key: 'win',
      label: 'Win rate',
      value: `${winDisplay}%`,
      hint: `${stats.completedTrades} closed trades`,
      tone: stats.winRate > 50 ? 'good' : stats.winRate === 0 ? 'muted' : 'bad',
      icon: Target,
    },
    {
      key: 'active',
      label: 'Active trades',
      value: String(active),
      hint: `${stats.completedTrades} completed`,
      tone: 'info',
      icon: Activity,
    },
    {
      key: 'subs',
      label: 'Subscribers',
      value: String(subs),
      hint: `${packagesCount} live packages`,
      tone: 'good',
      icon: Users,
    },
  ];

  return (
    <div className="cr-dash">
      <div className="cr-dash-kpis">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.key} className={`cr-dash-kpi cr-dash-kpi--${k.tone}`}>
              <div className="cr-dash-kpi__icon">
                <Icon size={18} />
              </div>
              <div className="cr-dash-kpi__body">
                <span className="cr-dash-kpi__label">{k.label}</span>
                <strong className="cr-dash-kpi__value">{k.value}</strong>
                <span className="cr-dash-kpi__hint">{k.hint}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cr-dash-grid">
        <section className="cr-card cr-dash-equity">
          <header className="cr-dash-panel-head">
            <div>
              <h3 className="cr-section-title">Equity curve</h3>
              <p className="cr-dash-panel-sub">Running score after each closed signal</p>
            </div>
            <div className="cr-dash-equity-summary">
              <strong className={profitSigned >= 0 ? 'up' : 'down'}>
                {profitSigned >= 0 ? '+' : '−'}
                {Math.abs(profitSigned).toLocaleString()} pts
              </strong>
              <span>
                {stats.tpCount} TP · {stats.slCount} SL · {stats.manualCount} Manual
              </span>
            </div>
          </header>
          <div className={`cr-dash-equity-chart ${profitSigned >= 0 ? 'is-up' : 'is-down'}`}>
            {!hasEquity ? (
              <div className="cr-chart-empty">Close a few trades to build your equity curve.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={equityCurve} margin={{ top: 20, right: 18, left: 0, bottom: 4 }}>
                  <defs>
                    <linearGradient id="equityGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={strokeColor} stopOpacity={0.45} />
                      <stop offset="45%" stopColor={strokeColor} stopOpacity={0.12} />
                      <stop offset="100%" stopColor={strokeColor} stopOpacity={0} />
                    </linearGradient>
                    <filter id="equitySoft" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.045)" vertical={false} strokeDasharray="3 6" />
                  <XAxis
                    dataKey="d"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#8a8298', fontSize: 11 }}
                    dy={10}
                    minTickGap={32}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#8a8298', fontSize: 11 }}
                    tickFormatter={formatAxisPts}
                    width={44}
                    domain={[yMin - yPad, yMax + yPad]}
                  />
                  <ReferenceLine y={0} stroke="rgba(255,255,255,0.18)" strokeDasharray="4 4" />
                  <Tooltip
                    content={<EquityTooltip />}
                    cursor={{ stroke: 'rgba(168,85,247,0.35)', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="cum"
                    stroke={strokeColor}
                    strokeWidth={3}
                    fill="url(#equityGlow)"
                    filter="url(#equitySoft)"
                    dot={{ r: 3.5, fill: strokeColor, stroke: '#12081c', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: '#fff', stroke: strokeColor, strokeWidth: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        <aside className="cr-dash-aside">
          <section className="cr-card cr-dash-outcomes">
            <header className="cr-dash-panel-head">
              <div>
                <h3 className="cr-section-title">Close mix</h3>
                <p className="cr-dash-panel-sub">How signals finish</p>
              </div>
            </header>
            {stats.completedTrades === 0 ? (
              <p className="cr-muted-copy">No closed trades yet.</p>
            ) : (
              <>
                <div className="cr-dash-stack" aria-hidden>
                  {stats.outcomes.map((o) =>
                    o.pct > 0 ? (
                      <span
                        key={o.key}
                        className={`cr-dash-stack__seg ${o.key}`}
                        style={{ width: `${o.pct}%` }}
                        title={`${o.label} ${o.pct}%`}
                      />
                    ) : null
                  )}
                </div>
                <ul className="cr-dash-outcome-list">
                  {stats.outcomes.map((o) => (
                    <li key={o.key}>
                      <span className={`cr-outcome-dot ${o.key}`} />
                      <span className="cr-dash-outcome-list__label">{o.label}</span>
                      <span className="cr-dash-outcome-list__count">{o.count ?? 0}</span>
                      <strong>{o.pct}%</strong>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>

          <section className="cr-card cr-dash-pkgs">
            <header className="cr-dash-panel-head">
              <div>
                <h3 className="cr-section-title">Packages</h3>
              </div>
              <button type="button" className="cr-text-link" onClick={() => onNavigate(VIEWS.packages)}>
                Manage
              </button>
            </header>
            {packages.length === 0 ? (
              <p className="cr-muted-copy">No packages yet.</p>
            ) : (
              <ul className="cr-dash-pkg-list">
                {packages.map((p, i) => {
                  const Icon = PACKAGE_ICONS[i % PACKAGE_ICONS.length];
                  return (
                    <li key={p.id || p.name}>
                      <button
                        type="button"
                        className="cr-dash-pkg-row"
                        onClick={() => onNavigate(VIEWS.packages)}
                      >
                        <span className="cr-dash-pkg-row__icon">
                          <Icon size={15} />
                        </span>
                        <span className="cr-dash-pkg-row__body">
                          <strong>{p.name}</strong>
                          <span>{p.subs} subscribers</span>
                        </span>
                        <span className="cr-dash-pkg-row__price">{p.revenue}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </aside>
      </div>

      <section className="cr-card cr-dash-signals">
        <header className="cr-dash-panel-head">
          <div>
            <h3 className="cr-section-title">Recent signals</h3>
            <p className="cr-dash-panel-sub">Latest 5 placements</p>
          </div>
          <div className="cr-dash-signals__actions">
            <button type="button" className="cr-text-link" onClick={() => navigate('/creator/trades/active')}>
              View all
            </button>
            <button type="button" className="cr-dash-link" onClick={() => onNavigate(VIEWS.trade)}>
              <Plus size={14} /> New
            </button>
          </div>
        </header>
        {recentTrades.length === 0 ? (
          <div className="cr-signal-empty">
            No signals yet. Place your first trade to populate this feed.
          </div>
        ) : (
          <div className="cr-dash-table-wrap">
            <table className="cr-dash-table">
              <thead>
                <tr>
                  <th>Pair</th>
                  <th>Side</th>
                  <th>Status</th>
                  <th>Result</th>
                  <th>When</th>
                  <th aria-label="Open" />
                </tr>
              </thead>
              <tbody>
                {recentTrades.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() =>
                      navigate(s.open ? '/creator/trades/active' : '/creator/trades/completed')
                    }
                  >
                    <td>
                      <div className="cr-dash-table__pair">
                        <AssetAvatar symbol={s.pair} size={28} />
                        <span>{s.pair}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`cr-trade-badge ${s.type === 'BUY' ? 'buy' : 'sell'}`}>
                        {s.type}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`cr-dash-status ${s.open ? 'live' : String(s.close).toLowerCase()}`}
                      >
                        {s.close}
                      </span>
                    </td>
                    <td>
                      {s.score != null ? (
                        <strong className={s.score >= 0 ? 'up' : 'down'}>
                          {s.score >= 0 ? '+' : ''}
                          {s.score.toLocaleString()}
                        </strong>
                      ) : (
                        <span className="cr-muted-copy">—</span>
                      )}
                    </td>
                    <td className="cr-dash-table__when">{s.when}</td>
                    <td>
                      <ChevronRight size={16} className="cr-signal-chevron" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

const CreateTradeView = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedPackageIds, setSelectedPackageIds] = useState([]);
  const [assetId, setAssetId] = useState('');
  const [tradeType, setTradeType] = useState('BUY');
  const [pip, setPip] = useState('');
  const [spread, setSpread] = useState('');
  const [tp, setTp] = useState('');
  const [sl, setSl] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const [assetsData, packagesData] = await Promise.all([
          assetService.getAssets(),
          packageService.getCreatorPackages(),
        ]);
        const assetList = Array.isArray(assetsData) ? assetsData : [];
        const pkgList = Array.isArray(packagesData) ? packagesData : [];
        setAssets(assetList);
        setPackages(pkgList);
        if (assetList.length > 0) {
          setAssetId(assetList[0]._id);
          setSpread(String(assetList[0].spread ?? ''));
        }
        if (pkgList.length > 0) {
          const freePkg = pkgList.find((p) => p.name?.toLowerCase() === 'free');
          setSelectedPackageIds([freePkg?._id || pkgList[0]._id]);
        }
      } catch {
        toast.error('Failed to load assets and packages');
      } finally {
        setLoadingData(false);
      }
    };
    load();
  }, []);

  const selectedAsset = assets.find((a) => a._id === assetId);
  const assetLabel = selectedAsset?.symbol || '—';
  const selectedPackageNames = packages
    .filter((p) => selectedPackageIds.includes(p._id))
    .map((p) => p.name);

  const rr = useMemo(() => {
    const tpN = parseFloat(tp) || 0;
    const slN = parseFloat(sl) || 1;
    if (slN === 0) return '—';
    return (tpN / slN).toFixed(1);
  }, [tp, sl]);

  const togglePackage = (id) => {
    setSelectedPackageIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const onAssetChange = (id) => {
    setAssetId(id);
    const a = assets.find((x) => x._id === id);
    if (a) {
      setSpread(String(a.spread ?? ''));
      if (!pip && a.pipValue != null) setPip(String(a.pipValue));
    }
  };

  const handleReview = (e) => {
    e.preventDefault();
    if (!assetId) {
      toast.error('Select an asset');
      return;
    }
    if (selectedPackageIds.length === 0) {
      toast.error('Select at least one package');
      return;
    }
    setConfirmOpen(true);
  };

  const submitTrade = async () => {
    setSubmitting(true);
    try {
      await tradeService.createTrade({
        asset: assetId,
        type: tradeType,
        pip: parseFloat(pip),
        spread: parseFloat(spread),
        takeProfit: parseFloat(tp),
        stopLoss: parseFloat(sl),
        packages: selectedPackageIds,
      });
      setConfirmOpen(false);
      toast.success('Trade created — visible in Active Trades');
      navigate('/creator/trades/active');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to create trade'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingData) return <PageLoader />;

  if (assets.length === 0 || packages.length === 0) {
    return (
      <div className="cr-card cr-empty">
        <h3>Setup required</h3>
        <p>
          {assets.length === 0 && 'Create at least one asset. '}
          {packages.length === 0 && 'Create at least one package. '}
          Then you can place trades.
        </p>
        <div className="cr-dash-toolbar" style={{ marginTop: 16, justifyContent: 'center' }}>
          {assets.length === 0 && (
            <button type="button" className="cr-dash-link" onClick={() => navigate('/creator/dashboard?view=assets')}>
              Add assets
            </button>
          )}
          {packages.length === 0 && (
            <button type="button" className="cr-dash-link" onClick={() => navigate('/creator/dashboard?view=packages')}>
              Add packages
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <motion.div className="cr-form-layout" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <form className="cr-card cr-form-panel" onSubmit={handleReview}>
        <section className="cr-form-section">
          <h4 className="cr-form-section-title">Audience</h4>
          <div className="cr-field" style={{ marginBottom: 0 }}>
            <span className="cr-field-label">Packages to notify</span>
            <div className="cr-pills">
              {packages.map((pkg) => (
                <button
                  key={pkg._id}
                  type="button"
                  className={`cr-pill ${selectedPackageIds.includes(pkg._id) ? 'selected' : ''}`}
                  onClick={() => togglePackage(pkg._id)}
                >
                  {pkg.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="cr-form-section">
          <h4 className="cr-form-section-title">Instrument</h4>
          <div className="cr-field">
            <span className="cr-field-label">Asset</span>
            <AssetSelect
              assets={assets}
              value={assetId}
              onChange={onAssetChange}
              placeholder="Select asset"
              required
            />
          </div>
          <div className="cr-field" style={{ marginBottom: 0 }}>
            <span className="cr-field-label">Direction</span>
            <div className="cr-segment">
              <button
                type="button"
                className={`buy ${tradeType === 'BUY' ? 'active' : ''}`}
                onClick={() => setTradeType('BUY')}
              >
                BUY
              </button>
              <button
                type="button"
                className={`sell ${tradeType === 'SELL' ? 'active' : ''}`}
                onClick={() => setTradeType('SELL')}
              >
                SELL
              </button>
            </div>
          </div>
        </section>

        <section className="cr-form-section">
          <h4 className="cr-form-section-title">Levels</h4>
          <div className="cr-form-grid-2">
            <div className="cr-field">
              <span className="cr-field-label">PIP</span>
              <input
                className="cr-input"
                type="number"
                step="any"
                value={pip}
                onChange={(e) => setPip(e.target.value)}
                required
              />
            </div>
            <div className="cr-field">
              <span className="cr-field-label">Spread</span>
              <input
                className="cr-input"
                type="number"
                step="0.1"
                value={spread}
                onChange={(e) => setSpread(e.target.value)}
                required
              />
            </div>
            <div className="cr-field">
              <span className="cr-field-label">Take profit</span>
              <div className="cr-input-wrap tp">
                <input
                  className="cr-input"
                  type="number"
                  step="any"
                  value={tp}
                  onChange={(e) => setTp(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="cr-field">
              <span className="cr-field-label">Stop loss</span>
              <div className="cr-input-wrap sl">
                <input
                  className="cr-input"
                  type="number"
                  step="any"
                  value={sl}
                  onChange={(e) => setSl(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </section>

        <div className="cr-form-submit-wrap">
          <button type="submit" className="cr-btn-primary no-pulse">
            Review & place trade
          </button>
        </div>
      </form>

      <DetailModal
        open={confirmOpen}
        title="Confirm trade"
        subtitle="Review details before broadcasting to subscribers."
        confirmLabel="Continue & create"
        cancelLabel="Go back"
        onConfirm={submitTrade}
        onCancel={() => setConfirmOpen(false)}
        loading={submitting}
        confirmVariant="success"
      >
        <DetailRow label="Asset" value={assetLabel} />
        <DetailRow label="Direction" value={tradeType} highlight={tradeType === 'BUY' ? 'buy' : 'sell'} />
        <DetailRow label="PIP" value={pip} />
        <DetailRow label="Spread" value={spread} />
        <DetailRow label="Take profit" value={tp} />
        <DetailRow label="Stop loss" value={sl} />
        <DetailRow label="Risk / reward" value={`1:${rr}`} />
        <DetailRow
          label="Packages"
          value={selectedPackageNames.length ? selectedPackageNames.join(', ') : '—'}
        />
      </DetailModal>

      <aside className="cr-card cr-form-aside">
        <h3 className="cr-aside-title">Trade preview</h3>
        <div className="cr-aside-rr">
          <div className="cr-aside-rr-value">1:{rr}</div>
          <div className="cr-aside-rr-label">Risk / reward</div>
        </div>
        <div className="cr-aside-row">
          <span>Asset</span>
          <span>{assetLabel}</span>
        </div>
        <div className="cr-aside-row">
          <span>Type</span>
          <span>{tradeType}</span>
        </div>
        <div className="cr-aside-row">
          <span>TP / SL</span>
          <span>
            {tp || '—'} / {sl || '—'}
          </span>
        </div>
        <div className="cr-aside-row">
          <span>Packages</span>
          <span>{selectedPackageNames.length ? selectedPackageNames.join(', ') : '—'}</span>
        </div>
      </aside>
    </motion.div>
  );
};

const AssetManagementView = () => {
  const confirm = useConfirm();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assetSearch, setAssetSearch] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const loadAssets = async () => {
    try {
      const data = await assetService.getAssets();
      setAssets(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load assets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  const filteredAssets = useMemo(() => {
    const q = assetSearch.trim().toLowerCase();
    if (!q) return assets;
    return assets.filter((a) => {
      const hay = [a.symbol, String(a.pipValue), String(a.spread), String(a.margin)].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [assets, assetSearch]);

  const removeAsset = async (id) => {
    const ok = await confirm({
      title: 'Delete asset?',
      message: 'This symbol will be removed from your catalog. Existing trades are not affected.',
      confirmLabel: 'Delete',
      variant: 'danger',
    });
    if (!ok) return;
    try {
      await assetService.deleteAsset(id);
      toast.success('Asset removed');
      setAssets((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to delete asset'));
    }
  };

  if (loading) return <PageLoader />;

  return (
    <motion.div className="cr-page-full" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <section className="cr-packages-section">
        <div className="cr-packages-header">
          <h3 className="cr-section-title">Your assets</h3>
          <button
            type="button"
            className="cr-btn-primary cr-btn-sm no-pulse"
            onClick={() => setCreateModalOpen(true)}
          >
            <Plus size={16} />
            Add assets
          </button>
        </div>

        {assets.length > 0 && (
          <TradeSearchBar
            value={assetSearch}
            onChange={setAssetSearch}
            placeholder="Search by symbol, PIP, spread, margin…"
            filteredCount={filteredAssets.length}
            totalCount={assets.length}
          />
        )}

        {assets.length === 0 ? (
          <div className="cr-card cr-empty">
            <p>No assets yet.</p>
            <button
              type="button"
              className="cr-btn-primary cr-btn-sm no-pulse"
              style={{ marginTop: 16, width: 'auto' }}
              onClick={() => setCreateModalOpen(true)}
            >
              Add assets
            </button>
          </div>
        ) : filteredAssets.length === 0 ? (
          <div className="cr-card cr-empty">
            <p>No assets match &ldquo;{assetSearch}&rdquo;.</p>
          </div>
        ) : (
          <div className="cr-assets-grid">
            {filteredAssets.map((a) => (
              <div key={a._id} className="cr-card cr-asset-card">
                <button type="button" className="cr-asset-delete" onClick={() => removeAsset(a._id)} aria-label="Delete">
                  ×
                </button>
                <div className="cr-asset-card-head">
                  <AssetAvatar symbol={a.symbol} size={40} />
                  <div className="cr-asset-symbol">{a.symbol}</div>
                </div>
                <div className="cr-asset-row">
                  <span>PIP</span>
                  <span>{a.pipValue}</span>
                </div>
                <div className="cr-asset-row">
                  <span>Spread</span>
                  <span>{a.spread}</span>
                </div>
                <div className="cr-asset-row">
                  <span>Margin</span>
                  <span>{a.margin}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <CreateAssetModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreated={loadAssets}
        existingSymbols={assets.map((a) => a.symbol)}
      />
    </motion.div>
  );
};

const PackagesView = () => {
  const [packages, setPackages] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [packageSearch, setPackageSearch] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const loadPackages = async () => {
    try {
      const data = await packageService.getCreatorPackages();
      setPackages(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load packages');
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const filteredPackages = useMemo(() => {
    const q = packageSearch.trim().toLowerCase();
    if (!q) return packages;
    return packages.filter((pkg) => {
      const hay = [
        pkg.name,
        pkg.description,
        ...(pkg.features || []),
        String(pkg.price),
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [packages, packageSearch]);

  return (
    <motion.div className="cr-page-full" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <section className="cr-packages-section">
        <div className="cr-packages-header">
          <h3 className="cr-section-title">Your packages</h3>
          <button
            type="button"
            className="cr-btn-primary cr-btn-sm no-pulse"
            onClick={() => setCreateModalOpen(true)}
          >
            <Plus size={16} />
            Create package
          </button>
        </div>
        {!loadingList && packages.length > 0 && (
          <div className="cr-search-bar" style={{ marginBottom: 16 }}>
            <Search size={18} className="cr-search-bar__icon" aria-hidden />
            <input
              type="search"
              className="cr-search-bar__input"
              placeholder="Search packages…"
              value={packageSearch}
              onChange={(e) => setPackageSearch(e.target.value)}
            />
            {packageSearch && (
              <button
                type="button"
                className="cr-search-bar__clear"
                onClick={() => setPackageSearch('')}
                aria-label="Clear"
              >
                <X size={16} />
              </button>
            )}
            <span className="cr-search-bar__count">
              {packageSearch ? `${filteredPackages.length} of ${packages.length}` : `${packages.length} total`}
            </span>
          </div>
        )}
        {loadingList ? (
          <PageLoader />
        ) : packages.length === 0 ? (
          <div className="cr-card cr-empty">
            <p>No packages yet.</p>
            <button
              type="button"
              className="cr-btn-primary cr-btn-sm no-pulse"
              style={{ marginTop: 16, width: 'auto' }}
              onClick={() => setCreateModalOpen(true)}
            >
              Create package
            </button>
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="cr-card cr-empty">
            <p>No packages match &ldquo;{packageSearch}&rdquo;.</p>
          </div>
        ) : (
          <div className="cr-packages-grid">
            {filteredPackages.map((pkg) => (
              <article key={pkg._id} className="cr-card cr-package-card">
                <div className="cr-package-card-head">
                  <h4 className="cr-package-card-name">{pkg.name}</h4>
                  <span className="cr-package-card-price">₦{Number(pkg.price).toLocaleString()}</span>
                </div>
                {pkg.description && <p className="cr-package-card-desc">{pkg.description}</p>}
                {pkg.features?.length > 0 && (
                  <div className="cr-package-card-features">
                    {pkg.features.slice(0, 4).map((f) => (
                      <span key={f} className="cr-tag">
                        {f}
                      </span>
                    ))}
                    {pkg.features.length > 4 && (
                      <span className="cr-tag">+{pkg.features.length - 4}</span>
                    )}
                  </div>
                )}
                <span className="cr-package-card-meta">
                  {pkg.features?.length ?? 0} feature{(pkg.features?.length ?? 0) !== 1 ? 's' : ''}
                  {pkg.createdAt && ` · ${new Date(pkg.createdAt).toLocaleDateString()}`}
                </span>
              </article>
            ))}
          </div>
        )}
      </section>

      <CreatePackageModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreated={() => {
          setLoadingList(true);
          loadPackages();
        }}
      />
    </motion.div>
  );
};

const VIEW_FROM_QUERY = {
  dashboard: VIEWS.dashboard,
  trade: VIEWS.trade,
  'create-trade': VIEWS.trade,
  assets: VIEWS.assets,
  packages: VIEWS.packages,
  'create-package': VIEWS.packages,
};

const VIEW_META = {
  [VIEWS.dashboard]: {
    title: null,
    subtitle: "Here's what's happening with your signals today.",
  },
  [VIEWS.trade]: {
    title: 'New Trade',
    subtitle: 'Broadcast a signal to selected package tiers',
  },
  [VIEWS.assets]: {
    title: 'Assets',
    subtitle: 'Symbols, pip values, spreads, and margin',
  },
  [VIEWS.packages]: {
    title: 'Packages',
    subtitle: 'View tiers you offer and create new subscription packages',
  },
};

const HappyFXDashboard = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryView = searchParams.get('view');
  const activeView = VIEW_FROM_QUERY[queryView] ?? VIEWS.dashboard;

  const setView = (view) => {
    setSearchParams(view === VIEWS.dashboard ? {} : { view }, { replace: true });
  };

  const meta = VIEW_META[activeView] || VIEW_META[VIEWS.dashboard];
  const activeNav = activeView === VIEWS.dashboard ? 'overview' : activeView;
  const displayName = user?.creatorName || user?.name || 'Creator';
  const title =
    activeView === VIEWS.dashboard ? `Welcome back, ${displayName}` : meta.title;

  return (
    <CreatorShell title={title} subtitle={meta.subtitle} activeNav={activeNav}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          className="cr-page"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeView === VIEWS.dashboard && <DashboardView onNavigate={setView} />}
          {activeView === VIEWS.trade && <CreateTradeView />}
          {activeView === VIEWS.assets && <AssetManagementView />}
          {activeView === VIEWS.packages && <PackagesView />}
        </motion.div>
      </AnimatePresence>
    </CreatorShell>
  );
};

export default HappyFXDashboard;
