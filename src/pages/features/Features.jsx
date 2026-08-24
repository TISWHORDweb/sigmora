'use client';

import { motion } from 'framer-motion';
import { Link } from '../../lib/router';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import FloatingCard from '../../components/3d/FloatingCards';
import {
  ChartIcon,
  TargetIcon,
  ZapIcon,
  ShieldIcon,
  ActivityIcon,
  DiamondIcon,
  ArrowRightIcon,
  UsersIcon,
} from '../../components/icons/Icons';
import '../../styles/landing-tokens.css';
import '../../styles/landing-page.css';

const PageHeroBg = () => (
  <div className="page-hero-bg" aria-hidden="true">
    <div className="hero-gradient-orb orb-modern-1" />
    <div className="hero-gradient-orb orb-modern-2" />
    <div className="hero-grid-modern" />
  </div>
);

const FEATURE_ACCENTS = ['', 'teal', '', 'teal', '', 'purple'];

const Features = () => {
  const features = [
    {
      Icon: ChartIcon,
      title: 'Advanced Analytics',
      description:
        'Real-time performance tracking with the same precision as the homepage dashboards — P&L, win rate, and risk on one screen.',
      details: ['Real-time P&L tracking', 'Win rate analysis', 'Risk metrics', 'Performance charts'],
    },
    {
      Icon: TargetIcon,
      title: 'Expert Strategies',
      description:
        'Follow proven FX and multi-asset playbooks from verified creators — not anonymous chat tips.',
      details: ['Strategy library', 'Backtesting context', 'Risk management', 'Entry/exit signals'],
    },
    {
      Icon: ZapIcon,
      title: 'Lightning Fast Alerts',
      description:
        'Ultra-low latency so a London open signal arrives while it is still the trade — sub-second notifications, live tape.',
      details: ['Sub-second delivery', 'Real-time updates', 'Instant notifications', 'Live market data'],
    },
    {
      Icon: ShieldIcon,
      title: 'Bank-Level Security',
      description:
        'Enterprise-grade encryption. Hashed passwords. No raw card data on Sigmora servers. Your privacy is a product requirement.',
      details: ['256-bit encryption', 'Two-factor authentication', 'Secure sessions', 'Regular audits'],
    },
    {
      Icon: ActivityIcon,
      title: 'Multi-Platform Access',
      description:
        'Full feature parity on desktop, tablet, and mobile. The academy, the tape, and the alert — same desk everywhere.',
      details: ['Web platform', 'Mobile responsive', 'Desktop-class UI', 'Same data on every device'],
    },
    {
      Icon: DiamondIcon,
      title: 'Premium Support',
      description:
        '24/7 help from trading professionals and technical specialists — not a ticket black hole.',
      details: ['Live chat', 'Email support', 'Video tutorials', 'Help center / FAQ'],
    },
  ];

  return (
    <div className="landing-premium">
      <Navbar landing />

      <section className="page-hero page-hero-wide">
        <PageHeroBg />
        <motion.div
          className="section-container mk-hero"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mk-hero-copy">
            <span className="page-hero-badge">
              <ZapIcon size={16} />
              Platform Features
            </span>
            <h1 className="page-hero-title">
              Everything you need to <span className="gradient-modern">succeed</span>
            </h1>
            <p className="page-hero-subtitle">
              From the first signal to your best trade yet — analytics, alerts, academy, and bank-level
              security in one platform built around how you actually work.
            </p>
            <div className="mk-hero-actions">
              <Link to="/register" className="btn-landing-primary">
                Start Trading →
                <ArrowRightIcon size={16} color="currentColor" />
              </Link>
              <Link to="/signals" className="btn-landing-secondary">
                See a signal card
              </Link>
            </div>
            <p className="mk-hero-trust">★★★★★  4.9/5 from 2,400+ verified traders · 99.9% uptime</p>
          </div>
          <div className="mk-hero-panel">
            <div className="mk-hero-panel-head">
              <span>STACK</span>
              <span className="live">● LIVE</span>
            </div>
            <div className="mk-hero-stats">
              {[
                ['12,000+', 'Traders'],
                ['96%', 'Success rate'],
                ['18+', 'Awards'],
                ['99.9%', 'Uptime'],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="v">{v}</div>
                  <div className="l">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="landing-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow">Capabilities</span>
            <h2 className="section-title">Professional-grade, creator and subscriber</h2>
            <p className="section-subtitle">
              The homepage “Why Sigmora” list — expanded into the product you actually log into.
            </p>
          </div>
          <div className="landing-cards-grid">
            {features.map((feature, index) => (
              <FloatingCard key={feature.title} delay={index * 0.06}>
                <motion.div
                  className="landing-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                >
                  <div className={`landing-card-icon ${FEATURE_ACCENTS[index]}`}>
                    <feature.Icon size={22} color="currentColor" />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <ul>
                    {feature.details.map((detail) => (
                      <li key={detail}>
                        <span>✓</span> {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="section-container landing-split">
          <div className="landing-prose">
            <span className="section-eyebrow">Signals</span>
            <h2>Expert trading signals, the moment they matter</h2>
            <p>
              Real-time setups generated and verified by top-performing traders. Entry, stop, target, and
              the desk that published it — not a caption in a group chat.
            </p>
            <p>
              Lightning-fast execution alerts. You still place the ticket on your own broker. Sigmora is the
              institutional-grade feed.
            </p>
            <Link to="/signals" className="btn-landing-primary" style={{ marginTop: 8 }}>
              How a signal works
              <ArrowRightIcon size={16} color="currentColor" />
            </Link>
          </div>
          <div className="landing-prose">
            <span className="section-eyebrow">Academy</span>
            <h2>Market education from people who still trade</h2>
            <p>
              Risk Management, Chart Patterns, Options Basics, Macro 101 — progress bars, not a PDF dump.
              Curriculum unlocks with the same academy code as the live tape.
            </p>
            <p>Premium support sits next to class: 24/7 when something breaks at session open.</p>
            <Link to="/academy" className="btn-landing-secondary" style={{ marginTop: 8 }}>
              Explore Academy
            </Link>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow">Who it’s for</span>
            <h2 className="section-title">Same platform. Two jobs.</h2>
          </div>
          <div className="mk-compare">
            <div className="mk-compare-col">
              <h3>
                <UsersIcon size={18} color="currentColor" /> Subscribers
              </h3>
              <ul>
                <li>Join with a code or a public package</li>
                <li>Live alerts and completed-trade history</li>
                <li>Analytics on how following a desk actually went</li>
                <li>Execute on your own broker — full control</li>
              </ul>
            </div>
            <div className="mk-compare-col">
              <h3>
                <ZapIcon size={18} color="currentColor" /> Creators
              </h3>
              <ul>
                <li>Invite codes, packages, pip-level publishing</li>
                <li>Subscriber stats and win-rate dashboards</li>
                <li>Payments stay between you and your room</li>
                <li>99.9% uptime so London open never goes dark</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow">Next</span>
            <h2 className="section-title">Keep exploring</h2>
          </div>
          <div className="mk-related">
            <Link to="/signals" className="mk-related-card">
              <h3>Trade signals</h3>
              <p>The card, not the caption</p>
              <span>
                View <ArrowRightIcon size={14} color="currentColor" />
              </span>
            </Link>
            <Link to="/creators" className="mk-related-card">
              <h3>Creator earnings</h3>
              <p>Launch an academy this week</p>
              <span>
                View <ArrowRightIcon size={14} color="currentColor" />
              </span>
            </Link>
            <Link to="/getting-started" className="mk-related-card">
              <h3>Getting started</h3>
              <p>Three steps to a live desk</p>
              <span>
                View <ArrowRightIcon size={14} color="currentColor" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="landing-cta">
        <div className="landing-cta-inner">
          <h2>
            Ready to transform <span className="gradient-modern">your trading?</span>
          </h2>
          <p>
            Join thousands of traders on Sigmora — professional-grade tools and expert guidance, without the
            noise.
          </p>
          <div className="landing-cta-actions">
            <Link to="/register" className="btn-landing-primary">
              Start Trading →
              <ArrowRightIcon size={18} color="currentColor" />
            </Link>
            <Link to="/register?role=creator" className="btn-landing-secondary">
              Register as a creator
            </Link>
          </div>
        </div>
      </section>

      <Footer landing />
    </div>
  );
};

export default Features;
