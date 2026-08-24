'use client';

import { motion } from 'framer-motion';
import { Link } from '../../lib/router';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import FloatingCard from '../../components/3d/FloatingCards';
import {
  TargetIcon,
  ShieldIcon,
  ZapIcon,
  DiamondIcon,
  UsersIcon,
  ChartIcon,
  TrendingUpIcon,
  ActivityIcon,
  ArrowRightIcon,
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

const About = () => {
  const values = [
    {
      Icon: TargetIcon,
      title: 'Excellence',
      desc: 'We strive for perfection in every feature and interaction, ensuring our platform meets the highest standards.',
      accent: '',
    },
    {
      Icon: ShieldIcon,
      title: 'Transparency',
      desc: 'Open, honest communication builds trust. We believe in complete transparency in all trading activities.',
      accent: 'teal',
    },
    {
      Icon: ZapIcon,
      title: 'Innovation',
      desc: 'Constantly evolving to meet trader needs with cutting-edge technology and modern tooling.',
      accent: '',
    },
    {
      Icon: DiamondIcon,
      title: 'Integrity',
      desc: 'Ethical practices and reliable service are our foundation in everything we do.',
      accent: 'purple',
    },
  ];

  const differentiators = [
    {
      Icon: ChartIcon,
      title: 'Advanced Analytics',
      desc: 'Real-time market analysis and comprehensive trading insights for informed decisions.',
    },
    {
      Icon: UsersIcon,
      title: 'Expert Community',
      desc: 'Connect with professional traders and learn from proven industry leaders.',
    },
    {
      Icon: ActivityIcon,
      title: 'Real-Time Updates',
      desc: 'Instant notifications and live updates on market movements and opportunities.',
    },
    {
      Icon: TrendingUpIcon,
      title: 'Proven Strategies',
      desc: 'Access tested strategies from successful traders with verified track records.',
    },
  ];

  return (
    <div className="landing-premium">
      <Navbar landing />

      <section className="page-hero section-bg-odd">
        <PageHeroBg />
        <motion.div
          className="section-container page-hero-inner"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="page-hero-badge">
            <TargetIcon size={16} />
            About Sigmora
          </span>
          <h1 className="page-hero-title">
            Empowering Traders, <span className="gradient-modern">Transforming Markets</span>
          </h1>
          <p className="page-hero-subtitle">
            We connect expert creators with ambitious subscribers in a seamless, transparent
            forex trading ecosystem built for serious traders.
          </p>
        </motion.div>
      </section>

      <section className="landing-section section-bg-even">
        <div className="section-container">
          <div className="mk-stats">
            {[
              { value: '12,000+', label: 'Traders' },
              { value: '96%', label: 'Success Rate' },
              { value: '18+', label: 'Industry Awards' },
              { value: '99.9%', label: 'Uptime' },
            ].map((s) => (
              <div className="mk-stat" key={s.label}>
                <div className="mk-stat-value">{s.value}</div>
                <div className="mk-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section section-bg-even">
        <div className="section-container landing-split">
          <motion.div
            className="landing-prose"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-eyebrow">Our Story</span>
            <h2>Built for the Modern Trader</h2>
            <p>
              Founded in 2024, Sigmora emerged from a vision to democratize professional forex trading.
              We recognized that success requires access to expert strategies, real-time insights, and
              a community of dedicated professionals.
            </p>
            <p>
              Our platform bridges the gap between aspiring traders and seasoned experts—where knowledge
              flows freely, strategies are shared transparently, and growth happens collectively.
            </p>
            <p>
              Today, Sigmora serves 12,000+ traders across 50+ countries with professional-grade tools,
              99.9% uptime, and a community rated 4.9/5 by 2,400+ verified traders.
            </p>
          </motion.div>
          <motion.div
            className="landing-media"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <FloatingCard>
              <img
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop"
                alt="Trading analytics dashboard"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </FloatingCard>
          </motion.div>
        </div>
      </section>

      <section className="landing-section section-bg-odd">
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow">Timeline</span>
            <h2 className="section-title">How Sigmora got here</h2>
            <p className="section-subtitle">
              A short history of the desk — built around creators, academies, and signals that actually ship on time.
            </p>
          </div>
          <div className="mk-timeline">
            {[
              {
                year: '2024',
                title: 'Sigmora is founded',
                desc: 'A small team set out to democratize professional forex: expert strategies, real-time insight, and a community that does not hide its numbers.',
              },
              {
                year: '2024',
                title: 'Academies go live',
                desc: 'Invite codes, packages, and live trade publishing. Payments stay between creator and subscriber — Sigmora runs the rails.',
              },
              {
                year: '2025',
                title: 'Multi-asset tape',
                desc: 'Forex remains the core. Gold, bitcoin, and names like NVDA join the same dashboard with pip-level risk notes.',
              },
              {
                year: 'Now',
                title: '12,000+ traders',
                desc: '96% marked success rate, 18+ industry awards, 99.9% uptime — and a 4.9/5 from 2,400+ verified traders who use the product daily.',
              },
            ].map((item) => (
              <div className="mk-timeline-item" key={item.title}>
                <div className="mk-timeline-year">{item.year}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section section-bg-even">
        <div className="section-container">
          <div className="landing-mission">
            <span className="section-eyebrow">Our Mission</span>
            <h2 className="section-title">Tools, Guidance & Growth</h2>
            <p>
              To empower traders worldwide with cutting-edge tools, expert guidance, and a transparent
              platform that fosters learning and success in forex—accessible to every experience level.
            </p>
          </div>
          <div className="landing-cards-grid cols-4">
            {values.map((value, i) => (
              <FloatingCard key={value.title} delay={i * 0.08}>
                <motion.div
                  className="landing-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                >
                  <div className={`landing-card-icon ${value.accent}`}>
                    <value.Icon size={22} color="currentColor" />
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.desc}</p>
                </motion.div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section section-bg-even">
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow">Platform</span>
            <h2 className="section-title">What Makes Us Different</h2>
            <p className="section-subtitle">
              Features and capabilities that set Sigmora apart from other trading platforms.
            </p>
          </div>
          <div className="landing-cards-grid cols-2">
            {differentiators.map((item, i) => (
              <FloatingCard key={item.title} delay={i * 0.08}>
                <motion.div
                  className="landing-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                >
                  <div className="landing-card-icon">
                    <item.Icon size={22} color="currentColor" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </motion.div>
              </FloatingCard>
            ))}
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
            <Link to="/features" className="mk-related-card">
              <h3>Features</h3>
              <p>Analytics, alerts, security, multi-platform</p>
              <span>
                View <ArrowRightIcon size={14} color="currentColor" />
              </span>
            </Link>
            <Link to="/club" className="mk-related-card">
              <h3>Sigmora Club</h3>
              <p>Verified desks with public win rates</p>
              <span>
                View <ArrowRightIcon size={14} color="currentColor" />
              </span>
            </Link>
            <Link to="/careers" className="mk-related-card">
              <h3>Careers</h3>
              <p>Build the desk traders actually open</p>
              <span>
                View <ArrowRightIcon size={14} color="currentColor" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="landing-cta section-bg-odd">
        <div className="landing-cta-inner">
          <h2>
            Ready to Start Your <span className="gradient-modern">Trading Journey?</span>
          </h2>
          <p>
            Join successful traders on Sigmora and experience professional-grade tools and expert guidance.
          </p>
          <div className="landing-cta-actions">
            <Link to="/register" className="btn-landing-primary">
              Get Started Today
              <ArrowRightIcon size={18} color="currentColor" />
            </Link>
            <Link to="/features" className="btn-landing-secondary">
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      <Footer landing />
    </div>
  );
};

export default About;
