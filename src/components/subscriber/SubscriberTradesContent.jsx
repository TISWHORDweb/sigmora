import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import TradeSearchBar from '../creator/TradeSearchBar';
import TradeTypeFilter from '../creator/TradeTypeFilter';
import { filterTrades, getTradeTypeCounts } from '../../utils/filterTrades';

const SubscriberTradesContent = ({ trades, variant = 'active' }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');

  const typeCounts = useMemo(() => getTradeTypeCounts(trades), [trades]);
  const filteredTrades = useMemo(
    () => filterTrades(trades, search, typeFilter),
    [trades, search, typeFilter]
  );

  const isActive = variant === 'active';
  const emptyTitle = isActive ? 'No active trades' : 'No completed trades yet';
  const emptyMessage = isActive
    ? 'Subscribe to a package in My Academy to see live signals for that tier.'
    : 'Closed trades for your subscribed packages will appear here.';

  return (
    <>
      {trades.length > 0 && (
        <div className="cr-trades-filters">
          <TradeTypeFilter value={typeFilter} onChange={setTypeFilter} counts={typeCounts} />
          <TradeSearchBar
            value={search}
            onChange={setSearch}
            placeholder={
              isActive
                ? 'Search symbol, type, status…'
                : 'Search symbol, type, close reason…'
            }
            filteredCount={filteredTrades.length}
            totalCount={trades.length}
          />
        </div>
      )}

      {trades.length === 0 ? (
        <div className="cr-card cr-empty">
          <h3>{emptyTitle}</h3>
          <p>{emptyMessage}</p>
          <button
            type="button"
            className="cr-btn-ghost cr-btn-with-icon"
            style={{ marginTop: 16 }}
            onClick={() => navigate('/subscriber/dashboard')}
          >
            <ArrowLeft size={16} />
            Back to overview
          </button>
        </div>
      ) : filteredTrades.length === 0 ? (
        <div className="cr-card cr-empty">
          <h3>No matches</h3>
          <p>
            No {isActive ? 'active' : 'completed'} trades match &ldquo;{search}&rdquo;.
          </p>
          <button type="button" className="cr-dash-link" style={{ marginTop: 12 }} onClick={() => setSearch('')}>
            Clear search
          </button>
        </div>
      ) : (
        <div className="cr-trade-grid">
          {filteredTrades.map((trade) => (
            <article
              key={trade._id}
              className={`cr-card cr-trade-card ${trade.type === 'BUY' ? 'buy' : 'sell'}`}
            >
              <div className="cr-trade-head">
                <div className="cr-trade-head__left">
                  <span className="cr-trade-symbol">{trade.asset?.symbol || '—'}</span>
                  <span className={`cr-trade-badge ${trade.type === 'BUY' ? 'buy' : 'sell'}`}>{trade.type}</span>
                </div>
                {isActive && trade.status === 'active' && (
                  <span className="cr-status-pill cr-status-pill--active">Live</span>
                )}
              </div>
              <dl className="cr-trade-meta">
                {isActive ? (
                  <>
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
                  </>
                ) : (
                  <>
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
                      <dd>{trade.closedAt ? new Date(trade.closedAt).toLocaleString() : '—'}</dd>
                    </div>
                  </>
                )}
                <div>
                  <dt>Academy</dt>
                  <dd>{trade.creator?.creatorName || '—'}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
    </>
  );
};

export default SubscriberTradesContent;
