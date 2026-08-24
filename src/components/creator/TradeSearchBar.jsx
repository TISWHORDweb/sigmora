'use client';

import { Search, X } from 'lucide-react';

const TradeSearchBar = ({
  value,
  onChange,
  placeholder = 'Search by symbol, type, package…',
  filteredCount,
  totalCount,
}) => (
  <div className="cr-search-bar">
    <Search size={18} className="cr-search-bar__icon" aria-hidden />
    <input
      type="search"
      className="cr-search-bar__input"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search trades"
    />
    {value && (
      <button
        type="button"
        className="cr-search-bar__clear"
        onClick={() => onChange('')}
        aria-label="Clear search"
      >
        <X size={16} />
      </button>
    )}
    {totalCount > 0 && (
      <span className="cr-search-bar__count">
        {value ? `${filteredCount} of ${totalCount}` : `${totalCount} total`}
      </span>
    )}
  </div>
);

export default TradeSearchBar;
