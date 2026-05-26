import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Boxes, Layers, Plus, Search, X } from 'lucide-react';
import DetailModal, { DetailRow } from '../../components/common/DetailModal';
import CreatePackageModal from '../../components/creator/CreatePackageModal';
import CreateAssetModal from '../../components/creator/CreateAssetModal';
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

const VIEWS = {
  dashboard: 'dashboard',
  trade: 'trade',
  assets: 'assets',
  packages: 'packages',
};

const MOCK_STATS = {
  activeTrades: 12,
  completedTrades: 148,
  totalPackages: 3,
  subscribers: 47,
  winRate: 0,
  totalProfit: 13091,
};

const RECENT_SIGNALS = [
  { id: 1, pair: 'EUR/USD', type: 'BUY', close: 'TP', time: '2 hours ago', pips: '+42' },
  { id: 2, pair: 'GBP/USD', type: 'SELL', close: 'SL', time: '5 hours ago', pips: '-18' },
  { id: 3, pair: 'XAU/USD', type: 'BUY', close: 'TP', time: 'Yesterday', pips: '+65' },
  { id: 4, pair: 'USD/JPY', type: 'SELL', close: 'Manual', time: 'Yesterday', pips: '+12' },
  { id: 5, pair: 'EUR/USD', type: 'BUY', close: 'Open', time: 'Live', pips: '+8' },
];

const OUTCOME_STATS = [
  { label: 'Take Profit', pct: 52, key: 'tp' },
  { label: 'Stop Loss', pct: 31, key: 'sl' },
  { label: 'Manual Close', pct: 17, key: 'manual' },
];

