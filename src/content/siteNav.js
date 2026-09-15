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
            desc: 'Major and cross pairs with live signals',
          },
          {
            path: '/markets/crypto',
            label: 'Crypto',
            desc: 'Bitcoin and digital assets with desk coverage',
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
            desc: 'Transparent packages for every trading style',
          },
          {
            path: '/markets/hours',
            label: 'Market Hours & Events',
            desc: 'Sessions, calendars, and the moves that matter',
          },
          {
            path: '/signals',
            label: 'Trade Signals',
            desc: 'Real-time entries, stops, and targets from Sigmora',
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
            desc: 'Member access with public win rates and returns',
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
      { path: '/fees', label: 'Fee Schedule' },
      { path: '/faq', label: 'Help Center' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { path: '/faq', label: 'Help Center' },
      { path: '/register', label: 'Open an Account' },
      { path: '/legal/risk', label: 'Risk Disclosures' },
      { path: '/responsible-trading', label: 'Responsible Trading' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { path: '/about', label: 'About Sigmora' },
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
