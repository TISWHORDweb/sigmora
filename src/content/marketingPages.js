const STATS = [
  { value: '12,000+', label: 'Traders' },
  { value: '96%', label: 'Success Rate' },
  { value: '18+', label: 'Industry Awards' },
  { value: '99.9%', label: 'Uptime' },
];

const TICKER = [
  { pair: 'EUR/USD', px: '1.0912', chg: '▲ 0.39%', up: true },
  { pair: 'GBP/USD', px: '1.2734', chg: '▼ 0.12%', up: false },
  { pair: 'USD/JPY', px: '149.82', chg: '▲ 0.21%', up: true },
  { pair: 'XAU/USD', px: '2,384.10', chg: '▲ 0.64%', up: true },
  { pair: 'BTC/USD', px: '67,240', chg: '▼ 1.08%', up: false },
  { pair: 'NVDA', px: '374.20', chg: '▲ 3.28%', up: true },
  { pair: 'USD/CHF', px: '0.8821', chg: '▼ 0.08%', up: false },
  { pair: 'AUD/USD', px: '0.6512', chg: '▲ 0.33%', up: true },
];

const TRADERS = [
  {
    name: 'A. Smith',
    desc: 'A results-driven portfolio manager with a decade of consistent performance.',
    ret: '78%',
    win: '73%',
    retLabel: 'NVDA Return',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=300&fit=crop&crop=faces&q=80&auto=format',
  },
  {
    name: 'L. Chen',
    desc: 'Expert quant strategist with a sharp focus on volatility and risk.',
    ret: '76%',
    win: '71%',
    retLabel: 'Book Return',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=faces&q=80&auto=format',
  },
  {
    name: 'L. Litm',
    desc: 'Experienced commodities trader focused on macro trends and cycles.',
    ret: '76%',
    win: '69%',
    retLabel: 'XAU Return',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop&crop=faces&q=80&auto=format',
  },
  {
    name: 'H. Wallace',
    desc: 'Long-term equity investor with a disciplined, research-first approach.',
    ret: '74%',
    win: '68%',
    retLabel: 'Equity Return',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop&crop=faces&q=80&auto=format',
  },
];

const IMG = {
  desk: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop',
  charts: 'https://images.unsplash.com/photo-1642790551116-18e150f248e5?w=800&h=500&fit=crop',
  city: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop',
  team: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=500&fit=crop&crop=faces',
  learn: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop',
  gold: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&h=500&fit=crop',
  crypto: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=500&fit=crop',
};

const TAPE_VISUAL = {
  type: 'tape',
  label: 'WATCHLIST',
  items: [
    { pair: 'EUR/USD', meta: 'Forex · 1D', px: '1.0912', chg: '▲ 0.39%', up: true },
    { pair: 'XAU/USD', meta: 'Gold', px: '2,384.10', chg: '+0.64%', up: true },
    { pair: 'BTC/USD', meta: 'Crypto', px: '67,240', chg: '-1.08%', up: false },
    { pair: 'NVDA', meta: 'Equities', px: '374.20', chg: '+3.28%', up: true },
  ],
};

const TRUST = '★★★★★  4.9/5 from 2,400+ verified traders on Sigmora';

