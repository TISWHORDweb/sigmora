'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import AssetAvatar from './AssetAvatar';

/**
 * Custom asset dropdown with logos (replaces native <select> for catalog picks).
 */
const AssetSelect = ({
  assets = [],
  value = '',
  onChange,
  placeholder = 'Select asset',
  required = false,
  id,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef(null);
  const searchRef = useRef(null);

  const selected = assets.find((a) => a._id === value) || null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return assets;
    return assets.filter((a) => String(a.symbol || '').toLowerCase().includes(q));
  }, [assets, query]);

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

  const pick = (idValue) => {
    onChange?.(idValue);
    setOpen(false);
  };

  return (
    <div className={`cr-asset-select ${open ? 'open' : ''}`} ref={rootRef}>
      <button
        type="button"
        id={id}
        className="cr-asset-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {selected ? (
          <span className="cr-asset-select-current">
            <AssetAvatar symbol={selected.symbol} size={28} />
            <span className="cr-asset-select-symbol">{selected.symbol}</span>
          </span>
        ) : (
          <span className="cr-asset-select-placeholder">{placeholder}</span>
        )}
        <ChevronDown size={16} className="cr-asset-select-caret" />
      </button>

      {/* Keep a hidden input so HTML5 required still works when embedded in forms */}
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
              placeholder="Search symbols…"
              aria-label="Search assets"
            />
          </div>
          <ul className="cr-asset-select-list">
            {filtered.length === 0 ? (
              <li className="cr-asset-select-empty">No assets match</li>
            ) : (
              filtered.map((a) => {
                const active = a._id === value;
                return (
                  <li key={a._id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      className={`cr-asset-select-option ${active ? 'active' : ''}`}
                      onClick={() => pick(a._id)}
                    >
                      <AssetAvatar symbol={a.symbol} size={28} />
                      <span className="cr-asset-select-option-text">
                        <strong>{a.symbol}</strong>
                        <span>
                          PIP {a.pipValue} · Spread {a.spread}
                        </span>
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

export default AssetSelect;
