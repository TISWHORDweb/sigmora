'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import AssetAvatar from './AssetAvatar';
import { TRADING_SYMBOLS, getAssetVisual } from '../../utils/assetLogo';

const KIND_LABEL = {
  forex: 'Forex',
  crypto: 'Crypto',
  metal: 'Metal',
  equity: 'Equity',
};

/**
 * Searchable symbol catalog picker (for Add Asset).
 * value is the symbol string (e.g. "EUR/USD").
 */
const SymbolPicker = ({
  value = '',
  onChange,
  exclude = [],
  placeholder = 'Select symbol',
  required = false,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef(null);
  const searchRef = useRef(null);

  const excluded = useMemo(
    () => new Set(exclude.map((s) => String(s).toUpperCase())),
    [exclude]
  );

  const options = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TRADING_SYMBOLS.filter((sym) => {
      if (excluded.has(sym.toUpperCase()) || excluded.has(sym.replace(/\//g, '').toUpperCase())) {
        return false;
      }
      if (!q) return true;
      return sym.toLowerCase().includes(q) || sym.replace(/\//g, '').toLowerCase().includes(q);
    });
  }, [query, excluded]);

  useEffect(() => {
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [open]);

  return (
    <div className={`cr-asset-select ${open ? 'open' : ''}`} ref={rootRef}>
      <button
        type="button"
        className="cr-asset-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {value ? (
          <span className="cr-asset-select-current">
            <AssetAvatar symbol={value} size={28} />
            <span className="cr-asset-select-symbol">{value}</span>
          </span>
        ) : (
          <span className="cr-asset-select-placeholder">{placeholder}</span>
        )}
        <ChevronDown size={16} className="cr-asset-select-caret" />
      </button>
      <input type="hidden" value={value || ''} required={required} readOnly />

      {open && (
        <div className="cr-asset-select-menu" role="listbox">
          <div className="cr-asset-select-search">
            <Search size={14} />
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search EUR/USD, BTC…"
              aria-label="Search symbols"
            />
          </div>
          <ul className="cr-asset-select-list">
            {options.length === 0 ? (
              <li className="cr-asset-select-empty">No symbols match</li>
            ) : (
              options.map((sym) => {
                const active = sym === value;
                return (
                  <li key={sym}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      className={`cr-asset-select-option ${active ? 'active' : ''}`}
                      onClick={() => {
                        onChange?.(sym);
                        setOpen(false);
                      }}
                    >
                      <AssetAvatar symbol={sym} size={28} />
                      <span className="cr-asset-select-option-text">
                        <strong>{sym}</strong>
                        <span>{KIND_LABEL[getAssetVisual(sym).kind] || 'Market'}</span>
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SymbolPicker;
