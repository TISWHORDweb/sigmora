import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useTheme } from '../../context/ThemeContext';
import FloatingCard from '../../components/3d/FloatingCards';
import {
  ChartIcon,
  TargetIcon,
  ZapIcon,
  ShieldIcon,
  ActivityIcon,
  DiamondIcon,
} from '../../components/icons/Icons';
import './Features.css';

const Features = () => {
  const { theme } = useTheme();

  const features = [
    {
      Icon: ChartIcon,
      title: 'Advanced Analytics',
      description: 'Real-time performance tracking with comprehensive analytics and insights.',
      details: ['Real-time P&L tracking', 'Win rate analysis', 'Risk metrics', 'Performance charts'],
      color: theme.colors.secondary,
    },
    {
      Icon: TargetIcon,
      title: 'Expert Strategies',
      description: 'Follow proven trading strategies from professional forex experts.',
      details: ['Strategy library', 'Backtesting results', 'Risk management', 'Entry/exit signals'],
      color: theme.colors.success,
    },
    {
      Icon: ZapIcon,
      title: 'Lightning Fast Execution',
      description: 'Ultra-low latency for optimal trading performance.',
      details: ['Sub-second execution', 'Real-time updates', 'Instant notifications', 'Live market data'],
      color: theme.colors.secondary,
    },
    {
      Icon: ShieldIcon,
      title: 'Bank-Level Security',
      description: 'Your data and trading information protected with enterprise security.',
      details: ['256-bit encryption', 'Two-factor authentication', 'Secure sessions', 'Regular audits'],
      color: theme.colors.primary,
    },
    {
      Icon: ActivityIcon,
      title: 'Multi-Platform Access',
      description: 'Trade from anywhere, anytime on any device.',
      details: ['Web platform', 'Mobile responsive', 'Desktop app', 'API access'],
      color: theme.colors.success,
    },
    {
      Icon: DiamondIcon,
      title: 'Premium Support',
      description: '24/7 dedicated support from our expert team.',
      details: ['Live chat', 'Email support', 'Video tutorials', 'Community forum'],
      color: theme.colors.secondary,
    },
  ];

  return (
    <div className="features-page" style={{ background: theme.colors.background }}>
      <Navbar />
      
      {/* Redesigned Hero Section */}
      <section className="features-hero-redesigned">
        <div className="hero-background-features-new">
          <div className="hero-gradient-features-1"></div>
          <div className="hero-gradient-features-2"></div>
        </div>
        <div className="container-features-hero">
          <motion.div
            className="hero-text-features"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="hero-badge-features"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                background: `${theme.colors.secondary}15`,
                color: theme.colors.secondary,
                border: `1px solid ${theme.colors.secondary}30`,
              }}
            >
              <ZapIcon size={16} color={theme.colors.secondary} />
              Advanced Technology
            </motion.span>
            <h1 style={{ color: theme.colors.text }}>
              Powerful Tools for <span style={{ color: theme.colors.secondary }}>Professional Trading</span>
            </h1>
            <p className="hero-lead-features" style={{ color: theme.colors.textSecondary }}>
              Discover the comprehensive suite of tools and features designed to elevate your trading experience
              and maximize your success in the competitive world of forex trading.
            </p>
            <div className="hero-features-preview">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="feature-preview-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  style={{
                    background: theme.colors.card,
                    border: `1px solid ${theme.colors.border}`,
                  }}
                >
                  <div
                    className="feature-preview-icon"
                    style={{
                      background: `${feature.color}15`,
                      color: feature.color,
                    }}
                  >
                    <feature.Icon size={20} color={feature.color} />
                  </div>
                  <span style={{ color: theme.colors.text }}>{feature.title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="features-list-modern" style={{ background: theme.colors.backgroundSecondary }}>
        <div className="container-features">
          {features.map((feature, index) => (
            <FloatingCard key={index} delay={index * 0.1}>
              <motion.div
                className="feature-item-modern"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                style={{
                  background: theme.colors.card,
                  border: `1px solid ${theme.colors.border}`,
                }}
              >
                <div
                  className="feature-icon-large-modern"
                  style={{
                    background: `${feature.color}15`,
                    color: feature.color,
                  }}
                >
                  <feature.Icon size={40} color={feature.color} />
                </div>
                <div className="feature-content-modern">
                  <h2 style={{ color: theme.colors.text }}>{feature.title}</h2>
                  <p className="feature-description-modern" style={{ color: theme.colors.textSecondary }}>
                    {feature.description}
                  </p>
                  <ul className="feature-details-modern">
                    {feature.details.map((detail, i) => (
                      <li key={i} style={{ color: theme.colors.textSecondary }}>
                        <span style={{ color: feature.color }}>✓</span> {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </FloatingCard>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;

