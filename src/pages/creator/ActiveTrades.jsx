'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from '../../lib/router';
import { ArrowLeft } from 'lucide-react';
import CreatorShell from '../../components/creator/CreatorShell';
import TradeSearchBar from '../../components/creator/TradeSearchBar';
import TradeTypeFilter from '../../components/creator/TradeTypeFilter';
import { useConfirm } from '../../context/ConfirmContext';
import { tradeService } from '../../services/tradeService';
import { filterTrades, getTradeTypeCounts } from '../../utils/filterTrades';
import { getApiErrorMessage } from '../../utils/apiErrors';
import toast from 'react-hot-toast';

const CLOSE_CONFIRM = {
  TP: {
    title: 'Close at Take Profit?',
    message: 'This will mark the trade as closed with a TP outcome and notify subscribers.',
    confirmLabel: 'Close as TP',
    variant: 'success',
  },
  SL: {
    title: 'Close at Stop Loss?',
    message: 'This will mark the trade as closed with an SL outcome and notify subscribers.',
    confirmLabel: 'Close as SL',
    variant: 'danger',
  },
  Manual: {
    title: 'Manual close?',
    message: 'Close this trade manually. Subscribers will see it as a manual close.',
    confirmLabel: 'Close manually',
    variant: 'warning',
  },
};

const ActiveTrades = () => {
  const confirm = useConfirm();
  const navigate = useNavigate();
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const initialLoad = useRef(true);

  const typeCounts = useMemo(() => getTradeTypeCounts(trades), [trades]);
  const filteredTrades = useMemo(
    () => filterTrades(trades, search, typeFilter),
    [trades, search, typeFilter]
  );

  useEffect(() => {
    loadTrades();
    const interval = setInterval(loadTrades, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadTrades = async () => {
    try {
      const data = await tradeService.getActiveTrades();
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

  const handleCloseTrade = async (tradeId, closeReason) => {
    const opts = CLOSE_CONFIRM[closeReason] || CLOSE_CONFIRM.Manual;
    const ok = await confirm(opts);
    if (!ok) return;
    try {
      await tradeService.closeTrade(tradeId, closeReason);
      toast.success('Trade closed');
      loadTrades();
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to close trade'));
    }
  };

  return (
    <CreatorShell
      title="Active Trades"
      subtitle="Live positions — updates every 5 seconds"
      activeNav="active-trades"
      loading={loading}
      topAction={
        <button type="button" className="cr-btn-ghost" onClick={() => navigate('/creator/dashboard')}>
          <ArrowLeft size={16} />
          Overview
        </button>
      }
    >
      {!loading && trades.length > 0 && (
        <div className="cr-trades-filters">
          <TradeTypeFilter value={typeFilter} onChange={setTypeFilter} counts={typeCounts} />
          <TradeSearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search symbol, type, package…"
            filteredCount={filteredTrades.length}
            totalCount={trades.length}
          />
        </div>
      )}

      {!loading && trades.length === 0 ? (
        <div className="cr-card cr-empty">
          <h3>No active trades</h3>
          <p>Create a new trade to broadcast signals to your subscribers.</p>
          <button
            type="button"
            className="cr-btn-primary cr-btn-sm"
            style={{ marginTop: 20, width: 'auto' }}
            onClick={() => navigate('/creator/dashboard?view=trade')}
          >
            New Trade
          </button>
        </div>
      ) : !loading && filteredTrades.length === 0 ? (
        <div className="cr-card cr-empty">
          <h3>No matches</h3>
          <p>No active trades match &ldquo;{search}&rdquo;.</p>
          <button type="button" className="cr-dash-link" style={{ marginTop: 12 }} onClick={() => setSearch('')}>
            Clear search
          </button>
        </div>
      ) : (
        !loading && (
        <div className="cr-trade-grid">
          {filteredTrades.map((trade) => (
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
              </dl>
              <div className="cr-trade-actions">
                <button type="button" className="cr-btn-tp" onClick={() => handleCloseTrade(trade._id, 'TP')}>
                  Close TP
                </button>
                <button type="button" className="cr-btn-sl" onClick={() => handleCloseTrade(trade._id, 'SL')}>
                  Close SL
                </button>
                <button type="button" className="cr-btn-manual" onClick={() => handleCloseTrade(trade._id, 'Manual')}>
                  Manual
                </button>
              </div>
            </article>
          ))}
        </div>
        )
      )}
    </CreatorShell>
  );
};

export default ActiveTrades;
