import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import FloatingCard from '../../components/3d/FloatingCards';
import TradingChart from '../../components/charts/TradingChart';
import HeroCandlestickChart from '../../components/charts/HeroCandlestickChart';
import {
  ChartIcon,
  TargetIcon,
  ShieldIcon,
  ZapIcon,
  PackageIcon,
  UsersIcon,
  DiamondIcon,
  TrendingUpIcon,
  ActivityIcon,
  ArrowRightIcon,
  BarChartIcon,
  CheckIcon,
} from '../../components/icons/Icons';
import '../../styles/landing-tokens.css';
import './Home.css';

const HeroWaveDivider = () => (
  <div className="section-divider section-divider-wave" aria-hidden="true">
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
        fill="var(--bg-secondary)"
      />
    </svg>
  </div>
);

const FEATURE_ACCENTS = ['gold', 'teal', 'purple', 'coral', 'blue', 'gold'];

const getChartHeight = () => {
  if (typeof window === 'undefined') return 650;
  const w = window.innerWidth;
  if (w < 480) return 300;
  if (w < 768) return 380;
  if (w < 1100) return 480;
  return 650;
};

const CREATOR_PERKS = [
  'Private academy invite codes',
  'Subscriber & package management',
  'Real-time trade publishing',
  'Asset-level pip & margin control',
];

