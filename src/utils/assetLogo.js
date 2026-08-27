/**
 * Asset logos for forex / crypto / metals / equities.
 *
 * Sources (open CDN, no API key) — prefer hosts that stay available in browsers:
 * - Flags: circle-flags (GitHub Pages) → flagcdn.com
 * - Crypto: spothq/cryptocurrency-icons → crypto-icons / coin-logos on jsDelivr
 */

const CRYPTO_COLOR =
  'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color';
const CRYPTO_SVG =
  'https://cdn.jsdelivr.net/gh/prasangapokharel/crypto-icons@v1.0.0/crypto';
const COIN_PNG =
  'https://cdn.jsdelivr.net/gh/simplr-sh/coin-logos/images';

/** ISO currency / common ticker → ISO 3166-1 alpha-2 (or eu) */
export const CURRENCY_FLAG = {
  USD: 'us',
  US: 'us',
  EUR: 'eu',
  EU: 'eu',
  GBP: 'gb',
  UK: 'gb',
  JPY: 'jp',
  JP: 'jp',
  CHF: 'ch',
  AUD: 'au',
  CAD: 'ca',
  NZD: 'nz',
  CNY: 'cn',
  CNH: 'cn',
  HKD: 'hk',
  SGD: 'sg',
  INR: 'in',
  NGN: 'ng',
  ZAR: 'za',
  SEK: 'se',
  NOK: 'no',
  DKK: 'dk',
  PLN: 'pl',
  MXN: 'mx',
  BRL: 'br',
  TRY: 'tr',
  KRW: 'kr',
  RUB: 'ru',
  AED: 'ae',
  SAR: 'sa',
  THB: 'th',
  IDR: 'id',
  PHP: 'ph',
  MYR: 'my',
  TWD: 'tw',
  HUF: 'hu',
  CZK: 'cz',
  ILS: 'il',
};

export const CRYPTO_META = {
  BTC: { id: 'bitcoin', svg: 'btc' },
  ETH: { id: 'ethereum', svg: 'eth' },
  SOL: { id: 'solana', svg: 'sol' },
  XRP: { id: 'ripple', svg: 'xrp' },
  BNB: { id: 'binancecoin', svg: 'bnb' },
  ADA: { id: 'cardano', svg: 'ada' },
  DOGE: { id: 'dogecoin', svg: 'doge' },
  DOT: { id: 'polkadot', svg: 'dot' },
  AVAX: { id: 'avalanche-2', svg: 'avax' },
  MATIC: { id: 'matic-network', svg: 'matic' },
  POL: { id: 'matic-network', svg: 'matic' },
  LINK: { id: 'chainlink', svg: 'link' },
  LTC: { id: 'litecoin', svg: 'ltc' },
  BCH: { id: 'bitcoin-cash', svg: 'bch' },
  ATOM: { id: 'cosmos', svg: 'atom' },
  UNI: { id: 'uniswap', svg: 'uni' },
  SHIB: { id: 'shiba-inu', svg: 'shib' },
  TRX: { id: 'tron', svg: 'trx' },
  TON: { id: 'the-open-network', svg: 'ton' },
  NEAR: { id: 'near', svg: 'near' },
  APT: { id: 'aptos', svg: 'apt' },
  ARB: { id: 'arbitrum', svg: 'arb' },
  OP: { id: 'optimism', svg: 'op' },
  SUI: { id: 'sui', svg: 'sui' },
  PEPE: { id: 'pepe', svg: 'pepe' },
  USDT: { id: 'tether', svg: 'usdt' },
  USDC: { id: 'usd-coin', svg: 'usdc' },
};

const METAL_META = {
  XAU: { label: 'Gold', color: '#e8b84b', emoji: 'Au' },
  XAG: { label: 'Silver', color: '#c0c7d4', emoji: 'Ag' },
  XPT: { label: 'Platinum', color: '#a8b2c8', emoji: 'Pt' },
  XPD: { label: 'Palladium', color: '#9ca3af', emoji: 'Pd' },
};

const ACCENT_COLORS = ['#a855f7', '#d946ef', '#34d399', '#f43f5e', '#e8b84b', '#60a5fa'];

/** Curated catalog for “Add asset” symbol picker */
export const TRADING_SYMBOLS = [
  // Major forex
  'EUR/USD',
  'GBP/USD',
  'USD/JPY',
  'USD/CHF',
  'AUD/USD',
  'USD/CAD',
  'NZD/USD',
  'EUR/GBP',
  'EUR/JPY',
  'GBP/JPY',
  'AUD/JPY',
  'EUR/AUD',
  'EUR/CHF',
  'GBP/CHF',
  'CAD/JPY',
  'CHF/JPY',
  'NZD/JPY',
  'AUD/NZD',
  'USD/NGN',
  'USD/ZAR',
  'USD/MXN',
  'USD/TRY',
  // Metals
  'XAU/USD',
  'XAG/USD',
  'XPT/USD',
  // Crypto
  'BTC/USD',
  'ETH/USD',
  'SOL/USD',
  'XRP/USD',
  'BNB/USD',
  'ADA/USD',
  'DOGE/USD',
  'DOT/USD',
  'AVAX/USD',
  'LINK/USD',
  'LTC/USD',
  'MATIC/USD',
  'UNI/USD',
  'ATOM/USD',
  // Equities (common)
  'AAPL',
  'MSFT',
  'NVDA',
  'TSLA',
  'AMZN',
  'GOOGL',
  'META',
];

