const OPTIONS = [
  { id: 'ALL', label: 'All' },
  { id: 'BUY', label: 'Buy' },
  { id: 'SELL', label: 'Sell' },
];

const TradeTypeFilter = ({ value, onChange, counts }) => (
  <div className="cr-type-filter" role="group" aria-label="Filter by trade type">
    {OPTIONS.map((opt) => (
      <button
        key={opt.id}
        type="button"
        className={`cr-type-filter__btn ${opt.id === 'BUY' ? 'buy' : ''} ${opt.id === 'SELL' ? 'sell' : ''} ${value === opt.id ? 'active' : ''}`}
        onClick={() => onChange(opt.id)}
      >
        {opt.label}
        {counts?.[opt.id] != null && <span className="cr-type-filter__count">{counts[opt.id]}</span>}
      </button>
    ))}
  </div>
);

export default TradeTypeFilter;
