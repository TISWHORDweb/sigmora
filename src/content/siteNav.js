export const NAV_MENUS = [
  {
    id: 'trade',
    label: 'Trade & Signals',
    columns: [
      {
        heading: 'Markets',
        links: [
          {
            path: '/markets/forex',
            label: 'Forex',
            desc: 'Major and cross pairs with live creator signals',
          },
          {
            path: '/markets/crypto',
            label: 'Crypto',
            desc: 'Bitcoin and digital assets from verified desks',
          },
          {
            path: '/markets/equities',
            label: 'Equities',
            desc: 'Names like NVDA with institutional-grade setups',
          },
          {
            path: '/markets/commodities',
            label: 'Commodities',
            desc: 'Gold and macro metals, benchmarked in real time',
          },
          {
            path: '/markets',
            label: 'All markets',
            desc: 'Forex, crypto, equities, and commodities in one view',
          },
        ],
      },
      {
        heading: 'Trading',
        links: [
          {
            path: '/fees',
            label: 'Fees',
            desc: 'Creator-set packages. Payments stay between you two',
          },
          {
            path: '/markets/hours',
            label: 'Market Hours & Events',
            desc: 'Sessions, calendars, and the moves that matter',
          },
          {
            path: '/signals',
            label: 'Trade Signals',
            desc: 'Real-time entries, stops, and targets from creators',
          },
        ],
      },
    ],
  },
  {
    id: 'why',
    label: 'Why Sigmora',
    columns: [
      {
        heading: 'Benefits',
        links: [
          {
            path: '/features',
            label: 'Platform Features',
            desc: 'Analytics, execution alerts, and bank-level security',
          },
          {
            path: '/club',
            label: 'Sigmora Club',
            desc: 'Verified creators with public win rates and returns',
          },
          {
            path: '/creators',
            label: 'Creator Earnings',
            desc: 'Launch an academy. Keep the relationship with your book',
          },
        ],
      },
    ],
  },
  {
    id: 'learn',
    label: 'Learn',
    columns: [
      {
        heading: 'Education',
        links: [
          {
            path: '/academy',
            label: 'Academy',
            desc: 'Structured paths built by working traders',
          },
          {
            path: '/getting-started',
            label: 'Getting Started',
            desc: 'Account, package, signals — in three steps',
          },
          {
            path: '/insights',
            label: 'Market Insights',
            desc: 'Live feed context behind every signal',
          },
          {
            path: '/calendar',
            label: 'Economic Calendar',
            desc: 'Central banks, data prints, and session risk',
          },
          {
            path: '/digest',
            label: 'Sigmora Digest',
            desc: 'A concise brief for traders who hate noise',
          },
          {
            path: '/faq',
            label: 'Help Center',
            desc: 'Accounts, packages, signals, and support',
          },
        ],
      },
    ],
  },
  {
    id: 'company',
    label: 'Company',
    columns: [
      {
        heading: 'Company',
        links: [
          { path: '/about', label: 'About Sigmora', desc: 'The platform behind institutional-grade signals' },
          { path: '/contact', label: 'Customer Support', desc: '24/7 help from trading and technical specialists' },
          { path: '/media', label: 'Media Center', desc: 'Brand, press, and platform milestones' },
          { path: '/careers', label: 'Careers', desc: 'Build tools serious traders actually use' },
        ],
      },
      {
        heading: 'Trust',
        links: [
          { path: '/partners', label: 'Creator Relations', desc: 'Partner with Sigmora to grow your academy' },
          { path: '/awards', label: 'Awards', desc: '18+ industry recognitions and counting' },
          { path: '/legal/risk', label: 'Risk Disclosures', desc: 'Signals are not a broker. Trade your own book' },
        ],
      },
    ],
  },
];

export const FOOTER_COLUMNS = [
  {
    heading: 'Markets',
    links: [
      { path: '/markets/forex', label: 'Forex' },
      { path: '/markets/crypto', label: 'Crypto' },
      { path: '/markets/equities', label: 'Equities' },
      { path: '/markets/commodities', label: 'Commodities' },
      { path: '/signals', label: 'Trade Signals' },
    ],
  },
  {
    heading: 'Platform',
    links: [
      { path: '/features', label: 'Features' },
      { path: '/club', label: 'Sigmora Club' },
      { path: '/creators', label: 'Creator Earnings' },
      { path: '/fees', label: 'Fee Schedule' },
      { path: '/academy', label: 'Academy' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { path: '/faq', label: 'Help Center' },
      { path: '/getting-started', label: 'Getting Started' },
      { path: '/register', label: 'Open an Account' },
      { path: '/legal/risk', label: 'Risk Disclosures' },
      { path: '/responsible-trading', label: 'Responsible Trading' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { path: '/about', label: 'About Sigmora' },
      { path: '/partners', label: 'Creator Relations' },
      { path: '/careers', label: 'Careers' },
      { path: '/awards', label: 'Awards' },
      { path: '/media', label: 'Media Center' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { path: '/legal/privacy', label: 'Privacy Policy' },
      { path: '/legal/terms', label: 'Terms & Conditions' },
      { path: '/legal/cookies', label: 'Cookie Policy' },
      { path: '/legal/disclaimer', label: 'Disclaimer' },
    ],
  },
];

export function pathMatches(linkPath, pathname) {
  return Boolean(linkPath && pathname && pathname === linkPath);
}

export function isMenuActive(menu, pathname) {
  return menu.columns.some((col) => col.links.some((link) => pathMatches(link.path, pathname)));
}
