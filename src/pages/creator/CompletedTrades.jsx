'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from '../../lib/router';
import { ArrowLeft } from 'lucide-react';
import CreatorShell from '../../components/creator/CreatorShell';
import TradeSearchBar from '../../components/creator/TradeSearchBar';
import TradeTypeFilter from '../../components/creator/TradeTypeFilter';
import AssetAvatar from '../../components/creator/AssetAvatar';
import { tradeService } from '../../services/tradeService';
import { filterTrades, getTradeTypeCounts } from '../../utils/filterTrades';
import toast from 'react-hot-toast';

const CompletedTrades = () => {
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
  }, []);

  const loadTrades = async () => {
    try {
      const data = await tradeService.getCompletedTrades();
      setTrades(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load trades');
    } finally {
      if (initialLoad.current) {
        initialLoad.current = false;
        setLoading(false);
      }
    }
  };

  return (
    <CreatorShell
      title="Completed Trades"
      subtitle="Closed positions and outcomes"
      activeNav="completed-trades"
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
            placeholder="Search symbol, type, close reason…"
            filteredCount={filteredTrades.length}
            totalCount={trades.length}
          />
        </div>
      )}

      {!loading && trades.length === 0 ? (
        <div className="cr-card cr-empty">
          <h3>No completed trades yet</h3>
          <p>Closed trades will appear here with TP, SL, or manual close details.</p>
        </div>
      ) : !loading && filteredTrades.length === 0 ? (
        <div className="cr-card cr-empty">
          <h3>No matches</h3>
          <p>No completed trades match &ldquo;{search}&rdquo;.</p>
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
                <span className="cr-trade-head__left">
                  <AssetAvatar symbol={trade.asset?.symbol} size={32} />
                  <span className="cr-trade-symbol">{trade.asset?.symbol || '—'}</span>
                </span>
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
                  <dt>Closed</dt>
                  <dd>{trade.closeReason || '—'}</dd>
                </div>
                <div>
                  <dt>Closed At</dt>
                  <dd>
                    {trade.closedAt ? new Date(trade.closedAt).toLocaleString() : '—'}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
        )
      )}
    </CreatorShell>
  );
};

export default CompletedTrades;