const Home = () => {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [chartHeight, setChartHeight] = useState(getChartHeight);
  const [academyCode, setAcademyCode] = useState('');

  useEffect(() => {
    const onResize = () => setChartHeight(getChartHeight());
    onResize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
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

  const features = [
    {
      Icon: ChartIcon,
      title: 'Real-Time Analytics',
      description: 'Advanced analytics and insights to track your trading performance with precision and clarity. Monitor your portfolio in real-time with comprehensive dashboards.',
    },
    {
      Icon: TargetIcon,
      title: 'Expert Strategies',
      description: 'Follow proven trading strategies from professional forex experts with years of market experience. Learn from the best and replicate their success.',
    },
    {
      Icon: ShieldIcon,
      title: 'Bank-Level Security',
      description: 'Enterprise-grade security with end-to-end encryption to protect your data and trading information. Your privacy and security are our top priorities.',
    },
    {
      Icon: ZapIcon,
      title: 'Lightning Fast Execution',
      description: 'Ultra-low latency execution with sub-millisecond response times for optimal trading performance. Never miss an opportunity with instant trade execution.',
    },
    {
      Icon: ActivityIcon,
      title: 'Multi-Platform Access',
      description: 'Access your trades seamlessly from desktop, mobile, or tablet with full feature parity. Trade on the go with our responsive design.',
    },
    {
      Icon: DiamondIcon,
      title: 'Premium Support',
      description: '24/7 dedicated support from our expert team of trading professionals and technical specialists. Get help when you need it most.',
    },
  ];

  const benefits = [
    {
      title: 'Follow Expert Traders',
      description: 'Connect with professional traders and copy their proven strategies in real-time.',
      icon: UsersIcon,
    },
    {
      title: 'Real-Time Notifications',
      description: 'Get instant alerts when your followed traders open or close positions.',
      icon: ActivityIcon,
    },
    {
      title: 'Risk Management Tools',
      description: 'Built-in risk management features to protect your capital and maximize returns.',
      icon: ShieldIcon,
    },
    {
      title: 'Performance Tracking',
      description: 'Comprehensive analytics to track your trading performance and identify areas for improvement.',
      icon: BarChartIcon,
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Active Traders', icon: UsersIcon },
    { number: '500+', label: 'Expert Creators', icon: TargetIcon },
    { number: '98%', label: 'Success Rate', icon: TrendingUpIcon },
    { number: '24/7', label: 'Support', icon: ActivityIcon },
    { number: '50+', label: 'Countries', icon: ChartIcon },
    { number: '99.9%', label: 'Uptime', icon: ShieldIcon },
  ];

  return (
    <div className="home-page landing-premium">
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <Navbar landing />

      {/* Professional & Futuristic Hero Section */}
      <section className="hero-section-modern section-bg-odd">
        <div className="hero-bg-modern">
          <div className="hero-gradient-orb orb-modern-1" />
          <div className="hero-gradient-orb orb-modern-2" />
          <div className="hero-grid-modern" />
        </div>

        <div className="hero-container-modern">
          <motion.div
            className="hero-content-modern"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="hero-title-modern hero-title-compact"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="title-line-1">Institutional Grade</span>
              <span className="title-line-2">
                <span className="gradient-modern">Signals</span>
              </span>
            </motion.h1>

            <motion.p
              className="hero-tagline-modern"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
            >
              Master the markets with elite signal providers.
            </motion.p>

            <motion.p
              className="hero-subtitle-modern"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Connect with verified trading creators. Access real-time trade signals, institutional
              risk management, and structured learning paths.
            </motion.p>

            <motion.form
              className="hero-academy-form"
              onSubmit={handleJoinAcademy}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.8 }}
            >
              <input
                type="text"
                value={academyCode}
                onChange={(e) => setAcademyCode(e.target.value.toUpperCase())}
                placeholder="Enter Academy Code (e.g. TRD782)"
                maxLength={6}
                className="hero-academy-input"
                aria-label="Academy code"
              />
              <button type="submit" className="btn-modern-primary hero-academy-btn">
                Join Academy
              </button>
            </motion.form>

            <motion.p
              className="hero-creator-link"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
            >
              Or{' '}
              <Link to="/register?role=creator">
                register as a creator
                <ArrowRightIcon size={14} color="currentColor" />
              </Link>
            </motion.p>

            <motion.div
              className="hero-cta-modern"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Link to="/register" className="btn-modern-primary">
                <span>Start Trading</span>
                <ArrowRightIcon size={18} color="currentColor" />
              </Link>
            </motion.div>

          </motion.div>

          <motion.div
            className="hero-visual-modern"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <div className="visual-panel-modern">
              <div className="hero-chart-card">
                <div className="hero-chart-topbar">
                  <div className="hero-chart-ticker">
                    <span className="ticker-symbol">EUR/USD</span>
                    <span className="exchange-badge">FOREX</span>
                  </div>
                  <div className="hero-chart-change">+4.85%</div>
                </div>
                <HeroCandlestickChart />
                <div className="hero-chart-metrics">
                  <div className="hero-chart-traders-pill">
                    <span className="traders-value">2.4K</span>
                    <span className="traders-label">Traders</span>
                  </div>
                  <div className="hero-chart-win-badge" aria-label="98 percent win rate">
                    <span className="win-badge-value">98%</span>
                    <span className="win-badge-label">Win rate</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <HeroWaveDivider />

      {/* For Creators */}
      <section className="creators-section section-bg-even">
        <div className="section-container creators-split">
          <motion.div
            className="creators-copy"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-eyebrow">For Creators</span>
            <h2 className="section-title section-title-left">
              Are you a creator? <span className="gradient-modern">Control your destiny.</span>
            </h2>
            <p className="creators-lead">
              Set up your academy in minutes. Publish trades, define packages, and share your invite
              code — payments stay between you and your subscribers.
            </p>
            <ul className="creators-perks">
              {CREATOR_PERKS.map((perk) => (
                <li key={perk}>
                  <CheckIcon size={18} color="currentColor" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
            <Link to="/register?role=creator" className="btn-modern-primary creators-cta">
              <span>Launch your academy</span>
              <ArrowRightIcon size={18} color="currentColor" />
            </Link>
          </motion.div>
          <motion.div
            className="creators-panel"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <FloatingCard>
              <div className="creators-panel-inner">
                <div className="creators-panel-icon">
                  <PackageIcon size={28} color="currentColor" />
                </div>
                <h3>Your academy, your rules</h3>
                <p>
                  Build a private community around your strategy. Manage subscribers, publish signals,
                  and grow on your terms.
                </p>
              </div>
            </FloatingCard>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works section-bg-even">
        <motion.div
          className="section-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-header">
            <span className="section-eyebrow">Simple Process</span>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Get started with Sigmora in three simple steps and begin your journey to trading success
            </p>
          </div>

          <div className="steps-container">
            <div className="steps-connector" aria-hidden="true" />
            {[
              {
                step: '01',
                title: 'Create Your Account',
                description: 'Sign up as a creator or subscriber. Creators can share their trading strategies, while subscribers can follow expert traders.',
                icon: UsersIcon,
              },
              {
                step: '02',
                title: 'Choose Your Package',
                description: 'Browse through available subscription packages. Select the one that matches your trading goals and budget.',
                icon: PackageIcon,
              },
              {
                step: '03',
                title: 'Start Trading',
                description: 'Follow expert traders in real-time, receive instant notifications, and track your performance with advanced analytics.',
                icon: TrendingUpIcon,
              },
            ].map((step, index) => (
              <FloatingCard key={index} delay={index * 0.2}>
                <motion.div
                  className="step-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -6 }}
                >
                  <span className="step-watermark">{step.step}</span>
                  <div className="step-number-circle">{step.step}</div>
                  <div className="step-icon">
                    <step.icon size={24} />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </motion.div>
              </FloatingCard>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Live Trading Chart Section */}
      <section className="chart-section section-bg-odd">
        <motion.div
          className="section-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-header">
            <div className="chart-section-header-row">
              <div className="chart-gold-accent" aria-hidden="true" />
              <div>
                <div className="section-badge">
                  <ActivityIcon size={16} />
                  <span>Live Data</span>
                </div>
                <h2 className="section-title">Real-Time Market Analysis</h2>
                <p className="section-subtitle">
                  Professional-grade trading charts powered by TradingView. Track EUR/USD, GBP/USD, USD/JPY,
                  and more with advanced technical indicators, drawing tools, and market analysis.
                </p>
              </div>
            </div>
          </div>
          <FloatingCard>
            <div className="chart-wrapper">
              <TradingChart symbol="EURUSD" height={chartHeight} lazy />
            </div>
          </FloatingCard>
        </motion.div>
      </section>

      {/* Features Preview */}
      <section className="features-preview section-bg-even">
        <motion.div
          className="section-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-header">
            <h2 className="section-title">Why Choose Sigmora?</h2>
            <p className="section-subtitle">
              Experience the future of forex trading management with cutting-edge technology
              and professional-grade tools designed for serious traders.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <FloatingCard key={index} delay={index * 0.1}>
                <motion.div
                  className={`feature-card feature-accent-${FEATURE_ACCENTS[index]}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="feature-icon-wrapper">
                    <feature.Icon size={32} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              </FloatingCard>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section section-bg-odd">
        <motion.div
          className="section-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="benefits-content">
            <div className="benefits-text">
              <h2>Everything You Need to Succeed in Forex Trading</h2>
              <p>
                Our comprehensive platform provides all the tools and resources you need to excel
                in the competitive world of forex trading. From expert guidance to advanced analytics,
                we've got you covered.
              </p>
              <div className="benefits-list">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="benefit-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="benefit-icon" aria-hidden="true">
                      <benefit.icon size={22} color="currentColor" />
                    </div>
                    <div>
                      <h4>{benefit.title}</h4>
                      <p>{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link to="/register" className="btn-benefits">
                <span>Start Trading</span>
                <ArrowRightIcon size={20} />
              </Link>
            </div>
            <FloatingCard delay={0.3}>
              <div className="benefits-visual">
                <div className="visual-stats">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="visual-stat"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="visual-stat-icon">
                        <stat.icon size={22} color="currentColor" />
                      </div>
                      <div className="visual-stat-copy">
                        <div className="visual-stat-number">{stat.number}</div>
                        <div className="visual-stat-label">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FloatingCard>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section-bg-even">
        <div className="cta-orb-large" aria-hidden="true" />
        <div className="cta-grid-pattern" aria-hidden="true" />
        <div className="cta-particles" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} className={`cta-particle cta-particle-${i + 1}`} />
          ))}
        </div>
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2>
            Ready to Transform Your{' '}
            <span className="cta-headline-highlight">Trading?</span>
          </h2>
          <p>
            Join thousands of successful traders on Sigmora today and start your journey to trading excellence.
            Experience the difference that professional-grade tools and expert guidance can make.
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="btn-cta">
              <span>Start Trading</span>
              <ArrowRightIcon size={20} color="currentColor" />
            </Link>
            <Link to="/faq" className="btn-cta-secondary">
              View FAQ
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer landing />
    </div>
  );
};

export default Home;