export const MARKETING_PAGES = {
  markets: {
    badge: 'All Markets',
    badgeIcon: 'chart',
    title: 'Global markets.',
    titleAccent: 'One tape.',
    subtitle:
      'Forex, gold, bitcoin, and names like NVDA — tracked in real time and published by verified creators. You follow the setup. You still execute on your own broker.',
    ticker: TICKER,
    trust: TRUST,
    visual: TAPE_VISUAL,
    actions: [
      { to: '/register', label: 'Start Trading →', primary: true },
      { to: '/signals', label: 'How signals work' },
    ],
    sections: [
      {
        type: 'stats',
        items: STATS,
      },
      {
        type: 'cards',
        cols: 2,
        eyebrow: 'Asset classes',
        heading: 'Four books. One login.',
        subtitle: 'Creators publish across the same dashboard you already use for academy and packages.',
        items: [
          {
            icon: 'trending',
            title: 'Forex',
            desc: 'EUR/USD, GBP/USD, USD/JPY, USD/CHF, AUD/USD — pip-level entries from London through New York.',
            to: '/markets/forex',
          },
          {
            icon: 'coins',
            title: 'Crypto',
            desc: 'BTC/USD with volatility treated as a risk input, not a screenshot in a group chat.',
            to: '/markets/crypto',
          },
          {
            icon: 'chart',
            title: 'Equities',
            desc: 'NVDA, ADBE, ASBN — research-first names from portfolio and quant desks.',
            to: '/markets/equities',
          },
          {
            icon: 'diamond',
            title: 'Commodities',
            desc: 'XAU/USD gold and macro metals on the same risk framework as the FX book.',
            to: '/markets/commodities',
          },
        ],
      },
      {
        type: 'table',
        eyebrow: 'Live snapshot',
        heading: 'Markets Open · Live Pricing',
        columns: ['Market', 'Class', 'Last', 'Change'],
        rows: [
          { cells: ['EUR/USD', 'Forex', '1.0912', '▲ 0.39%'], trend: 'up' },
          { cells: ['GBP/USD', 'Forex', '1.2734', '▼ 0.12%'], trend: 'down' },
          { cells: ['USD/JPY', 'Forex', '149.82', '▲ 0.21%'], trend: 'up' },
          { cells: ['XAU/USD', 'Commodities', '2,384.10', '▲ 0.64%'], trend: 'up' },
          { cells: ['BTC/USD', 'Crypto', '67,240', '▼ 1.08%'], trend: 'down' },
          { cells: ['NVDA', 'Equities', '374.20', '▲ 3.28%'], trend: 'up' },
          { cells: ['ADBE', 'Equities', '312.20', '▲ 1.85%'], trend: 'up' },
          { cells: ['ASBN', 'Equities', '350.00', '▼ 1.32%'], trend: 'down' },
        ],
        footnote: 'Illustrative levels from the Sigmora tape. Not a quote and not a recommendation.',
      },
      {
        type: 'board',
        eyebrow: 'Context',
        heading: 'Heat, regions, and why the tape moved',
        heatmap: [
          { label: 'TECH', pct: '+4.1%', up: true, wide: true, tall: true },
          { label: 'NRG', pct: '+2.0%', up: true },
          { label: 'RE', pct: '−0.8%', up: false },
          { label: 'FIN', pct: '−3.4%', up: false, wide: true },
          { label: 'HLTH', pct: '+1.7%', up: true },
          { label: 'UTIL', pct: '+0.6%', up: true },
          { label: 'MAT', pct: '−0.3%', up: false },
        ],
        regions: [
          ['Americas', '42%'],
          ['Europe', '27%'],
          ['Asia-Pacific', '23%'],
          ['MENA', '8%'],
        ],
      },
      {
        type: 'split',
        reverse: true,
        eyebrow: 'How it maps to a trade',
        heading: 'A market page is not a broker ticket.',
        paragraphs: [
          'Sigmora shows you what verified desks are doing across FX, crypto, equities, and metals. When a creator publishes, you get entry, stop, and target — then you place the trade with your own broker.',
          'That is why the homepage talks about institutional-grade signals without the noise: the tape is here. The custody of your money is not.',
        ],
        image: IMG.desk,
        cta: { to: '/signals', label: 'See a signal card' },
      },
      {
        type: 'faq',
        eyebrow: 'Markets',
        heading: 'Quick answers',
        items: [
          {
            q: 'Can I trade these assets inside Sigmora?',
            a: 'No. Sigmora is a signal and academy platform. You execute on your own broker. Creators can add any assets they actually trade.',
          },
          {
            q: 'Are the prices on this page live executable quotes?',
            a: 'No. Levels such as EUR/USD 1.0912 or NVDA $374.20 are illustrative snapshots for education and design — the same tape you see on the homepage.',
          },
          {
            q: 'Which markets do most academies cover?',
            a: 'Forex is the core. Many desks also publish gold, bitcoin, and equity names. Your mix follows the creator you subscribe to.',
          },
        ],
      },
    ],
    related: [
      { to: '/markets/forex', label: 'Forex', desc: 'Majors and crosses with session context' },
      { to: '/markets/hours', label: 'Market hours', desc: 'Sydney to New York, plus event risk' },
      { to: '/signals', label: 'Trade signals', desc: 'What actually arrives in your dashboard' },
    ],
  },

  forex: {
    badge: 'Forex',
    badgeIcon: 'trending',
    title: 'Institutional-grade FX,',
    titleAccent: 'without the noise.',
    subtitle:
      'EUR/USD is the hero pair for a reason. Sigmora desks publish pip-level risk across majors — then you take the idea to your own broker.',
    ticker: TICKER.filter((t) => t.pair.includes('/')),
    trust: TRUST,
    visual: {
      type: 'tape',
      label: 'EUR/USD · 1D',
      items: [
        { pair: 'EUR/USD', meta: 'Forex · London', px: '1.0912', chg: '▲ 0.39%', up: true },
        { pair: 'GBP/USD', meta: 'Forex', px: '1.2734', chg: '▼ 0.12%', up: false },
        { pair: 'USD/JPY', meta: 'Tokyo → NY', px: '149.82', chg: '▲ 0.21%', up: true },
        { pair: 'AUD/USD', meta: 'Asia-Pacific', px: '0.6512', chg: '▲ 0.33%', up: true },
      ],
    },
    actions: [
      { to: '/register', label: 'Follow an FX desk →', primary: true },
      { to: '/markets/hours', label: 'Session hours' },
    ],
    sections: [
      {
        type: 'split',
        eyebrow: 'The FX desk',
        heading: 'Built for traders who take their EUR/USD edge seriously.',
        paragraphs: [
          'Forex is the core of Sigmora. Creators publish trades with pip-level precision, asset-level margin notes, and stops that are meant to be followed — not guessed.',
          'From London open to New York close, subscribers get instant notifications the moment a verified desk puts risk on.',
        ],
        checks: [
          'Asset-level pip and margin control',
          'Session-aware context next to every card',
          'Active and completed trade history',
        ],
        image: IMG.desk,
      },
      {
        type: 'table',
        eyebrow: 'Majors on the tape',
        heading: 'Pairs creators actually publish',
        columns: ['Pair', 'Session bias', 'Last', 'Change'],
        rows: [
          { cells: ['EUR/USD', 'London / NY overlap', '1.0912', '▲ 0.39%'], trend: 'up' },
          { cells: ['GBP/USD', 'London', '1.2734', '▼ 0.12%'], trend: 'down' },
          { cells: ['USD/JPY', 'Tokyo → NY', '149.82', '▲ 0.21%'], trend: 'up' },
          { cells: ['USD/CHF', 'Europe', '0.8821', '▼ 0.08%'], trend: 'down' },
          { cells: ['AUD/USD', 'Sydney / Asia', '0.6512', '▲ 0.33%'], trend: 'up' },
        ],
        footnote: 'Illustrative. Your academy may add any pair the creator trades.',
      },
      {
        type: 'sessions',
        eyebrow: 'Clock',
        heading: 'When FX actually moves',
        items: [
          { city: 'Sydney', hours: '22:00–07:00 GMT', desc: 'AUD crosses and the first read on risk.', open: false },
          { city: 'Tokyo', hours: '00:00–09:00 GMT', desc: 'USD/JPY and the handover into London.', open: false },
          { city: 'London', hours: '08:00–16:00 GMT', desc: 'The heart of academy volume on Sigmora.', open: true },
          { city: 'New York', hours: '13:00–22:00 GMT', desc: 'Overlap, US data, then gold into the close.', open: true },
        ],
      },
      {
        type: 'cards',
        heading: 'Why FX lives here, not in a chat',
        items: [
          {
            icon: 'zap',
            title: 'Lightning alerts',
            desc: 'Sub-second notifications when a creator enters, adjusts, or closes. London does not wait for a buried message.',
          },
          {
            icon: 'target',
            title: 'Pip & margin control',
            desc: 'You see stop, target, and size logic before you copy the idea onto your own account.',
          },
          {
            icon: 'activity',
            title: 'Calendar in the same product',
            desc: 'An ECB hold should not be a surprise in the middle of your EUR/USD. Pair this page with Hours and the Economic Calendar.',
          },
        ],
      },
      {
        type: 'faq',
        heading: 'FX on Sigmora',
        items: [
          {
            q: 'Do you provide leverage or a dealing desk?',
            a: 'No. We publish signals. Leverage, spreads, and fills are between you and your broker.',
          },
          {
            q: 'What if my broker’s EUR/USD print differs?',
            a: 'It will. Use the creator’s invalidation, not a screenshot of their P&L. Slippage and spread are yours to manage.',
          },
        ],
      },
    ],
    related: [
      { to: '/markets/hours', label: 'Market hours', desc: 'Full session map' },
      { to: '/calendar', label: 'Economic calendar', desc: 'ECB, NFP, Fed speak' },
      { to: '/markets/commodities', label: 'Gold', desc: 'XAU next to the dollar book' },
    ],
  },

  crypto: {
    badge: 'Crypto',
    badgeIcon: 'coins',
    title: 'Digital assets,',
    titleAccent: 'with a desk behind them.',
    subtitle:
      'BTC/USD sits on the same tape as EUR/USD and gold. Volatility is a risk input — not a meme — and every idea still has a stop.',
    ticker: TICKER,
    trust: TRUST,
    visual: {
      type: 'tape',
      label: 'CRYPTO',
      items: [
        { pair: 'BTC/USD', meta: 'Digital assets', px: '67,240', chg: '▼ 1.08%', up: false },
        { pair: 'Vol index', meta: 'Illustrative', px: '+12%', chg: 'Spike', up: false },
      ],
    },
    actions: [
      { to: '/register', label: 'Follow a crypto desk →', primary: true },
      { to: '/club', label: 'Verified creators' },
    ],
    sections: [
      {
        type: 'split',
        eyebrow: 'Crypto',
        heading: 'When bitcoin vol jumps 12%, you should already have the plan.',
        paragraphs: [
          'Crypto on Sigmora is treated like any other professional book: entries, invalidation, and a creator who publishes in the open.',
          'Desks that run digital-asset strategies share setups the moment they hit — with the same academy structure, package access, and performance stats as FX.',
        ],
        image: IMG.crypto,
      },
      {
        type: 'table',
        heading: 'On the Sigmora tape',
        columns: ['Market', 'Last', 'Change', 'Note'],
        rows: [{ cells: ['BTC/USD', '67,240', '▼ 1.08%', 'Vol index up 12% in the live feed'], trend: 'down', trendCol: 2 }],
      },
      {
        type: 'cards',
        heading: 'How subscribers use crypto here',
        items: [
          {
            icon: 'shield',
            title: 'Risk first',
            desc: 'Stops and invalidation publish with the idea. Crypto is fast; the plan is not optional.',
          },
          {
            icon: 'activity',
            title: 'Live feed context',
            desc: 'When vol spikes, Insight tells you why — not just that price moved.',
          },
          {
            icon: 'users',
            title: 'Verified desks only',
            desc: 'Follow creators with public win rates. 4.9/5 from 2,400+ traders is the bar.',
          },
        ],
      },
      {
        type: 'notice',
        heading: 'Crypto is not insured by anyone on this page',
        text: 'Sigmora is not a crypto exchange. Digital-asset signals can lose money quickly. Holdings at your broker or wallet are not FDIC-style protected by us. Read Risk Disclosures before you size in.',
      },
      {
        type: 'faq',
        heading: 'Crypto questions',
        items: [
          {
            q: 'Can creators add coins besides bitcoin?',
            a: 'Yes. Creators add any assets they trade. BTC/USD is the name on the public tape because that is what the homepage already shows.',
          },
          {
            q: 'Do you auto-copy into an exchange?',
            a: 'No. Manual execution — same as FX and equities.',
          },
        ],
      },
    ],
    related: [
      { to: '/insights', label: 'Market insights', desc: 'Vol and the story behind the print' },
      { to: '/legal/risk', label: 'Risk disclosures', desc: 'Read before you size crypto' },
      { to: '/signals', label: 'Signal anatomy', desc: 'Entry, stop, target' },
    ],
  },

  equities: {
    badge: 'Equities',
    badgeIcon: 'chart',
    title: 'Names worth watching.',
    titleAccent: 'Setups, not noise.',
    subtitle:
      'NVDA above 30-day resistance is a headline. The trade is the card behind it — thesis, invalidation, and a verified desk.',
    ticker: TICKER,
    trust: TRUST,
    visual: {
      type: 'signal',
      items: [
        { name: 'NVDA', meta: 'Semiconductors · 1D', side: 'buy', conv: '92%' },
        { name: 'ASBN', meta: 'Financials', side: 'sell', conv: '74%' },
      ],
    },
    actions: [
      { to: '/register', label: 'Follow equity desks →', primary: true },
      { to: '/club', label: 'Top performers' },
    ],
    sections: [
      {
        type: 'table',
        eyebrow: 'On the board',
        heading: 'Equity snapshot',
        columns: ['Name', 'Sector', 'Last', 'Change'],
        rows: [
          { cells: ['NVDA', 'Semiconductors', '$374.20', '+3.28%'], trend: 'up' },
          { cells: ['ADBE', 'Software', '$312.20', '+1.85%'], trend: 'up' },
          { cells: ['ASBN', 'Financials', '$350.00', '−1.32%'], trend: 'down' },
        ],
      },
      {
        type: 'board',
        heading: 'Sector heat, not guesswork',
        heatmap: [
          { label: 'TECH', pct: '+4.1%', up: true, wide: true, tall: true },
          { label: 'NRG', pct: '+2.0%', up: true },
          { label: 'RE', pct: '−0.8%', up: false },
          { label: 'FIN', pct: '−3.4%', up: false, wide: true },
          { label: 'HLTH', pct: '+1.7%', up: true },
          { label: 'UTIL', pct: '+0.6%', up: true },
          { label: 'MAT', pct: '−0.3%', up: false },
        ],
        regions: [
          ['Americas', '42%'],
          ['Europe', '27%'],
          ['Asia-Pacific', '23%'],
          ['MENA', '8%'],
        ],
      },
      {
        type: 'traders',
        eyebrow: 'Who publishes equities',
        heading: 'Research-first desks',
        items: [TRADERS[0], TRADERS[3]],
      },
      {
        type: 'split',
        reverse: true,
        heading: 'Equities 62% in the illustrative mix — your book will differ.',
        paragraphs: [
          'The homepage ring (equities 62%, commodities 24%, FX 14%) is a picture of how a serious multi-asset feed can look. Your real mix follows the academies you pay for.',
          'When NVDA breaks resistance or ASBN is cut to Hold, Insight and the live feed sit next to the signal so you are not trading a ticker in a vacuum.',
        ],
        image: IMG.city,
      },
    ],
    related: [
      { to: '/club', label: 'Sigmora Club', desc: 'Smith, Wallace, and verified win rates' },
      { to: '/insights', label: 'Insights', desc: 'Why the name moved' },
      { to: '/markets', label: 'All markets', desc: 'FX and metals on the same login' },
    ],
  },

  commodities: {
    badge: 'Commodities',
    badgeIcon: 'diamond',
    title: 'Gold on the same tape',
    titleAccent: 'as the dollar.',
    subtitle:
      'XAU/USD at 2,384 is a level. The trade is the plan around it — from desks that already think in dollars, rates, and risk-on/off.',
    ticker: TICKER,
    trust: TRUST,
    visual: {
      type: 'tape',
      label: 'METALS',
      items: [
        { pair: 'XAU/USD', meta: 'Gold', px: '2,384.10', chg: '▲ 0.64%', up: true },
        { pair: 'EUR/USD', meta: 'Dollar context', px: '1.0912', chg: '▲ 0.39%', up: true },
      ],
    },
    actions: [
      { to: '/register', label: 'Follow a metals desk →', primary: true },
      { to: '/markets/forex', label: 'FX context' },
    ],
    sections: [
      {
        type: 'split',
        eyebrow: 'Commodities',
        heading: 'Macro metals, not a standalone gold chat.',
        paragraphs: [
          'Commodities on Sigmora start with gold. XAU/USD prints on the hero tape, the watchlist, and creator books that specialize in cycles.',
          'A gold long is never isolated from dollar strength, session risk, or the rest of your academy feed.',
        ],
        image: IMG.gold,
      },
      {
        type: 'traders',
        heading: 'Who watches the metal',
        items: [TRADERS[2]],
      },
      {
        type: 'cards',
        heading: 'Why metals sit next to FX',
        items: [
          {
            icon: 'target',
            title: 'Macro-aware creators',
            desc: 'Desks that already think in dollars and session overlap — L. Litm’s book is built for this.',
          },
          {
            icon: 'chart',
            title: 'Same analytics stack',
            desc: 'Real-time P&L, win rate, and risk metrics — identical to every other asset.',
          },
          {
            icon: 'shield',
            title: 'Defined invalidation',
            desc: 'Gold can run. Your stop should still be written down on the card.',
          },
        ],
      },
    ],
    related: [
      { to: '/markets/forex', label: 'Forex', desc: 'Dollar pairs that move gold' },
      { to: '/calendar', label: 'Calendar', desc: 'US prints and the metal' },
      { to: '/club', label: 'Club', desc: 'Commodities desks with public stats' },
    ],
  },

  hours: {
    badge: 'Hours & Events',
    badgeIcon: 'activity',
    title: 'Know when the tape',
    titleAccent: 'is actually open.',
    subtitle:
      'Signals without a clock are just noise. Here is the session map your creators already trade — plus the events that rewrite EUR/USD and gold.',
    ticker: TICKER,
    visual: {
      type: 'stats',
      label: 'Overlap',
      items: [
        { value: 'London', label: 'FX heart' },
        { value: 'NY', label: 'Data + gold' },
        { value: 'Tokyo', label: 'USD/JPY' },
        { value: 'Sydney', label: 'AUD open' },
      ],
    },
    actions: [
      { to: '/calendar', label: 'Open the calendar →', primary: true },
      { to: '/markets/forex', label: 'FX pairs' },
    ],
    sections: [
      {
        type: 'sessions',
        eyebrow: 'Sessions',
        heading: 'The clock your creators already use',
        items: [
          {
            city: 'Sydney',
            hours: '22:00–07:00 GMT',
            desc: 'Asia-Pacific open. Quiet FX, AUD/USD, first read on overnight risk.',
            open: false,
          },
          {
            city: 'Tokyo',
            hours: '00:00–09:00 GMT',
            desc: 'USD/JPY and JPY crosses. Liquidity builds into the London handover.',
            open: false,
          },
          {
            city: 'London',
            hours: '08:00–16:00 GMT',
            desc: 'EUR, GBP, and the bulk of academy volume. Most Sigmora FX cards print here.',
            open: true,
          },
          {
            city: 'New York',
            hours: '13:00–22:00 GMT',
            desc: 'Overlap with London, then US prints, equities, and gold into the cash close.',
            open: true,
          },
        ],
      },
      {
        type: 'table',
        eyebrow: 'Events',
        heading: 'What actually hits the book',
        columns: ['Event', 'Primary tape', 'Why it matters'],
        rows: [
          { cells: ['ECB rate decision', 'EUR/USD', 'A hold or cut rewrites the London book in minutes.'] },
          { cells: ['US data / NFP week', 'USD, XAU/USD', 'Dollar and risk assets reprice together.'] },
          { cells: ['FOMC / Fed speak', 'USD/JPY, gold', 'Stops get respected — or they do not. Creators say which.'] },
          { cells: ['Crypto vol spikes', 'BTC/USD', 'When the vol index jumps 12%, the feed should already be live.'] },
          { cells: ['Mega-cap tape', 'NVDA, ADBE', 'Equity desks wait for structure, not the headline.'] },
        ],
      },
      {
        type: 'split',
        reverse: true,
        heading: 'Calendar first. Signal second.',
        paragraphs: [
          'Serious desks do not publish EUR/USD five minutes before an ECB hold and call it edge. Hours and the Economic Calendar exist so subscribers see the same risk window the creator sees.',
          'Use this page for session opens. Use the calendar for the week. Let notifications handle the second the trade is live.',
        ],
        image: IMG.desk,
        cta: { to: '/calendar', label: 'Economic calendar' },
      },
    ],
    related: [
      { to: '/calendar', label: 'Economic calendar', desc: 'The week ahead' },
      { to: '/insights', label: 'Insights', desc: 'What the tape just said' },
      { to: '/markets/forex', label: 'Forex', desc: 'Pairs mapped to these sessions' },
    ],
  },

  fees: {
    badge: 'Fee Schedule',
    badgeIcon: 'package',
    title: 'No hidden platform take.',
    titleAccent: 'Just creator packages.',
    subtitle:
      'You pay the academy you follow. Payments stay between you and your creator — Flutterwave checkout, 30-day access, no auto-renew trap.',
    visual: {
      type: 'stats',
      label: 'Pricing',
      items: STATS,
    },
    trust: 'Payments stay between you and your subscribers.',
    actions: [
      { to: '/register', label: 'Choose a package →', primary: true },
      { to: '/faq', label: 'Billing FAQ' },
    ],
    sections: [
      {
        type: 'highlights',
        eyebrow: 'Simple on purpose',
        heading: 'Three numbers that matter',
        items: [
          {
            value: '$0',
            title: 'No extra platform commission',
            desc: 'You pay the creator’s package price. Sigmora does not layer a second spread on top.',
          },
          {
            value: '30d',
            title: 'Access, not a subscription trap',
            desc: 'Packages run 30 days from purchase. You choose whether to renew when they expire.',
          },
          {
            value: 'You',
            title: 'You pick the desk',
            desc: 'Browse packages — or join with an invite code like TRD782.',
          },
        ],
      },
      {
        type: 'compare',
        eyebrow: 'Clarity',
        heading: 'What you pay vs what you do not',
        left: {
          heading: 'You pay',
          items: [
            'The creator’s listed package price',
            'Flutterwave checkout (cards, bank, mobile money)',
            'Whatever your own broker charges to execute',
          ],
        },
        right: {
          heading: 'You do not pay Sigmora for',
          items: [
            'A hidden “platform spread” on signals',
            'Automatic renewal after 30 days',
            'Custody of trading capital — we never hold your book',
          ],
        },
      },
      {
        type: 'steps',
        eyebrow: 'Checkout',
        heading: 'How money moves',
        items: [
          {
            title: 'Pick a package',
            desc: 'Creators publish name, description, price, and features. Read refund terms before you pay.',
          },
          {
            title: 'Pay via Flutterwave',
            desc: 'Encrypted checkout. Sigmora does not store raw card details on our servers.',
          },
          {
            title: 'Unlock the desk',
            desc: 'Live trades for 30 days. When it expires, history stays; new signals pause until you renew.',
          },
        ],
      },
      {
        type: 'faq',
        heading: 'Billing',
        items: [
          {
            q: 'Can I cancel mid-cycle?',
            a: 'Access runs for 30 days from purchase with no automatic renewal. Refunds follow each creator’s policy — review terms before you subscribe.',
          },
          {
            q: 'Do creators get paid by Sigmora or by me?',
            a: 'By you. Homepage copy is deliberate: payments stay between you and your subscribers. We run the rails.',
          },
        ],
      },
    ],
    related: [
      { to: '/getting-started', label: 'Getting started', desc: 'Account → package → signals' },
      { to: '/creators', label: 'Creator earnings', desc: 'If you sell the desk' },
      { to: '/faq', label: 'Help center', desc: 'Subscriptions in full' },
    ],
  },

  signals: {
    badge: 'Trade Signals',
    badgeIcon: 'zap',
    title: 'The whole card.',
    titleAccent: 'Not a caption.',
    subtitle:
      'Real-time setups from verified traders: pair, direction, conviction, invalidation, and the desk that stands behind it. Delivered the moment they matter.',
    ticker: TICKER,
    visual: {
      type: 'signal',
      items: [
        { name: 'NVDA', meta: 'Expert signal · live', side: 'buy', conv: '92%' },
        { name: 'ASBN', meta: 'Financials', side: 'sell', conv: '74%' },
      ],
    },
    trust: TRUST,
    actions: [
      { to: '/register', label: 'Get live signals →', primary: true },
      { to: '/club', label: 'Who publishes them' },
    ],
    sections: [
      {
        type: 'split',
        eyebrow: 'Anatomy',
        heading: 'BUY 92% is a number. The trade is everything around it.',
        paragraphs: [
          'A Sigmora signal includes the pair or name, direction, conviction, invalidation, and the creator. When the desk goes live, subscribers get an instant notification on web and mobile.',
          'We do not auto-copy into a broker. You stay in control of size, timing, and whether you take the idea at all.',
        ],
        checks: [
          'Entry, stop, take-profit on the card',
          'Live status: active vs completed',
          'Public win rate on the creator',
        ],
        image: IMG.charts,
      },
      {
        type: 'steps',
        heading: 'Life of a signal',
        items: [
          {
            title: 'Creator publishes',
            desc: 'Asset, side, levels, and notes go out with pip/margin context where the desk uses it.',
          },
          {
            title: 'You get alerted',
            desc: 'Dashboard and notifications fire. Lightning-fast delivery is the product, not a slogan.',
          },
          {
            title: 'You execute — or you do not',
            desc: 'Place the trade on your broker. Track how following that desk actually performed after the close.',
          },
        ],
      },
      {
        type: 'cards',
        cols: 2,
        heading: 'Inside every card',
        items: [
          { icon: 'target', title: 'Levels', desc: 'Entry, stop, target — not “buy the dip” in a caption.' },
          { icon: 'activity', title: 'Status', desc: 'Active now, then completed history so you can learn.' },
          { icon: 'users', title: 'Attribution', desc: 'Tied to a verified desk with a public win rate.' },
          { icon: 'chart', title: 'After-action', desc: 'Analytics on how following that creator actually went.' },
        ],
      },
      {
        type: 'notice',
        heading: 'Signals are not a broker ticket',
        text: 'Past win rates — including the 96% figure on our homepage — are not a promise of your next fill. Read Risk Disclosures. Size from the stop.',
      },
    ],
    related: [
      { to: '/club', label: 'Sigmora Club', desc: 'The desks behind the cards' },
      { to: '/legal/risk', label: 'Risk', desc: 'What a signal is not' },
      { to: '/getting-started', label: 'Getting started', desc: 'From signup to first alert' },
    ],
  },

  club: {
    badge: 'Sigmora Club',
    badgeIcon: 'diamond',
    title: 'Investors worth watching.',
    titleAccent: 'Trade like the pros.',
    subtitle:
      'Verified creators with public returns and win rates. Club is the filter — not a points program. Join a desk, not a celebrity feed.',
    visual: {
      type: 'quote',
      text: '4.9/5 from 2,400+ verified traders. The review that matters more than a trophy shot.',
      author: 'Sigmora Club standard',
    },
    trust: TRUST,
    actions: [
      { to: '/register', label: 'Follow a desk →', primary: true },
      { to: '/register?role=creator', label: 'Apply as a creator' },
    ],
    sections: [
      {
        type: 'traders',
        eyebrow: 'Top performers',
        heading: 'Desks members actually follow',
        subtitle: 'The same four names from the homepage — returns and win rates in the open.',
        items: TRADERS,
      },
      {
        type: 'stats',
        items: [
          { value: '4.9/5', label: 'From 2,400+ traders' },
          { value: '12,000+', label: 'On the platform' },
          { value: '96%', label: 'Marked success rate' },
          { value: '✓', label: 'Verified badges' },
        ],
      },
      {
        type: 'split',
        reverse: true,
        heading: 'Transparency is the membership.',
        paragraphs: [
          'Sigmora Club is the verified layer: creators who publish real trades, show their numbers, and run academies with invite codes.',
          'If you lead a desk, Club is the standard you are measured against — uptime, a book people can audit, and 99.9% platform reliability behind you.',
        ],
        image: IMG.team,
        checks: ['Public win rate and returns', 'Academy invite codes', 'Live trade publishing'],
      },
    ],
    related: [
      { to: '/creators', label: 'Creator earnings', desc: 'Launch the academy they follow' },
      { to: '/signals', label: 'Signals', desc: 'What Club desks actually send' },
      { to: '/awards', label: 'Awards', desc: 'Why the product keeps getting mentioned' },
    ],
  },

  creators: {
    badge: 'For Creators',
    badgeIcon: 'users',
    title: 'Are you a creator?',
    titleAccent: 'Control your destiny.',
    subtitle:
      'Set up your academy in minutes. Publish trades, define packages, share your invite code. Payments stay between you and your subscribers.',
    visual: {
      type: 'image',
      src: IMG.team,
      alt: 'Sigmora verified creator',
    },
    actions: [
      { to: '/register?role=creator', label: 'Launch your academy →', primary: true },
      { to: '/partners', label: 'Creator Relations' },
    ],
    sections: [
      {
        type: 'split',
        eyebrow: 'Creator earnings',
        heading: 'Your book. Your packages. Your relationship.',
        paragraphs: [
          'Sigmora is the operating system for trading educators. Issue a private invite code, publish live trades, and keep the relationship with your room.',
          'We supply dashboards, notifications, analytics, and 99.9% uptime so the desk never goes dark mid-session.',
        ],
        checks: [
          'Private academy invite codes',
          'Subscriber & package management',
          'Real-time trade publishing',
          'Asset-level pip & margin control',
        ],
        image: IMG.learn,
        cta: { to: '/register?role=creator', label: 'Register as a creator' },
      },
      {
        type: 'cards',
        cols: 2,
        heading: 'What you get on day one',
        items: [
          { icon: 'package', title: 'Invite codes', desc: 'Share TRD782-style codes. Only the people you want see packages.' },
          { icon: 'users', title: 'Subscriber stats', desc: 'Who is active, what they bought, when access rolls off.' },
          { icon: 'zap', title: 'Live publishing', desc: 'Push entries to every paying subscriber the second you hit send.' },
          { icon: 'chart', title: 'Analytics', desc: 'Win rate, completed trades, profit views — no spreadsheet army.' },
        ],
      },
      {
        type: 'steps',
        eyebrow: 'Simple process',
        heading: 'Signup to first signal',
        items: [
          { title: 'Register as a creator', desc: 'No approval queue. Open the dashboard and configure the desk.' },
          { title: 'Publish a package', desc: 'Name, price, features. Your academy code is waiting.' },
          { title: 'Go live', desc: 'Add assets, post trades, watch the book fill in.' },
        ],
      },
      {
        type: 'faq',
        heading: 'Creators',
        items: [
          {
            q: 'Do I wait for approval?',
            a: 'No. Sign up as a Creator, then create packages, add assets, and share trades.',
          },
          {
            q: 'Who sets the price?',
            a: 'You do. Payments stay between you and subscribers. See the fee schedule for how checkout works.',
          },
        ],
      },
    ],
    cta: {
      heading: 'Launch your academy',
      headingAccent: 'this week.',
      text: 'Professional-grade tools for people who already have a book worth following.',
      primary: { to: '/register?role=creator', label: 'Register as a creator →' },
      secondary: { to: '/partners', label: 'Creator Relations' },
    },
    related: [
      { to: '/partners', label: 'Creator Relations', desc: 'Established desks and migrations' },
      { to: '/fees', label: 'Fees', desc: 'How your subscribers pay' },
      { to: '/academy', label: 'Academy product', desc: 'Curriculum next to the tape' },
    ],
  },

  academy: {
    badge: 'Academy',
    badgeIcon: 'target',
    title: 'Learn from people',
    titleAccent: 'who still trade.',
    subtitle:
      'Structured paths — risk, chart patterns, options basics, macro — inside the same academy as the live signals. Not a pile of PDFs from theorists.',
    visual: {
      type: 'stats',
      label: 'Courses',
      items: [
        { value: '80%', label: 'Risk Management' },
        { value: '45%', label: 'Chart Patterns' },
        { value: '60%', label: 'Options Basics' },
        { value: '25%', label: 'Macro 101' },
      ],
    },
    actions: [
      { to: '/register?role=subscriber', label: 'Join with a code →', primary: true },
      { to: '/register?role=creator', label: 'Build an academy' },
    ],
    sections: [
      {
        type: 'split',
        eyebrow: 'Education',
        heading: 'Courses that sit next to the tape.',
        paragraphs: [
          'When you join with a creator’s invite code, you get their live trades and their curriculum: how they actually think about risk, patterns, and the week’s macro.',
          'Progress is visible so learning is a path. Finish Risk Management before you size up. That is the point of the 80% bar on the homepage.',
        ],
        image: IMG.learn,
      },
      {
        type: 'cards',
        cols: 2,
        heading: 'What academies teach',
        items: [
          {
            icon: 'shield',
            title: 'Risk Management',
            desc: 'Position sizing and invalidation — why a 96% headline still needs a stop.',
            details: ['Typical progress shown at 80%', 'Pairs with every live signal'],
          },
          {
            icon: 'chart',
            title: 'Chart Patterns',
            desc: 'The structures creators wait for before they publish.',
            details: ['Shown at 45% on the homepage module'],
          },
          {
            icon: 'activity',
            title: 'Options Basics',
            desc: 'Enough structure to understand a hedge — without turning class into trivia.',
          },
          {
            icon: 'trending',
            title: 'Macro 101',
            desc: 'How ECB holds and session overlap show up in the next EUR/USD card.',
          },
        ],
      },
      {
        type: 'highlights',
        heading: 'Join with a code, not a waitlist',
        items: [
          { value: 'TRD782', title: 'Academy codes', desc: 'Six characters on the homepage or at signup.' },
          { value: '3', title: 'Steps', desc: 'Account, package, live trades.' },
          { value: '24/7', title: 'Support', desc: 'Trading professionals and technical specialists.' },
        ],
      },
      {
        type: 'steps',
        heading: 'From code to classroom',
        items: [
          { title: 'Enter the code', desc: 'Homepage academy field or register as subscriber with ?code=' },
          { title: 'Unlock the package', desc: 'Pay the creator. Curriculum and signals unlock together.' },
          { title: 'Learn on the same desk', desc: 'Lessons, then the live card, then completed-trade review.' },
        ],
      },
    ],
    related: [
      { to: '/getting-started', label: 'Getting started', desc: 'The three-step path' },
      { to: '/creators', label: 'For creators', desc: 'Turn a playbook into an academy' },
      { to: '/digest', label: 'Digest', desc: 'Weekly brief next to class' },
    ],
  },

  'getting-started': {
    badge: 'Getting Started',
    badgeIcon: 'check',
    title: 'How Sigmora works.',
    titleAccent: 'Three steps.',
    subtitle:
      'The same journey 12,000+ traders already take. An account takes minutes. You could be following a live desk before the next London open.',
    visual: {
      type: 'stats',
      label: 'Onboarding',
      items: [
        { value: '01', label: 'Create account' },
        { value: '02', label: 'Choose package' },
        { value: '03', label: 'Start trading' },
        { value: '<2m', label: 'Typical signup' },
      ],
    },
    actions: [
      { to: '/register', label: 'Create account →', primary: true },
      { to: '/login', label: 'Log in' },
    ],
    sections: [
      {
        type: 'steps',
        eyebrow: 'Simple process',
        heading: 'From zero to a live desk',
        items: [
          {
            title: 'Create your account',
            desc: 'Creator or subscriber. Creators share strategies. Subscribers follow experts and join academies. No trading experience required to follow.',
          },
          {
            title: 'Choose your package',
            desc: 'Browse packages or enter an academy code. Pick the desk that matches your goals and budget.',
          },
          {
            title: 'Start trading',
            desc: 'Instant notifications, active and completed trades, analytics. You execute on your own broker.',
          },
        ],
      },
      {
        type: 'cards',
        heading: 'Two doors. Same platform.',
        items: [
          {
            icon: 'users',
            title: 'I want to follow',
            desc: 'Subscriber account, code or public package, notifications on.',
            details: ['Academy invite or open packages', 'Active + completed views', 'Manual execution'],
            to: '/register?role=subscriber',
          },
          {
            icon: 'zap',
            title: 'I want to lead',
            desc: 'Creator account, package, code, go live.',
            details: ['Packages and assets', 'Real-time publishing', 'Payments stay with you'],
            to: '/register?role=creator',
          },
          {
            icon: 'shield',
            title: 'I already have an account',
            desc: 'Log in and pick up the tape. Forgot password? One email from the login screen.',
            details: ['Role-based dashboard', '24/7 support', 'Secure sessions'],
            to: '/login',
          },
        ],
      },
      {
        type: 'faq',
        heading: 'Before you click through',
        items: [
          {
            q: 'Do I need trading experience?',
            a: 'No. Subscribers learn from experts. Experienced traders can become creators and share knowledge.',
          },
          {
            q: 'Can I copy trades automatically?',
            a: 'No. Sigmora provides signals and notifications. You execute manually for full control.',
          },
          {
            q: 'What happens when a package expires?',
            a: 'You lose access to new trades but can still view completed history. Renew anytime.',
          },
        ],
      },
    ],
    cta: {
      heading: 'Ready when you are.',
      text: 'An account takes minutes. You could be following a live desk before the next London open.',
      primary: { to: '/register', label: 'Create account' },
      secondary: { to: '/login', label: 'Log in' },
    },
    related: [
      { to: '/fees', label: 'Fees', desc: 'What packages cost' },
      { to: '/academy', label: 'Academy', desc: 'Learning next to signals' },
      { to: '/faq', label: 'Help center', desc: 'Everything else' },
    ],
  },

  insights: {
    badge: 'Market Insights',
    badgeIcon: 'activity',
    title: 'Sigmora Insight.',
    titleAccent: 'Know the move.',
    subtitle:
      'Deep-dive breakdowns so every decision is grounded in something real — live feed, sector heat, region, and the story behind the signal.',
    ticker: TICKER,
    visual: TAPE_VISUAL,
    actions: [
      { to: '/register', label: 'Follow with context →', primary: true },
      { to: '/digest', label: 'Read the Digest' },
    ],
    sections: [
      {
        type: 'feed',
        eyebrow: 'Live feed',
        heading: 'What the tape just said',
        items: [
          { meta: '2m', title: 'NVDA broke above 30-day resistance', desc: 'Equity desks that wait for structure are already in the thread.' },
          { meta: '14m', title: 'ECB holds rates steady', desc: 'EUR/USD reprices. London books adjust stops before the next card.' },
          { meta: '41m', title: 'BTC volatility index up 12%', desc: 'Crypto creators treat vol as a risk input. Size follows.' },
          { meta: '1h', title: 'ASBN downgraded to Hold', desc: 'Financials heat goes red. The insight is the sector, not the headline.' },
        ],
      },
      {
        type: 'board',
        heading: 'Heat and where the activity is',
        heatmap: [
          { label: 'TECH', pct: '+4.1%', up: true, wide: true, tall: true },
          { label: 'NRG', pct: '+2.0%', up: true },
          { label: 'RE', pct: '−0.8%', up: false },
          { label: 'FIN', pct: '−3.4%', up: false, wide: true },
          { label: 'HLTH', pct: '+1.7%', up: true },
          { label: 'UTIL', pct: '+0.6%', up: true },
          { label: 'MAT', pct: '−0.3%', up: false },
        ],
        regions: [
          ['Americas', '42%'],
          ['Europe', '27%'],
          ['Asia-Pacific', '23%'],
          ['MENA', '8%'],
        ],
      },
      {
        type: 'articles',
        eyebrow: 'Read next',
        heading: 'Insight is a habit, not a blast',
        items: [
          {
            tag: 'FX',
            title: 'Session overlap is the real “news”',
            desc: 'Most academy volume still prints when London and New York share the tape.',
            to: '/markets/hours',
          },
          {
            tag: 'Equities',
            title: 'Resistance breaks need a plan',
            desc: 'NVDA above the 30-day is only a trade if invalidation is on the card.',
            to: '/signals',
          },
          {
            tag: 'Crypto',
            title: 'Vol up 12% is a size event',
            desc: 'Treat the index like risk, not entertainment.',
            to: '/markets/crypto',
          },
        ],
      },
      {
        type: 'cards',
        heading: 'Why insight sits next to execution',
        items: [
          { icon: 'chart', title: 'Real-time analytics', desc: 'Dashboards, not a weekly PDF.' },
          { icon: 'target', title: 'Expert strategies', desc: 'The why behind proven playbooks.' },
          { icon: 'zap', title: 'On time', desc: 'Write-up that is not late to the trade.' },
        ],
      },
    ],
    related: [
      { to: '/digest', label: 'Sigmora Digest', desc: 'The brief for people with a book' },
      { to: '/calendar', label: 'Calendar', desc: 'The week ahead' },
      { to: '/markets', label: 'All markets', desc: 'The tape itself' },
    ],
  },

  calendar: {
    badge: 'Economic Calendar',
    badgeIcon: 'bar',
    title: 'The week ahead,',
    titleAccent: 'without the noise.',
    subtitle:
      'Central banks, data, and session risk that actually hit EUR/USD, gold, and the equity names on the board. Illustrative — confirm live times in-product.',
    visual: {
      type: 'stats',
      label: 'This week',
      items: [
        { value: 'ECB', label: 'EUR/USD' },
        { value: 'NFP', label: 'USD / gold' },
        { value: 'FOMC', label: 'USD/JPY' },
        { value: 'Vol', label: 'BTC/USD' },
      ],
    },
    actions: [
      { to: '/markets/hours', label: 'Session hours →', primary: true },
      { to: '/register', label: 'Get event-aware signals' },
    ],
    sections: [
      {
        type: 'feed',
        eyebrow: 'Map',
        heading: 'Events creators already plan around',
        items: [
          { meta: 'London AM', title: 'ECB decision / hold', desc: 'Primary tape: EUR/USD. London books rewrite in minutes.' },
          { meta: 'NY overlap', title: 'US prints / NFP week', desc: 'USD, gold, and risk assets reprice together.' },
          { meta: 'US cash', title: 'Mega-cap earnings tape', desc: 'NVDA and ADBE — structure over the headline.' },
          { meta: 'Anytime', title: 'Crypto vol spikes', desc: 'BTC/USD. Size is the decision, not the tweet.' },
          { meta: 'Asia', title: 'USD/JPY session flows', desc: 'Tokyo into London handover.' },
        ],
      },
      {
        type: 'table',
        heading: 'At a glance',
        columns: ['Window', 'Event', 'Primary tape'],
        rows: [
          { cells: ['London AM', 'ECB decision / hold', 'EUR/USD'] },
          { cells: ['NY overlap', 'US prints / NFP week', 'USD, XAU/USD'] },
          { cells: ['US cash', 'Mega-cap earnings tape', 'NVDA, ADBE'] },
          { cells: ['Anytime', 'Crypto vol spikes', 'BTC/USD'] },
          { cells: ['Asia', 'USD/JPY session flows', 'USD/JPY'] },
        ],
      },
      {
        type: 'split',
        reverse: true,
        heading: 'If it is not on the calendar, it is not your alibi.',
        paragraphs: [
          'Pair this with Market Hours for session opens. Let live notifications handle the trade itself.',
          'Creators who publish into a red-folder event owe you the same clock. That is why this page exists.',
        ],
        image: IMG.desk,
      },
    ],
    related: [
      { to: '/markets/hours', label: 'Hours', desc: 'Sydney to New York' },
      { to: '/insights', label: 'Insights', desc: 'After the print' },
      { to: '/markets/forex', label: 'Forex', desc: 'Pairs these events move' },
    ],
  },

  digest: {
    badge: 'Sigmora Digest',
    badgeIcon: 'chart',
    title: 'A brief for people who',
    titleAccent: 'already have a book.',
    subtitle:
      'Editorial layer with the homepage philosophy: institutional grade, less noise. Tape, desks, learning, platform — one sitting.',
    visual: {
      type: 'quote',
      text: 'One page. The levels that matter. Not 40 headlines.',
      author: 'This week’s tape',
    },
    actions: [
      { to: '/register', label: 'Follow along in-product →', primary: true },
      { to: '/insights', label: 'Live insights' },
    ],
    sections: [
      {
        type: 'articles',
        eyebrow: 'In this edition',
        heading: 'What we would actually send a serious trader',
        items: [
          {
            tag: 'Tape',
            title: 'EUR/USD 1.0912, gold 2,384, bitcoin heavy',
            desc: 'The snapshot from the live tape — not forty headlines.',
            to: '/markets',
          },
          {
            tag: 'Desks',
            title: 'Who is worth watching this month',
            desc: 'Smith, Chen, Litm, Wallace — returns and win rates in the open.',
            to: '/club',
          },
          {
            tag: 'Learn',
            title: 'Risk module still leads academy progress',
            desc: 'If you only finish one course, make it the one that keeps you in the game.',
            to: '/academy',
          },
          {
            tag: 'Platform',
            title: '99.9% uptime is a promise the desk cannot blink on',
            desc: 'Signals are useless if the notification arrives after the move.',
            to: '/features',
          },
          {
            tag: 'Clock',
            title: 'London still prints most of the FX book',
            desc: 'Know the overlap before you chase an Asia spike.',
            to: '/markets/hours',
          },
          {
            tag: 'Risk',
            title: '96% is not a size instruction',
            desc: 'Homepage success rate is a track record, not a dare.',
            to: '/responsible-trading',
          },
        ],
      },
      {
        type: 'cards',
        heading: 'How to use the Digest',
        items: [
          { icon: 'check', title: 'Before London', desc: 'Skim tape and calendar. Follow day or stand-aside day.' },
          { icon: 'users', title: 'After a signal', desc: 'If the thesis is not on the page, it is not your trade.' },
          { icon: 'diamond', title: 'Weekend', desc: 'Review completed trades. Digest is narrative; dashboard is score.' },
        ],
      },
    ],
    related: [
      { to: '/insights', label: 'Insights', desc: 'Intraday feed' },
      { to: '/club', label: 'Club', desc: 'The desks in this edition' },
      { to: '/academy', label: 'Academy', desc: 'The risk module' },
    ],
  },

  media: {
    badge: 'Media Center',
    badgeIcon: 'activity',
    title: 'Sigmora in the',
    titleAccent: 'open.',
    subtitle:
      'Brand, milestones, and the numbers on the homepage: 12,000+ traders, 96% marked success, 18+ awards, 99.9% uptime. We are a signal platform — not a retail broker.',
    visual: { type: 'image', src: IMG.city, alt: 'Sigmora' },
    actions: [
      { to: '/contact', label: 'Press contact →', primary: true },
      { to: '/about', label: 'About Sigmora' },
    ],
    sections: [
      { type: 'stats', items: STATS },
      {
        type: 'split',
        eyebrow: 'Boilerplate',
        heading: 'Institutional-grade signals, without the noise.',
        paragraphs: [
          'Sigmora connects verified trading creators with ambitious subscribers. Academies, packages, real-time trade publishing — payments stay between creator and subscriber.',
          'Treat homepage figures as directional platform metrics, not a promise of future returns. Trading involves risk. Signals are not investment advice.',
        ],
        image: IMG.desk,
      },
      {
        type: 'cards',
        heading: 'What to cover',
        items: [
          { icon: 'users', title: 'Creator economy', desc: 'Invite codes, packages, and payments that stay with the desk.' },
          { icon: 'shield', title: 'Security', desc: 'Encryption, hashed credentials, no card data stored on Sigmora servers.' },
          { icon: 'zap', title: 'Product', desc: 'Live tape, academy curriculum, multi-platform access.' },
        ],
      },
      {
        type: 'articles',
        heading: 'Fact pack',
        items: [
          { tag: 'Founded', title: '2024', desc: 'Built to democratize professional forex: expert strategies, real-time insight, honest numbers.' },
          { tag: 'Footprint', title: '50+ countries', desc: 'Traders across Americas, Europe, Asia-Pacific, and MENA.' },
          { tag: 'Model', title: 'Not a broker', desc: 'Manual execution on the subscriber’s own venue.' },
        ],
      },
    ],
    cta: {
      heading: 'Press & brand',
      text: 'For interviews, logos, and founder comments, reach Customer Support.',
      primary: { to: '/contact', label: 'Contact Support' },
      secondary: { to: '/about', label: 'About Sigmora' },
    },
    related: [
      { to: '/about', label: 'About', desc: 'Story and timeline' },
      { to: '/awards', label: 'Awards', desc: '18+ recognitions' },
      { to: '/careers', label: 'Careers', desc: 'Who is shipping this' },
    ],
  },

  careers: {
    badge: 'Careers',
    badgeIcon: 'users',
    title: 'Build the desk',
    titleAccent: 'traders actually open.',
    subtitle:
      'A small team shipping analytics, notifications, and academy tools for 12,000+ traders. If you care about uptime and craft, keep reading.',
    visual: { type: 'image', src: IMG.team, alt: 'Sigmora team' },
    actions: [
      { to: '/contact', label: 'Send a note →', primary: true },
      { to: '/about', label: 'Our story' },
    ],
    sections: [
      {
        type: 'split',
        heading: 'The work is the product.',
        paragraphs: [
          'Lightning-fast alerts, bank-level security, and a UI that still looks like a terminal. We hire people who have used a platform they hated and wanted to fix it.',
          'You will sit next to creator workflows (packages, assets, live trades) and subscriber workflows (checkout, notifications, performance). Both have to stay elegant.',
        ],
        image: IMG.learn,
      },
      {
        type: 'jobs',
        eyebrow: 'Open types',
        heading: 'Roles we hire for',
        items: [
          {
            title: 'Product engineering',
            team: 'Engineering',
            loc: 'Remote-friendly',
            desc: 'Next.js, real-time feeds, and the dashboards creators live in all session.',
          },
          {
            title: 'Security & infrastructure',
            team: 'Platform',
            loc: 'Remote-friendly',
            desc: 'Encryption, sessions, and the 99.9% uptime number on the homepage.',
          },
          {
            title: 'Markets design',
            team: 'Design',
            loc: 'Remote-friendly',
            desc: 'Tape, charts, and empty states that still feel institutional.',
          },
          {
            title: 'Creator success',
            team: 'Go-to-market',
            loc: 'Remote-friendly',
            desc: 'Help academies launch codes, packages, and their first hundred subscribers.',
          },
        ],
      },
      {
        type: 'cards',
        heading: 'How we work',
        items: [
          { icon: 'zap', title: 'Ship with the tape', desc: 'If notifications miss London open, nothing else we shipped that week matters.' },
          { icon: 'shield', title: 'Privacy by default', desc: 'Hashed passwords. No raw cards on our disks.' },
          { icon: 'users', title: 'Creators are colleagues', desc: 'The academy is the customer. Design for the desk, not a demo.' },
        ],
      },
    ],
    related: [
      { to: '/about', label: 'About', desc: 'Why the company exists' },
      { to: '/contact', label: 'Contact', desc: 'Role in the subject line' },
      { to: '/media', label: 'Media', desc: 'Public facts' },
    ],
  },

  partners: {
    badge: 'Creator Relations',
    badgeIcon: 'users',
    title: 'Partner with the rails.',
    titleAccent: 'Keep the relationship.',
    subtitle:
      'For established desks, educators, and academies that want institutional-grade infrastructure without giving up their brand or their book.',
    visual: { type: 'image', src: IMG.learn, alt: 'Creator relations' },
    actions: [
      { to: '/contact', label: 'Talk to the team →', primary: true },
      { to: '/register?role=creator', label: 'Start as a creator' },
    ],
    sections: [
      {
        type: 'compare',
        eyebrow: 'Why migrate',
        heading: 'Chat thread vs Sigmora academy',
        left: {
          heading: 'Typical chat desk',
          items: [
            'Signals buried in scrollback',
            'No public win rate',
            'Payments off-platform and messy',
            'No pip notes, no completed tape',
          ],
        },
        right: {
          heading: 'On Sigmora',
          items: [
            'Live cards with levels and alerts',
            'Verified stats your room can audit',
            'Packages you price; money stays with you',
            'Academy curriculum next to the trade',
          ],
        },
      },
      {
        type: 'split',
        heading: 'We host the academy. You still own the room.',
        paragraphs: [
          'Invite codes stay yours. Sigmora supplies publishing, packages, analytics, and the notification layer that has to work at London open.',
          'If you already teach on Telegram or a PDF desk and want professional rails, this is the conversation.',
        ],
        image: IMG.team,
        checks: ['Package architecture mapped to how you already sell', 'Publish workflow your room will recognize', 'Proof without a spreadsheet'],
      },
      {
        type: 'steps',
        heading: 'How a partnership starts',
        items: [
          { title: 'Tell us the desk', desc: 'Assets, audience, current pricing, headache with the current stack.' },
          { title: 'Map the academy', desc: 'Codes, packages, 30-day access, Flutterwave checkout.' },
          { title: 'Go live', desc: 'First signal on Sigmora with your people already in the room.' },
        ],
      },
    ],
    related: [
      { to: '/creators', label: 'Creator earnings', desc: 'Self-serve launch' },
      { to: '/fees', label: 'Fee schedule', desc: 'What subscribers pay' },
      { to: '/contact', label: 'Contact', desc: 'Creator Relations' },
    ],
  },

  awards: {
    badge: 'Awards',
    badgeIcon: 'diamond',
    title: '18+ industry awards.',
    titleAccent: 'Still shipping.',
    subtitle:
      'Recognition follows reliability, creator tools, and a product serious traders leave open. The homepage number is a track record — not a finish line.',
    visual: { type: 'stats', label: 'Recognition', items: STATS },
    actions: [
      { to: '/about', label: 'Our story →', primary: true },
      { to: '/features', label: 'What we shipped' },
    ],
    sections: [
      {
        type: 'cards',
        cols: 2,
        heading: 'What those awards are actually for',
        items: [
          { icon: 'shield', title: 'Trust & security', desc: 'Bank-level encryption, secure sessions, privacy-first posture.' },
          { icon: 'zap', title: 'Performance', desc: '99.9% uptime and alerts that arrive while the trade is still the trade.' },
          { icon: 'users', title: 'Creator infrastructure', desc: 'Academies and packages without a spreadsheet army.' },
          { icon: 'chart', title: 'Trader experience', desc: '4.9/5 from 2,400+ verified traders.' },
        ],
      },
      {
        type: 'timeline',
        heading: 'How we talk about it',
        items: [
          { year: '2024', title: 'Product over podium', desc: 'Founded to put expert strategies and honest stats in one place.' },
          { year: '2025', title: 'Multi-asset tape', desc: 'FX core, then gold, bitcoin, and equity names on the same login.' },
          { year: 'Now', title: '18+ recognitions', desc: 'Still measured by whether London open works — not by a trophy wall.' },
        ],
      },
      {
        type: 'notice',
        heading: 'A note on numbers',
        text: 'Awards and success-rate figures describe platform and creator track records as presented on the product. They are not a guarantee of your future results. Trading involves risk of loss.',
      },
    ],
    related: [
      { to: '/about', label: 'About', desc: 'Full story' },
      { to: '/media', label: 'Media', desc: 'Fact pack' },
      { to: '/features', label: 'Features', desc: 'The product behind the plaque' },
    ],
  },

  risk: {
    layout: 'center',
    badge: 'Risk Disclosures',
    badgeIcon: 'shield',
    title: 'Signals are not a broker.',
    titleAccent: 'Your capital is yours.',
    subtitle:
      'Creators publish. Subscribers follow. You execute on your own broker. Losses can exceed what you expect.',
    hideCta: true,
    sections: [
      {
        type: 'notice',
        heading: 'Read this before you follow a desk',
        text: 'Nothing on Sigmora is investment advice, a solicitation, or a promise of profit. Past win rates — including the 96% success figure on our homepage — are not indicative of future results.',
      },
      {
        type: 'prose',
        heading: 'What Sigmora is',
        paragraphs: [
          'Sigmora is a professional trade-signal and academy platform. Creators publish setups. Subscribers receive notifications and analytics. We are not a dealer, introducing broker, or custodian of trading funds.',
          'You keep full control of if, when, and how you place a trade. Automatic copy-execution into a brokerage account is not part of the product.',
        ],
        blocks: [
          {
            heading: 'Leverage and FX',
            paragraphs: [
              'Forex, gold, crypto, and leveraged products can move against you quickly. Pip-perfect signals can still lose money if your size, broker conditions, or slippage differ from the creator’s.',
            ],
          },
          {
            heading: 'Creator performance',
            paragraphs: [
              'Verified badges, returns, and win rates help you choose a desk. They can be incomplete, lag live markets, or fail to reflect your fill quality. Do your own work.',
            ],
          },
          {
            heading: 'Subscriptions',
            paragraphs: [
              'Paying for a package buys access to signals and academy content. It does not buy a share of anyone’s brokerage P&L and does not make Sigmora a party to your trades.',
            ],
          },
          {
            heading: 'Illustrative prices',
            paragraphs: [
              'Marketing levels (EUR/USD 1.0912, gold 2,384.10, NVDA $374.20, and similar) are snapshots for education and design. They are not live executable quotes.',
            ],
          },
        ],
      },
    ],
    related: [
      { to: '/legal/disclaimer', label: 'Disclaimer', desc: 'Educational, not advice' },
      { to: '/responsible-trading', label: 'Responsible trading', desc: 'Habits we expect' },
      { to: '/legal/terms', label: 'Terms', desc: 'The agreement' },
    ],
  },

  privacy: {
    layout: 'center',
    badge: 'Privacy Policy',
    badgeIcon: 'shield',
    title: 'Your data stays',
    titleAccent: 'on a short leash.',
    subtitle:
      'Encryption, hashed passwords, and we do not store sensitive payment details on Sigmora servers.',
    hideCta: true,
    sections: [
      {
        type: 'prose',
        heading: 'Privacy at Sigmora',
        paragraphs: [
          'We collect account details (name, email, role), academy and subscription records, and product analytics needed to run dashboards, notifications, and support. We do not sell personal information.',
          'Payments are processed by Flutterwave. Card and bank data stay with that provider — not as raw credentials in our database.',
        ],
        blocks: [
          {
            heading: 'What we use data for',
            paragraphs: [
              'Authentication, showing you the desks you paid for, sending trade notifications you opted into, improving Getting Started flows, and answering support tickets.',
            ],
          },
          {
            heading: 'Security',
            paragraphs: [
              'Transport is protected with modern TLS. Passwords are hashed. Sessions can be revoked. Two-factor authentication is part of the security posture described on Features.',
            ],
          },
          {
            heading: 'Your choices',
            paragraphs: [
              'Update profile data in-app, request deletion via support, and opt out of non-essential mail. Messages required to run a paid academy may still send.',
            ],
          },
          {
            heading: 'Contact',
            paragraphs: ['support@sigmora.com or the Contact page. We typically respond within a few hours.'],
          },
        ],
      },
    ],
    related: [
      { to: '/legal/cookies', label: 'Cookies', desc: 'How storage works' },
      { to: '/legal/terms', label: 'Terms', desc: 'Account rules' },
      { to: '/contact', label: 'Support', desc: 'Privacy requests' },
    ],
  },

  terms: {
    layout: 'center',
    badge: 'Terms & Conditions',
    badgeIcon: 'check',
    title: 'The rules of the',
    titleAccent: 'desk.',
    subtitle:
      'By creating an account you agree to use Sigmora as a signal and academy product — not as a brokerage, and not as a guarantee of results.',
    hideCta: true,
    sections: [
      {
        type: 'prose',
        heading: 'Agreement',
        paragraphs: [
          'These terms govern websites, dashboards, and related services. If you do not agree, do not create an account.',
          'Creators are responsible for the accuracy of published trades and package descriptions. Subscribers are responsible for execution, risk, and their broker’s rules.',
        ],
        blocks: [
          {
            heading: 'Accounts',
            paragraphs: [
              'Provide accurate registration details and keep credentials confidential. We may suspend accounts that abuse invite codes, scrape signals, or resell academy content without permission.',
            ],
          },
          {
            heading: 'Packages and refunds',
            paragraphs: [
              'Subscriptions generally run 30 days without automatic renewal. Refunds follow each creator’s stated policy and payment-provider rules.',
            ],
          },
          {
            heading: 'Acceptable use',
            paragraphs: [
              'Do not reverse-engineer the product to redistribute live signals, impersonate a verified desk, or interfere with 99.9% uptime for everyone else.',
            ],
          },
          {
            heading: 'Liability',
            paragraphs: [
              'To the fullest extent permitted by law, Sigmora is not liable for trading losses, missed notifications due to your device settings, or third-party broker failures. See Risk Disclosures and the Disclaimer.',
            ],
          },
        ],
      },
    ],
    related: [
      { to: '/legal/risk', label: 'Risk', desc: 'Trading losses' },
      { to: '/legal/privacy', label: 'Privacy', desc: 'Your data' },
      { to: '/legal/disclaimer', label: 'Disclaimer', desc: 'Not advice' },
    ],
  },

  cookies: {
    layout: 'center',
    badge: 'Cookie Policy',
    badgeIcon: 'check',
    title: 'Cookies,',
    titleAccent: 'kept boring.',
    subtitle:
      'We use cookies and similar storage to keep you logged in, remember preferences, and see which pages help traders get started.',
    hideCta: true,
    sections: [
      {
        type: 'compare',
        heading: 'Two buckets',
        left: {
          heading: 'Essential',
          items: ['Authentication and session security', 'Load balancing and abuse prevention', 'Required for dashboards to work'],
        },
        right: {
          heading: 'Analytics',
          items: ['Whether Getting Started converts', 'Which academy flows stall', 'We do not sell your identity to advertisers'],
        },
      },
      {
        type: 'prose',
        heading: 'Managing cookies',
        paragraphs: [
          'You can block non-essential cookies in your browser. If you block essential cookies, login and dashboard sessions may not work.',
          'For more on personal data, see the Privacy Policy.',
        ],
      },
    ],
    related: [
      { to: '/legal/privacy', label: 'Privacy', desc: 'Full data picture' },
      { to: '/legal/terms', label: 'Terms', desc: 'Account rules' },
    ],
  },

  disclaimer: {
    layout: 'center',
    badge: 'Disclaimer',
    badgeIcon: 'shield',
    title: 'Educational signals.',
    titleAccent: 'Not advice.',
    subtitle:
      'Charts, win rates, and creator commentary are for education and information. They are not a recommendation to buy or sell any instrument.',
    hideCta: true,
    sections: [
      {
        type: 'prose',
        heading: 'Please trade your own account',
        paragraphs: [
          'Illustrative prices on marketing pages are snapshots for design and education. They are not live executable quotes.',
          'Sigmora, its creators, and its partners are not responsible for actions you take in a brokerage account. If you need personalised advice, consult a licensed professional in your jurisdiction.',
          'Nothing here is an offer of securities, derivatives, or managed funds.',
        ],
      },
      {
        type: 'notice',
        heading: 'Related reading',
        text: 'Risk Disclosures cover leverage, creator stats, and subscriptions. Responsible Trading covers habits. Terms cover the contract.',
      },
    ],
    related: [
      { to: '/legal/risk', label: 'Risk disclosures', desc: 'Full risk picture' },
      { to: '/responsible-trading', label: 'Responsible trading', desc: 'How to use the product' },
    ],
  },

  'responsible-trading': {
    badge: 'Responsible Trading',
    badgeIcon: 'shield',
    title: 'Take the edge seriously.',
    titleAccent: 'Take the risk personally.',
    subtitle:
      'Built for disciplined traders. If following signals starts to feel like a compulsion, step back. The desk will still be here.',
    visual: {
      type: 'quote',
      text: 'Manual execution exists so you can say no. Use that veto.',
      author: 'Sigmora product principle',
    },
    actions: [
      { to: '/legal/risk', label: 'Risk disclosures →', primary: true },
      { to: '/contact', label: 'Lock an account' },
    ],
    sections: [
      {
        type: 'cards',
        cols: 2,
        heading: 'Habits we expect',
        items: [
          { icon: 'target', title: 'Size from the stop', desc: 'Creators publish invalidation. Do not double down to “keep the 96%.”' },
          { icon: 'check', title: 'You click the ticket', desc: 'Manual execution is a feature. Skip a signal that does not fit.' },
          { icon: 'users', title: 'One academy, not ten', desc: 'Overlapping desks chop accounts. Pick a book.' },
          { icon: 'shield', title: 'Know when to pause', desc: 'Expired subscriptions still show history. You can learn without being live.' },
        ],
      },
      {
        type: 'split',
        reverse: true,
        heading: 'Help without a lecture',
        paragraphs: [
          'If trading is harming your finances or health, seek local professional help.',
          'Sigmora support can lock an account on request via Contact. Ask. We will not make it a performance review.',
        ],
        image: IMG.desk,
        cta: { to: '/contact', label: 'Contact support' },
      },
    ],
    cta: {
      heading: 'Questions about risk?',
      text: 'Read the full disclosures, then talk to support if something is unclear.',
      primary: { to: '/legal/risk', label: 'Risk Disclosures' },
      secondary: { to: '/contact', label: 'Contact Support' },
    },
    related: [
      { to: '/legal/disclaimer', label: 'Disclaimer', desc: 'Not advice' },
      { to: '/getting-started', label: 'Getting started', desc: 'Use the product as designed' },
      { to: '/faq', label: 'Help center', desc: 'Practical questions' },
    ],
  },
};