const PACKAGE_BREAKDOWN = [
  { name: 'Basic', subs: 28, revenue: '₦840,000' },
  { name: 'Pro', subs: 14, revenue: '₦1,260,000' },
  { name: 'Advanced', subs: 5, revenue: '₦750,000' },
];


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
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeTrades: 0,
    completedTrades: 0,
    totalPackages: 0,
    subscribers: 0,
    winRate: 0,
    totalProfit: 0,
  });
  const [recentTrades, setRecentTrades] = useState([]);

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
        const subList = Array.isArray(subs) ? subs : [];
        const uniqueSubs = new Set(subList.map((s) => s.subscriber?._id || s.subscriber).filter(Boolean));

        const tp = completedList.filter((t) => t.closeReason === 'TP').length;
        const winRate =
          completedList.length > 0 ? Math.round((tp / completedList.length) * 100) : 0;

        setStats({
          activeTrades: activeList.length,
          completedTrades: completedList.length,
          totalPackages: Array.isArray(pkgs) ? pkgs.length : 0,
          subscribers: uniqueSubs.size,
          winRate,
          totalProfit: MOCK_STATS.totalProfit,
        });
        setRecentTrades(
          [...activeList, ...completedList.slice(0, 5)].slice(0, 6).map((t) => ({
            id: t._id,
            pair: t.asset?.symbol || '—',
            type: t.type,
            close: t.status === 'active' ? 'Open' : t.closeReason || 'Closed',
            time: t.status === 'active' ? 'Live' : t.closedAt ? new Date(t.closedAt).toLocaleDateString() : '—',
            pips: t.status === 'active' ? '—' : t.closeReason === 'TP' ? '+TP' : t.closeReason === 'SL' ? '-SL' : '—',
          }))
        );
      } catch {
        /* keep defaults */
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const active = useCountUp(stats.activeTrades);
  const completed = useCountUp(stats.completedTrades);
  const packages = useCountUp(stats.totalPackages);
  const subs = useCountUp(stats.subscribers);
  const profit = useCountUp(stats.totalProfit);

  const winClass =
    stats.winRate === 0 ? 'win-low' : stats.winRate > 50 ? 'win-high' : '';

  const signals = recentTrades.length > 0 ? recentTrades : RECENT_SIGNALS;

  if (loading) return <PageLoader />;

  return (
    <div className="cr-dashboard-page">
      <div className="cr-stat-row">
        <div className="cr-card cr-stat-tile">
          <div className="cr-stat-tile-label">Total Profit</div>
          <div className="cr-stat-tile-value accent">${profit.toLocaleString()}</div>
        </div>
        <div className="cr-card cr-stat-tile">
          <div className="cr-stat-tile-label">Win Rate</div>
          <div className={`cr-stat-tile-value ${winClass}`}>{stats.winRate}%</div>
        </div>
        <div className="cr-card cr-stat-tile">
          <div className="cr-stat-tile-label">Active Trades</div>
          <div className="cr-stat-tile-value">{active}</div>
        </div>
        <div className="cr-card cr-stat-tile">
          <div className="cr-stat-tile-label">Subscribers</div>
          <div className="cr-stat-tile-value">{subs}</div>
        </div>
      </div>

      <div className="cr-overview-grid">
        <div className="cr-card cr-feed-card">
          <div className="cr-feed-head">
            <h3 className="cr-section-title" style={{ margin: 0 }}>
              Recent Signals
            </h3>
            <button type="button" className="cr-dash-link" onClick={() => onNavigate(VIEWS.trade)}>
              <Plus size={14} />
              New signal
            </button>
          </div>
          <ul className="cr-signal-list">
            {signals.map((s) => (
              <li key={s.id} className="cr-signal-item">
                <div>
                  <div className="cr-signal-pair">{s.pair}</div>
                  <div className="cr-signal-meta">
                    {s.type} · {s.time}
                  </div>
                </div>
                <span className={`cr-trade-badge ${s.type === 'BUY' ? 'buy' : 'sell'}`}>{s.type}</span>
                <span
                  className="cr-metric-compact-value"
                  style={{
                    color: s.pips.startsWith('+') ? 'var(--cr-green)' : s.pips.startsWith('-') ? 'var(--cr-coral)' : 'var(--cr-amber)',
                    fontSize: '0.9rem',
                  }}
                >
                  {s.close} {s.pips}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="cr-outcome-grid">
          <div className="cr-card" style={{ padding: 20 }}>
            <h3 className="cr-section-title">Close Outcomes</h3>
            {OUTCOME_STATS.map((o) => (
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

          <div className="cr-card" style={{ padding: 20 }}>
            <h3 className="cr-section-title">Packages</h3>
            {PACKAGE_BREAKDOWN.map((p) => (
              <div key={p.name} className="cr-pkg-mini">
                <div>
                  <strong>{p.name}</strong>
                  <div className="cr-signal-meta">{p.subs} subscribers</div>
                </div>
                <span>{p.revenue}</span>
              </div>
            ))}
          </div>

          <div className="cr-card" style={{ padding: 20 }}>
            <h3 className="cr-section-title" style={{ marginBottom: 12 }}>
              At a glance
            </h3>
            <div className="cr-aside-row">
              <span>Completed trades</span>
              <span>{completed}</span>
            </div>
            <div className="cr-aside-row">
              <span>Active packages</span>
              <span>{packages}</span>
            </div>
            <button
              type="button"
              className="cr-btn-primary cr-btn-sm no-pulse"
              style={{ width: '100%', marginTop: 16 }}
              onClick={() => onNavigate(VIEWS.trade)}
            >
              Place new trade
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="cr-dash-toolbar" style={{ marginTop: 20 }}>
        {[
          { id: VIEWS.trade, icon: Plus, label: 'New Trade' },
          { id: VIEWS.assets, icon: Layers, label: 'Assets' },
          { id: VIEWS.packages, icon: Boxes, label: 'Packages' },
        ].map((item) => (
          <button key={item.id} type="button" className="cr-dash-link" onClick={() => onNavigate(item.id)}>
            <item.icon size={16} />
            {item.label}
          </button>
        ))}
      </div>
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
            <div className="cr-input-wrap" style={{ position: 'relative' }}>
              <Search size={16} color="#8b92a8" style={{ position: 'absolute', left: 12, top: 14, zIndex: 1 }} />
              <select
                className="cr-select"
                value={assetId}
                onChange={(e) => onAssetChange(e.target.value)}
                style={{ paddingLeft: 40 }}
                required
              >
                <option value="">Select asset</option>
                {assets.map((a) => (
                  <option key={a._id} value={a._id}>
                    {a.symbol}
                  </option>
                ))}
              </select>
            </div>
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
                <div className="cr-asset-symbol">{a.symbol}</div>
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
    title: 'Overview',
    subtitle: 'Signals, packages, and performance at a glance',
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
  const [searchParams, setSearchParams] = useSearchParams();
  const queryView = searchParams.get('view');
  const activeView = VIEW_FROM_QUERY[queryView] ?? VIEWS.dashboard;

  const setView = (view) => {
    setSearchParams(view === VIEWS.dashboard ? {} : { view }, { replace: true });
  };

  const meta = VIEW_META[activeView] || VIEW_META[VIEWS.dashboard];
  const activeNav = activeView === VIEWS.dashboard ? 'overview' : activeView;

  return (
    <CreatorShell title={meta.title} subtitle={meta.subtitle} activeNav={activeNav}>
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
