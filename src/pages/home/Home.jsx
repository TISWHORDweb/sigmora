'use client';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from '../../lib/router';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import '../../styles/landing-tokens.css';
import './Home.css';

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

const CREATOR_PERKS = [
  'Private academy invite codes',
  'Subscriber & package management',
  'Real-time trade publishing',
  'Asset-level pip & margin control',
];

const TRADERS = [
  {
    name: 'A. Smith',
    desc: 'A results-driven portfolio manager with a decade of consistent performance.',
    ret: '78%',
    win: '73%',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=300&fit=crop&crop=faces&q=80&auto=format',
  },
  {
    name: 'L. Chen',
    desc: 'Expert quant strategist with a sharp focus on volatility and risk.',
    ret: '76%',
    win: '71%',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=faces&q=80&auto=format',
  },
  {
    name: 'L. Litm',
    desc: 'Experienced commodities trader focused on macro trends and cycles.',
    ret: '76%',
    win: '69%',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop&crop=faces&q=80&auto=format',
  },
  {
    name: 'H. Wallace',
    desc: 'Long-term equity investor with a disciplined, research-first approach.',
    ret: '74%',
    win: '68%',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop&crop=faces&q=80&auto=format',
  },
];

const WHY = [
  {
    title: 'Real-Time Analytics',
    desc: 'Advanced analytics and insights to track your trading performance with precision and clarity. Monitor your portfolio in real-time with comprehensive dashboards.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    title: 'Expert Strategies',
    desc: 'Follow proven trading strategies from professional forex experts with years of market experience. Learn from the best and replicate their success.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    title: 'Bank-Level Security',
    desc: 'Enterprise-grade security with end-to-end encryption to protect your data and trading information. Your privacy and security are our top priorities.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      </svg>
    ),
  },
  {
    title: 'Lightning Fast Execution',
    desc: 'Ultra-low latency execution with sub-millisecond response times for optimal trading performance. Never miss an opportunity with instant trade execution.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: 'Multi-Platform Access',
    desc: 'Access your trades seamlessly from desktop, mobile, or tablet with full feature parity. Trade on the go with our responsive design.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="2" width="10" height="20" rx="2" />
        <path d="M16 6h4v14a2 2 0 0 1-2 2h-2" />
      </svg>
    ),
  },
  {
    title: 'Premium Support',
    desc: '24/7 dedicated support from our expert team of trading professionals and technical specialists. Get help when you need it most.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
      </svg>
    ),
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [academyCode, setAcademyCode] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJoinAcademy = (e) => {
    e.preventDefault();
    const code = academyCode.trim().toUpperCase();
    if (!code) return;
    navigate(`/register?role=subscriber&code=${encodeURIComponent(code)}`);
  };

  return (
    <div className="home-page landing-premium">
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
      <Navbar landing />

      <div className="ticker-tape">
        <div className="ticker-track">
          <div className="ticker-set">
            {TICKER.map((t) => (
              <div className="ticker-item" key={t.pair}>
                <span className="pair">{t.pair}</span>
                <span className="px">{t.px}</span>
                <span className={`chg ${t.up ? 'up' : 'down'}`}>{t.chg}</span>
              </div>
            ))}
          </div>
          <div className="ticker-set" aria-hidden="true">
            {TICKER.map((t) => (
              <div className="ticker-item" key={`dup-${t.pair}`}>
                <span className="pair">{t.pair}</span>
                <span className="px">{t.px}</span>
                <span className={`chg ${t.up ? 'up' : 'down'}`}>{t.chg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="status-pill reveal reveal-1">
              <span className="pulse" />
              Markets Open · Live Pricing
            </div>
            <h1 className="reveal reveal-2">
              Institutional grade
              <br />
              <em>signals</em>, without the noise.
            </h1>
            <p className="hero-sub reveal reveal-3">
              Connect with verified trading creators. Access real-time trade signals, institutional risk
              management, and structured learning paths — built for traders who take their edge seriously.
            </p>

            <div className="reveal reveal-4">
              <form className="email-form" onSubmit={handleJoinAcademy}>
                <input
                  type="text"
                  value={academyCode}
                  onChange={(e) => setAcademyCode(e.target.value.toUpperCase())}
                  placeholder="Enter Academy Code (e.g. TRD782)"
                  maxLength={6}
                  aria-label="Academy code"
                />
                <button type="submit" className="btn btn-primary">
                  Join Academy
                </button>
              </form>
              <div className="hero-actions-row">
                <Link to="/register" className="btn btn-primary">
                  Start Trading →
                </Link>
                <span className="register-inline">
                  Or <Link to="/register?role=creator">register as a creator →</Link>
                </span>
              </div>
            </div>

            <div className="trust-row reveal reveal-5">
              <div className="trust-avatars">
                <span style={{ background: 'rgba(168, 85, 247,0.18)', color: '#a855f7' }}>AS</span>
                <span style={{ background: 'rgba(232,184,75,0.18)', color: '#e8b84b' }}>LC</span>
                <span style={{ background: 'rgba(226,86,79,0.18)', color: '#e2564f' }}>HW</span>
                <span style={{ background: 'rgba(217, 70, 239,0.18)', color: '#d946ef' }}>LL</span>
              </div>
              <div>
                <div className="trust-stars">★★★★★</div>
                <div className="trust-text">
                  <b>4.9/5</b> from 2,400+ verified traders on Sigmora
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visual reveal reveal-3">
            <div className="orb" />
            <div className="terminal">
              <div className="terminal-head">
                <div className="terminal-pair">
                  <span className="flag-dot" />
                  <div>
                    <div className="name">EUR/USD</div>
                    <div className="sub">Forex · 1D</div>
                  </div>
                </div>
                <div className="terminal-price">
                  <div className="p">1.0912</div>
                  <div className="c">▲ 0.39%</div>
                </div>
              </div>

              <div className="terminal-chart">
                <svg viewBox="0 0 460 160" width="100%" height="160" preserveAspectRatio="none">
                  <line x1="0" y1="30" x2="460" y2="30" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 4" />
                  <line x1="0" y1="70" x2="460" y2="70" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 4" />
                  <line x1="0" y1="110" x2="460" y2="110" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 4" />
                  <line x1="0" y1="150" x2="460" y2="150" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 4" />
                  <line x1="451.8" y1="0" x2="451.8" y2="160" stroke="rgba(168, 85, 247,0.35)" strokeDasharray="2 3" />
                  <line x1="8.2" y1="11.2" x2="8.2" y2="35.6" stroke="#e2564f" strokeWidth="1.4" />
                  <rect x="3.6" y="14" width="9.2" height="9.6" fill="#e2564f" opacity="0.85" rx="1" />
                  <line x1="24.6" y1="13.7" x2="24.6" y2="55.4" stroke="#e2564f" strokeWidth="1.4" />
                  <rect x="20" y="23.6" width="9.2" height="25.1" fill="#e2564f" opacity="0.85" rx="1" />
                  <line x1="41.1" y1="39.3" x2="41.1" y2="75.3" stroke="#e2564f" strokeWidth="1.4" />
                  <rect x="36.5" y="48.7" width="9.2" height="26" fill="#e2564f" opacity="0.85" rx="1" />
                  <line x1="106.8" y1="83.4" x2="106.8" y2="114.7" stroke="#a855f7" strokeWidth="1.4" />
                  <rect x="102.2" y="90.7" width="9.2" height="6" fill="#a855f7" opacity="0.95" rx="1" />
                  <line x1="156.1" y1="114" x2="156.1" y2="148.8" stroke="#a855f7" strokeWidth="1.4" />
                  <rect x="151.5" y="117.4" width="9.2" height="20.7" fill="#a855f7" opacity="0.95" rx="1" />
                  <line x1="172.5" y1="100.7" x2="172.5" y2="127.5" stroke="#a855f7" strokeWidth="1.4" />
                  <rect x="167.9" y="107.6" width="9.2" height="9.8" fill="#a855f7" opacity="0.95" rx="1" />
                  <line x1="221.8" y1="106.1" x2="221.8" y2="126.5" stroke="#a855f7" strokeWidth="1.4" />
                  <rect x="217.2" y="114.4" width="9.2" height="6.5" fill="#a855f7" opacity="0.95" rx="1" />
                  <line x1="238.2" y1="82.2" x2="238.2" y2="119" stroke="#a855f7" strokeWidth="1.4" />
                  <rect x="233.6" y="95.1" width="9.2" height="19.3" fill="#a855f7" opacity="0.95" rx="1" />
                  <line x1="271.1" y1="68.6" x2="271.1" y2="107.4" stroke="#a855f7" strokeWidth="1.4" />
                  <rect x="266.5" y="73.9" width="9.2" height="15.3" fill="#a855f7" opacity="0.95" rx="1" />
                  <line x1="336.8" y1="74.7" x2="336.8" y2="117.7" stroke="#a855f7" strokeWidth="1.4" />
                  <rect x="332.2" y="80.5" width="9.2" height="24.3" fill="#a855f7" opacity="0.95" rx="1" />
                  <line x1="369.6" y1="33.9" x2="369.6" y2="82.2" stroke="#a855f7" strokeWidth="1.4" />
                  <rect x="365" y="51.3" width="9.2" height="22.2" fill="#a855f7" opacity="0.95" rx="1" />
                  <line x1="402.5" y1="11.3" x2="402.5" y2="55.1" stroke="#a855f7" strokeWidth="1.4" />
                  <rect x="397.9" y="29.7" width="9.2" height="10.3" fill="#a855f7" opacity="0.95" rx="1" />
                  <line x1="435.4" y1="33.2" x2="435.4" y2="73" stroke="#e2564f" strokeWidth="1.4" />
                  <rect x="430.8" y="41.7" width="9.2" height="28.1" fill="#e2564f" opacity="0.85" rx="1" />
                  <line x1="451.8" y1="68.8" x2="451.8" y2="106.4" stroke="#e2564f" strokeWidth="1.4" />
                  <rect x="447.2" y="69.8" width="9.2" height="22.3" fill="#e2564f" opacity="0.85" rx="1" />
                  <circle cx="451.8" cy="92.2" r="4" fill="#a855f7" />
                  <circle cx="451.8" cy="92.2" r="8" fill="none" stroke="#a855f7" strokeWidth="1.5" opacity="0.5" />
                </svg>
                <div className="crosshair-tip" style={{ left: 386, top: 78 }}>
                  1.0912
                </div>
              </div>

              <div className="terminal-watchlist">
                <div className="wl-row" style={{ borderTop: 'none' }}>
                  <div className="wl-avatar" style={{ background: 'rgba(232,184,75,0.15)', color: '#e8b84b' }}>
                    Au
                  </div>
                  <div className="wl-info">
                    <div className="wl-name">XAU/USD</div>
                    <div className="wl-sub">Gold</div>
                  </div>
                  <svg width="64" height="24" viewBox="0 0 64 24">
                    <path
                      d="M0.0,9.1 L7.1,9.2 L14.2,7.6 L21.3,8.4 L28.4,9.3 L35.6,4.6 L42.7,2.9 L49.8,6.0 L56.9,3.3 L64.0,2.9"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="wl-price">
                    <div className="p">2,384.10</div>
                    <div className="c up">+0.64%</div>
                  </div>
                </div>
                <div className="wl-row">
                  <div className="wl-avatar" style={{ background: 'rgba(226,86,79,0.15)', color: '#e2564f' }}>
                    ₿
                  </div>
                  <div className="wl-info">
                    <div className="wl-name">BTC/USD</div>
                    <div className="wl-sub">Crypto</div>
                  </div>
                  <svg width="64" height="24" viewBox="0 0 64 24">
                    <path
                      d="M0.0,13.0 L7.1,16.9 L14.2,21.1 L21.3,19.8 L28.4,21.1 L35.6,21.1 L42.7,21.1 L49.8,18.0 L56.9,14.0 L64.0,13.6"
                      fill="none"
                      stroke="#e2564f"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="wl-price">
                    <div className="p">67,240</div>
                    <div className="c down">-1.08%</div>
                  </div>
                </div>
                <div className="wl-row">
                  <div className="wl-avatar" style={{ background: 'rgba(168, 85, 247,0.15)', color: '#a855f7' }}>
                    NV
                  </div>
                  <div className="wl-info">
                    <div className="wl-name">NVDA</div>
                    <div className="wl-sub">Equities</div>
                  </div>
                  <svg width="64" height="24" viewBox="0 0 64 24">
                    <path
                      d="M0.0,12.1 L7.1,10.1 L14.2,13.2 L21.3,10.6 L28.4,10.3 L35.6,8.3 L42.7,7.0 L49.8,11.4 L56.9,7.0 L64.0,6.0"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="wl-price">
                    <div className="p">374.20</div>
                    <div className="c up">+3.28%</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="scroll-cue">
              Scroll
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="wrap stats-grid">
          {[
            {
              value: '12,000+',
              label: 'Traders',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              ),
            },
            {
              value: '96%',
              label: 'Success Rate',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              ),
            },
            {
              value: '18+',
              label: 'Industry Awards',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ),
            },
            {
              value: '99.9%',
              label: 'Uptime',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                </svg>
              ),
            },
          ].map((s) => (
            <div className="stat-card" key={s.label}>
              <div className="stat-icon">{s.icon}</div>
              <div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="creator">
        <div className="wrap creator-grid">
          <div>
            <div className="eyebrow">For Creators</div>
            <h2>
              Are you a creator?
              <br />
              <span className="accent">Control your destiny.</span>
            </h2>
            <p>
              Set up your academy in minutes. Publish trades, define packages, and share your invite code — payments
              stay between you and your subscribers.
            </p>
            <ul className="check-list">
              {CREATOR_PERKS.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
            <Link to="/register?role=creator" className="btn btn-primary">
              Launch your academy →
            </Link>
          </div>
          <div className="creator-visual">
            <div className="analyst-card">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=650&fit=crop&crop=faces&q=80&auto=format"
                alt="Market analyst portrait"
              />
              <div className="analyst-tag">
                Market Analyst
                <span>Sigmora Verified Creator</span>
              </div>
            </div>
            <div className="phone-mock">
              <div className="phone-frame">
                <div className="phone-screen">
                  <div className="phone-notch" />
                  <div className="phone-balance-lbl">Total balance</div>
                  <div className="phone-balance">$22,824.60</div>
                  <svg
                    viewBox="0 0 220 90"
                    width="100%"
                    height="70"
                    preserveAspectRatio="none"
                    style={{ marginTop: 8 }}
                  >
                    <defs>
                      <linearGradient id="phoneGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0.0,73.5 L11.6,56.5 L23.2,62.7 L34.7,50.4 L46.3,64.6 L57.9,47.8 L69.5,58.6 L81.1,63.0 L92.6,73.1 L104.2,87.7 L115.8,78.1 L127.4,71.5 L138.9,76.8 L150.5,68.4 L162.1,59.5 L173.7,49.5 L185.3,59.6 L196.8,70.2 L208.4,78.3 L220.0,68.1 L220.0,90 L0.0,90 Z"
                      fill="url(#phoneGrad)"
                    />
                    <path
                      d="M0.0,73.5 L11.6,56.5 L23.2,62.7 L34.7,50.4 L46.3,64.6 L57.9,47.8 L69.5,58.6 L81.1,63.0 L92.6,73.1 L104.2,87.7 L115.8,78.1 L127.4,71.5 L138.9,76.8 L150.5,68.4 L162.1,59.5 L173.7,49.5 L185.3,59.6 L196.8,70.2 L208.4,78.3 L220.0,68.1"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="phone-chips">
                    <div className="chip up">
                      <div className="v">+0.20%</div>
                      <div className="l">Today</div>
                    </div>
                    <div className="chip">
                      <div className="v">20%</div>
                      <div className="l">Win rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how">
        <div className="wrap">
          <div className="eyebrow">Simple Process</div>
          <h2>How It Works</h2>
          <p className="how-sub">
            Get started with Sigmora in three simple steps and begin your journey to trading success.
          </p>
          <div className="step-grid">
            <div className="step-card">
              <span className="step-bignum">01</span>
              <span className="step-num">01</span>
              <div className="step-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Create Your Account</h3>
              <p>
                Sign up as a creator or subscriber. Creators can share their trading strategies, while subscribers can
                follow expert traders.
              </p>
            </div>
            <div className="step-card">
              <span className="step-bignum">02</span>
              <span className="step-num">02</span>
              <div className="step-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
                </svg>
              </div>
              <h3>Choose Your Package</h3>
              <p>
                Browse through available subscription packages. Select the one that matches your trading goals and
                budget.
              </p>
            </div>
            <div className="step-card">
              <span className="step-bignum">03</span>
              <span className="step-num">03</span>
              <div className="step-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3>Start Trading</h3>
              <p>
                Follow expert traders in real-time, receive instant notifications, and track your performance with
                advanced analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="traders">
        <div className="wrap">
          <div className="eyebrow">Top Performers</div>
          <h2>
            Investors Worth Watching:
            <span className="line2 accent">Trade like the Pros</span>
          </h2>
          <div className="trader-grid">
            {TRADERS.map((t) => (
              <div className="trader-card" key={t.name}>
                <img src={t.image} alt={t.name} />
                <div className="trader-body">
                  <div className="trader-name">
                    {t.name} <span className="verified">✓</span>
                  </div>
                  <div className="trader-desc">{t.desc}</div>
                  <div className="trader-stats">
                    <div className="trader-stat">
                      <div className="num">{t.ret}</div>
                      <div className="lbl">NVDA Return</div>
                    </div>
                    <div className="trader-stat">
                      <div className="num">{t.win}</div>
                      <div className="lbl">Win Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="markets">
        <div className="wrap">
          <div className="markets-head">
            <h2>
              Global Markets: <span className="accent">Performance at a Glance</span>
            </h2>
            <p>Track the best-performing assets in real time, benchmarked against the moving economy around them.</p>
          </div>
          <div className="markets-board">
            <div className="board-grid">
              <div className="board-card">
                <h4>
                  Market <span className="live">LIVE</span>
                </h4>
                <div className="mkt-row">
                  <div className="mkt-avatar" style={{ background: 'rgba(168, 85, 247,0.15)', color: '#a855f7' }}>
                    NV
                  </div>
                  <div className="mkt-info">
                    <div className="mkt-name">NVDA</div>
                    <div className="mkt-sub">Semiconductors</div>
                  </div>
                  <svg className="mkt-spark" width="60" height="24" viewBox="0 0 72 28">
                    <path
                      d="M0.0,16.2 L8.0,9.9 L16.0,7.0 L24.0,3.4 L32.0,7.0 L40.0,9.7 L48.0,15.5 L56.0,10.0 L64.0,9.2 L72.0,2.9"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="mkt-price">
                    <div className="p">$374.20</div>
                    <div className="c up">+3.28%</div>
                  </div>
                </div>
                <div className="mkt-row">
                  <div className="mkt-avatar" style={{ background: 'rgba(232,184,75,0.15)', color: '#e8b84b' }}>
                    AD
                  </div>
                  <div className="mkt-info">
                    <div className="mkt-name">ADBE</div>
                    <div className="mkt-sub">Software</div>
                  </div>
                  <svg className="mkt-spark" width="60" height="24" viewBox="0 0 72 28">
                    <path
                      d="M0.0,13.0 L8.0,13.9 L16.0,19.2 L24.0,15.0 L32.0,11.4 L40.0,5.1 L48.0,2.8 L56.0,2.8 L64.0,2.8 L72.0,3.3"
                      fill="none"
                      stroke="#e8b84b"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="mkt-price">
                    <div className="p">$312.20</div>
                    <div className="c up">+1.85%</div>
                  </div>
                </div>
                <div className="mkt-row">
                  <div className="mkt-avatar" style={{ background: 'rgba(226,86,79,0.15)', color: '#e2564f' }}>
                    AS
                  </div>
                  <div className="mkt-info">
                    <div className="mkt-name">ASBN</div>
                    <div className="mkt-sub">Financials</div>
                  </div>
                  <svg className="mkt-spark" width="60" height="24" viewBox="0 0 72 28">
                    <path
                      d="M0.0,8.7 L8.0,12.7 L16.0,8.9 L24.0,9.6 L32.0,13.2 L40.0,18.5 L48.0,19.1 L56.0,20.2 L64.0,14.7 L72.0,15.0"
                      fill="none"
                      stroke="#e2564f"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="mkt-price">
                    <div className="p">$350.00</div>
                    <div className="c down">-1.32%</div>
                  </div>
                </div>
              </div>
              <div className="board-card">
                <h4>Sector Heatmap</h4>
                <div className="heatmap">
                  <div
                    className="heat-cell"
                    style={{ background: 'rgba(168, 85, 247,0.55)', gridColumn: 'span 2', gridRow: 'span 2' }}
                  >
                    TECH<span className="pct">+4.1%</span>
                  </div>
                  <div className="heat-cell" style={{ background: 'rgba(168, 85, 247,0.3)' }}>
                    NRG<span className="pct">+2.0%</span>
                  </div>
                  <div className="heat-cell" style={{ background: 'rgba(226,86,79,0.3)' }}>
                    RE<span className="pct">-0.8%</span>
                  </div>
                  <div className="heat-cell" style={{ background: 'rgba(226,86,79,0.55)', gridColumn: 'span 2' }}>
                    FIN<span className="pct">-3.4%</span>
                  </div>
                  <div className="heat-cell" style={{ background: 'rgba(168, 85, 247,0.4)' }}>
                    HLTH<span className="pct">+1.7%</span>
                  </div>
                  <div className="heat-cell" style={{ background: 'rgba(168, 85, 247,0.2)' }}>
                    UTIL<span className="pct">+0.6%</span>
                  </div>
                  <div className="heat-cell" style={{ background: 'rgba(226,86,79,0.2)' }}>
                    MAT<span className="pct">-0.3%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="board-grid" style={{ marginBottom: 0 }}>
              <div className="board-card">
                <h4>Regional Activity</h4>
                {[
                  ['Americas', '42%'],
                  ['Europe', '27%'],
                  ['Asia-Pacific', '23%'],
                  ['MENA', '8%'],
                ].map(([name, val]) => (
                  <div className="region-row" key={name}>
                    <div className="region-top">
                      <span className="name">{name}</span>
                      <span className="val">{val}</span>
                    </div>
                    <div className="region-bar">
                      <div className="region-fill" style={{ width: val }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="board-card">
                <h4>Live Feed</h4>
                <div className="feed-row">
                  <span className="feed-time">2m</span>
                  <span className="feed-text">
                    <b>NVDA</b> broke above 30-day resistance
                  </span>
                </div>
                <div className="feed-row">
                  <span className="feed-time">14m</span>
                  <span className="feed-text">
                    <b>ECB</b> holds rates steady
                  </span>
                </div>
                <div className="feed-row">
                  <span className="feed-time">41m</span>
                  <span className="feed-text">
                    <b>BTC</b> volatility index up 12%
                  </span>
                </div>
                <div className="feed-row">
                  <span className="feed-time">1h</span>
                  <span className="feed-text">
                    <b>ASBN</b> downgraded to Hold
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why">
        <div className="wrap">
          <h2>
            Why Choose <span className="accent">Sigmora?</span>
          </h2>
          <p className="why-sub">
            Experience the future of forex trading management with cutting-edge technology and professional-grade tools
            designed for serious traders.
          </p>
          <div className="why-grid">
            {WHY.map((w) => (
              <div className="why-card" key={w.title}>
                <div className="why-icon">{w.icon}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="wrap">
          <div className="features-head">
            <h2>
              Everything You Need to <span className="accent">Succeed</span>
            </h2>
            <p>From the first signal to your best trade yet — all in one platform built around how you actually work.</p>
          </div>

          <div className="feature-row">
            <div className="feature-text">
              <div className="feature-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <h3>Expert Trading Signals</h3>
              <p>Real-time signals generated and verified by top-performing traders, delivered the moment they matter.</p>
            </div>
            <div className="feature-media">
              <div className="mini-phone">
                <div className="scr">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 700 }}>SIGNALS</span>
                    <span style={{ fontSize: 9, color: 'var(--accent)', fontWeight: 700 }}>● LIVE</span>
                  </div>
                  <svg viewBox="0 0 180 64" width="100%" height="56" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="sigGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0.0,38.8 L12.0,40.6 L24.0,46.6 L36.0,40.4 L48.0,42.7 L60.0,50.3 L72.0,58.3 L84.0,50.1 L96.0,52.4 L108.0,53.8 L120.0,52.8 L132.0,60.2 L144.0,59.6 L156.0,57.3 L168.0,60.2 L180.0,60.2 L180.0,64 L0.0,64 Z"
                      fill="url(#sigGrad)"
                    />
                    <path
                      d="M0.0,38.8 L12.0,40.6 L24.0,46.6 L36.0,40.4 L48.0,42.7 L60.0,50.3 L72.0,58.3 L84.0,50.1 L96.0,52.4 L108.0,53.8 L120.0,52.8 L132.0,60.2 L144.0,59.6 L156.0,57.3 L168.0,60.2 L180.0,60.2"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'rgba(168, 85, 247,0.1)',
                      borderRadius: 6,
                      padding: '6px 8px',
                      marginTop: 8,
                    }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 700 }}>NVDA</span>
                    <span style={{ fontSize: 9, color: 'var(--accent)', fontWeight: 700 }}>BUY 92%</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'rgba(226,86,79,0.1)',
                      borderRadius: 6,
                      padding: '6px 8px',
                      marginTop: 6,
                    }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 700 }}>ASBN</span>
                    <span style={{ fontSize: 9, color: 'var(--red)', fontWeight: 700 }}>SELL 74%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-row reverse">
            <div className="feature-text">
              <div className="feature-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <h3>Market Education</h3>
              <p>Learn how to read the markets properly, with structured lessons built by working traders, not theorists.</p>
            </div>
            <div className="feature-media">
              <div className="mini-tablet">
                <div className="scr">
                  <div style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 700, marginBottom: 10 }}>
                    YOUR COURSES
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {[
                      ['Risk Management', '80%'],
                      ['Chart Patterns', '45%'],
                      ['Options Basics', '60%'],
                      ['Macro 101', '25%'],
                    ].map(([lbl, w]) => (
                      <div className="course-card" key={lbl}>
                        <div className="lbl">{lbl}</div>
                        <div className="bar">
                          <i style={{ width: w }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-row">
            <div className="feature-text">
              <div className="feature-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3>Expert Knowledge</h3>
              <p>Deep-dive breakdowns of market moves, so every trade decision is grounded in something real.</p>
            </div>
            <div className="feature-media">
              <div className="coin-stack">
                <div className="coin c1">$</div>
                <div className="coin c2">$</div>
                <div className="coin c3">$</div>
                <div className="coin-chip">
                  <div className="v">+18.4%</div>
                  <div className="l">This quarter</div>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-row reverse">
            <div className="feature-text">
              <div className="feature-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                  <path d="M22 12A10 10 0 0 0 12 2v10z" />
                </svg>
              </div>
              <h3>Sigmora Insight</h3>
              <p>Sigmora is your partner in confident, data-backed trading — built to fit the way real portfolios move.</p>
            </div>
            <div className="feature-media">
              <div className="ring-card">
                <svg width="110" height="110" viewBox="0 0 110 110">
                  <circle cx="55" cy="55" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />
                  <circle
                    cx="55"
                    cy="55"
                    r="42"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="14"
                    strokeDasharray="264"
                    strokeDashoffset="0"
                    transform="rotate(-90 55 55)"
                  />
                  <circle
                    cx="55"
                    cy="55"
                    r="42"
                    fill="none"
                    stroke="#e8b84b"
                    strokeWidth="14"
                    strokeDasharray="264"
                    strokeDashoffset="-105"
                    transform="rotate(-90 55 55)"
                  />
                  <circle
                    cx="55"
                    cy="55"
                    r="42"
                    fill="none"
                    stroke="#d946ef"
                    strokeWidth="14"
                    strokeDasharray="264"
                    strokeDashoffset="-185"
                    transform="rotate(-90 55 55)"
                  />
                  <text
                    x="55"
                    y="52"
                    textAnchor="middle"
                    fill="#eef2f0"
                    fontSize="16"
                    fontWeight="700"
                    fontFamily="Space Grotesk"
                  >
                    62%
                  </text>
                  <text x="55" y="67" textAnchor="middle" fill="#5f6d67" fontSize="8">
                    Equities
                  </text>
                </svg>
                <div className="ring-legend">
                  <div className="item">
                    <span className="sw" style={{ background: '#a855f7' }} />
                    Equities · 62%
                  </div>
                  <div className="item">
                    <span className="sw" style={{ background: '#e8b84b' }} />
                    Commodities · 24%
                  </div>
                  <div className="item">
                    <span className="sw" style={{ background: '#d946ef' }} />
                    FX · 14%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <div className="cta-panel">
            <div className="cta-text">
              <h2>
                Ready to Transform
                <br />
                Your Trading?
              </h2>
              <p>
                Join thousands of successful traders on Sigmora today and start your journey to trading excellence.
                Experience the difference that professional-grade tools and expert guidance can make.
              </p>
              <div className="cta-actions">
                <Link to="/register" className="btn btn-primary">
                  Start Trading →
                </Link>
                <Link to="/faq" className="link-underline">
                  View FAQ
                </Link>
              </div>
            </div>
            <div className="cta-visual">
              <div className="cta-phone">
                <div className="phone-frame">
                  <div className="phone-screen">
                    <div className="phone-notch" />
                    <div className="phone-balance-lbl">Portfolio value</div>
                    <div className="phone-balance">$22,223.74</div>
                    <svg
                      viewBox="0 0 200 110"
                      width="100%"
                      height="86"
                      preserveAspectRatio="none"
                      style={{ marginTop: 8 }}
                    >
                      <defs>
                        <linearGradient id="ctaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0.0,69.3 L9.5,74.4 L19.0,87.9 L28.6,76.2 L38.1,60.3 L47.6,69.4 L57.1,62.3 L66.7,56.5 L76.2,65.3 L85.7,53.3 L95.2,65.2 L104.8,63.3 L114.3,47.6 L123.8,59.8 L133.3,60.6 L142.9,45.1 L152.4,54.7 L161.9,62.2 L171.4,68.5 L181.0,72.1 L190.5,86.8 L200.0,69.1 L200.0,110 L0.0,110 Z"
                        fill="url(#ctaGrad)"
                      />
                      <path
                        d="M0.0,69.3 L9.5,74.4 L19.0,87.9 L28.6,76.2 L38.1,60.3 L47.6,69.4 L57.1,62.3 L66.7,56.5 L76.2,65.3 L85.7,53.3 L95.2,65.2 L104.8,63.3 L114.3,47.6 L123.8,59.8 L133.3,60.6 L142.9,45.1 L152.4,54.7 L161.9,62.2 L171.4,68.5 L181.0,72.1 L190.5,86.8 L200.0,69.1"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="phone-chips">
                      <div className="chip up">
                        <div className="v">+2.4%</div>
                        <div className="l">24h</div>
                      </div>
                      <div className="chip">
                        <div className="v">96%</div>
                        <div className="l">Accuracy</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer landing />
    </div>
  );
};

export default Home;
