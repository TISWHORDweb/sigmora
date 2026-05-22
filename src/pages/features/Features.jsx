import { motion } from 'framer-motion';
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
      description: 'Real-time performance tracking with comprehensive analytics and insights.',
      details: ['Real-time P&L tracking', 'Win rate analysis', 'Risk metrics', 'Performance charts'],
    },
    {
      Icon: TargetIcon,
      title: 'Expert Strategies',
      description: 'Follow proven trading strategies from professional forex experts.',
      details: ['Strategy library', 'Backtesting results', 'Risk management', 'Entry/exit signals'],
    },
    {
      Icon: ZapIcon,
      title: 'Lightning Fast Execution',
      description: 'Ultra-low latency for optimal trading performance.',
      details: ['Sub-second execution', 'Real-time updates', 'Instant notifications', 'Live market data'],
    },
    {
      Icon: ShieldIcon,
      title: 'Bank-Level Security',
      description: 'Your data and trading information protected with enterprise security.',
      details: ['256-bit encryption', 'Two-factor authentication', 'Secure sessions', 'Regular audits'],
    },
    {
      Icon: ActivityIcon,
      title: 'Multi-Platform Access',
      description: 'Trade from anywhere, anytime on any device.',
      details: ['Web platform', 'Mobile responsive', 'Desktop app', 'API access'],
    },
    {
      Icon: DiamondIcon,
      title: 'Premium Support',
      description: '24/7 dedicated support from our expert team.',
      details: ['Live chat', 'Email support', 'Video tutorials', 'Community forum'],
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
            <ZapIcon size={16} />
            Platform Features
          </span>
          <h1 className="page-hero-title">
            Powerful Tools for <span className="gradient-modern">Professional Trading</span>
          </h1>
          <p className="page-hero-subtitle">
            A comprehensive suite of tools designed to elevate your trading experience and maximize
            success in the forex market.
          </p>
        </motion.div>
      </section>

      <section className="landing-section section-bg-even">
        <div className="section-container">
          <div className="section-header">
            <span className="section-eyebrow">Capabilities</span>
            <h2 className="section-title">Everything You Need to Trade Smarter</h2>
            <p className="section-subtitle">
              Professional-grade features built for creators and subscribers alike.
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
                  transition={{ delay: index * 0.05 }}
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

      <Footer landing />
    </div>
  );
};

export default Features;