export function normalizeSymbol(symbol = '') {
  return String(symbol)
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
}

export function parsePair(symbol = '') {
  const raw = String(symbol).trim().toUpperCase();
  const sep = raw.match(/[/_\-\s]/);
  if (sep) {
    const [a, b] = raw.split(/[/_\-\s]+/).filter(Boolean);
    if (a && b) return [a, b];
  }
  const compact = normalizeSymbol(raw);
  if (compact.length === 6 && CURRENCY_FLAG[compact.slice(0, 3)] && CURRENCY_FLAG[compact.slice(3)]) {
    return [compact.slice(0, 3), compact.slice(3)];
  }
  if (compact.length >= 6 && CRYPTO_META[compact.slice(0, compact.length - 3)] && compact.endsWith('USD')) {
    return [compact.slice(0, compact.length - 3), 'USD'];
  }
  return [compact, null];
}

export function flagUrl(countryCode) {
  if (!countryCode) return null;
  const code = String(countryCode).toLowerCase();
  // Round SVGs match circular avatars (eu supported)
  return `https://hatscripts.github.io/circle-flags/flags/${code}.svg`;
}

export function flagFallbackUrl(countryCode) {
  if (!countryCode) return null;
  const code = String(countryCode).toLowerCase();
  // Highly available PNG CDN (eu supported)
  return `https://flagcdn.com/w80/${code}.png`;
}

export function cryptoLogoUrls(ticker) {
  const meta = CRYPTO_META[normalizeSymbol(ticker)];
  const slug = (meta?.svg || normalizeSymbol(ticker)).toLowerCase();
  return {
    svg: `${CRYPTO_COLOR}/${slug}.png`,
    png: meta?.id
      ? `${COIN_PNG}/${meta.id}/small.png`
      : `${CRYPTO_SVG}/${slug}.svg`,
  };
}

function hashColor(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return ACCENT_COLORS[h % ACCENT_COLORS.length];
}

/**
 * @returns {{
 *   kind: string,
 *   label: string,
 *   base: string,
 *   quote: string|null,
 *   icons: Array<object>,
 *   color: string
 * }}
 */
export function getAssetVisual(symbol) {
  const label = String(symbol || '—').trim() || '—';
  const [baseRaw, quoteRaw] = parsePair(label);
  const base = baseRaw;
  const quote = quoteRaw;
  const color = hashColor(base || label);

  const flagIcon = (currency) => {
    const cc = CURRENCY_FLAG[currency];
    return {
      type: 'flag',
      src: flagUrl(cc),
      fallbackSrc: flagFallbackUrl(cc),
      code: currency,
      text: String(cc || currency).slice(0, 2).toUpperCase(),
      color,
    };
  };

  if (METAL_META[base] && (!quote || quote === 'USD' || CURRENCY_FLAG[quote])) {
    const metal = METAL_META[base];
    const icons = [{ type: 'metal', text: metal.emoji, color: metal.color, code: base }];
    if (quote && CURRENCY_FLAG[quote]) icons.push(flagIcon(quote));
    return { kind: 'metal', label, base, quote, icons, color: metal.color };
  }

  if (CRYPTO_META[base]) {
    const urls = cryptoLogoUrls(base);
    const icons = [
      { type: 'crypto', src: urls.svg, fallbackSrc: urls.png, code: base, text: base.slice(0, 2), color },
    ];
    if (quote && CURRENCY_FLAG[quote]) icons.push(flagIcon(quote));
    return { kind: 'crypto', label, base, quote, icons, color };
  }

  if (CURRENCY_FLAG[base] && quote && CURRENCY_FLAG[quote]) {
    return {
      kind: 'forex',
      label,
      base,
      quote,
      icons: [flagIcon(base), flagIcon(quote)],
      color,
    };
  }

  if (CURRENCY_FLAG[base] && !quote) {
    return {
      kind: 'forex',
      label,
      base,
      quote: null,
      icons: [flagIcon(base)],
      color,
    };
  }

  const text = (base || label).slice(0, 2);
  return {
    kind: quote ? 'unknown' : 'equity',
    label,
    base,
    quote,
    icons: [{ type: 'initial', text, color }],
    color,
  };
}

export function getAssetLogo(symbol) {
  const v = getAssetVisual(symbol);
  const primary = v.icons[0];
  return {
    src: primary?.src || null,
    fallbackSrc: primary?.fallbackSrc || null,
    initials: primary?.text || (v.base || '?').slice(0, 2),
    color: v.color,
    kind: v.kind,
    visual: v,
  };
}

/** Derive a signed result score from a closed trade (points / pips style). */
export function tradeResultScore(trade) {
  if (!trade || trade.status !== 'closed') return 0;
  if (trade.closeReason === 'TP') return Number(trade.takeProfit) || 0;
  if (trade.closeReason === 'SL') return -(Number(trade.stopLoss) || 0);
  return 0;
}
