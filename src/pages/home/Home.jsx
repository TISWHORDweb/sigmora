import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import FloatingCard from '../../components/3d/FloatingCards';
import TradingChart from '../../components/charts/TradingChart';
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
  CheckIcon,
  BarChartIcon,
  CoinsIcon,
} from '../../components/icons/Icons';
import './Home.css';

const Home = () => {
  const { theme, isDark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    {
      Icon: ChartIcon,
      title: 'Real-Time Analytics',
      description: 'Advanced analytics and insights to track your trading performance with precision and clarity. Monitor your portfolio in real-time with comprehensive dashboards.',
      color: theme.colors.secondary,
    },
    {
      Icon: TargetIcon,
      title: 'Expert Strategies',
      description: 'Follow proven trading strategies from professional forex experts with years of market experience. Learn from the best and replicate their success.',
      color: theme.colors.success,
    },
    {
      Icon: ShieldIcon,
      title: 'Bank-Level Security',
      description: 'Enterprise-grade security with end-to-end encryption to protect your data and trading information. Your privacy and security are our top priorities.',
      color: theme.colors.primary,
    },
    {
      Icon: ZapIcon,
      title: 'Lightning Fast Execution',
      description: 'Ultra-low latency execution with sub-millisecond response times for optimal trading performance. Never miss an opportunity with instant trade execution.',
      color: theme.colors.secondary,
    },
    {
      Icon: ActivityIcon,
      title: 'Multi-Platform Access',
      description: 'Access your trades seamlessly from desktop, mobile, or tablet with full feature parity. Trade on the go with our responsive design.',
      color: theme.colors.success,
    },
    {
      Icon: DiamondIcon,
      title: 'Premium Support',
      description: '24/7 dedicated support from our expert team of trading professionals and technical specialists. Get help when you need it most.',
      color: theme.colors.secondary,
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
    <div className="home-page" style={{ background: theme.colors.background }}>
      <Navbar />
      
      {/* Professional & Futuristic Hero Section */}
      <section className={`hero-section-modern ${isDark ? 'hero-dark' : 'hero-light'}`}>
        {/* Futuristic Background */}
        <div className="hero-bg-modern">
          <div className="hero-gradient-orb orb-modern-1"></div>
          <div className="hero-gradient-orb orb-modern-2"></div>
          <div className="hero-grid-modern"></div>
          <div className="hero-scan-line"></div>
        </div>

        <div className="hero-container-modern">
          <motion.div
            className="hero-content-modern"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Modern Badge */}
            <motion.div
              className="hero-badge-modern"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: isDark
                  ? 'rgba(255, 184, 0, 0.1)'
                  : 'rgba(255, 184, 0, 0.08)',
                borderColor: isDark
                  ? 'rgba(255, 184, 0, 0.3)'
                  : 'rgba(255, 184, 0, 0.25)',
                color: theme.colors.text,
              }}
            >
              <div className="badge-indicator" style={{ background: theme.colors.secondary }}></div>
              <TrendingUpIcon size={16} color={theme.colors.secondary} />
              <span>10,000+ Professional Traders</span>
            </motion.div>

            {/* Futuristic Title */}
            <motion.h1
              className="hero-title-modern"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="title-line-1" style={{ color: theme.colors.text }}>
                Master Forex Trading
              </span>
              <span className="title-line-2">
                <span className="gradient-modern">with Excellence</span>
                <span className="title-accent" style={{ color: theme.colors.secondary }}>.</span>
              </span>
            </motion.h1>

            {/* Professional Subtitle */}
            <motion.p
              className="hero-subtitle-modern"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ color: theme.colors.textSecondary }}
            >
              Connect with expert traders, follow proven strategies, and transform your trading journey.
              <br />
              <span style={{ color: theme.colors.text, fontWeight: 500 }}>
                Professional-grade platform trusted by thousands worldwide.
              </span>
            </motion.p>

            {/* Modern CTA Buttons */}
            <motion.div
              className="hero-cta-modern"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to="/register/creator" className="btn-modern-primary">
                <span>Get Started</span>
                <ArrowRightIcon size={18} color="currentColor" />
                <div className="btn-modern-glow"></div>
              </Link>
              <Link
                to="/features"
                className="btn-modern-secondary"
                style={{
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                }}
              >
                <ActivityIcon size={18} color={theme.colors.textSecondary} />
                <span>Learn More</span>
              </Link>
            </motion.div>

            {/* Professional Stats */}
            <motion.div
              className="hero-stats-modern"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {stats.slice(0, 4).map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-modern"
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  style={{
                    background: isDark
                      ? 'rgba(20, 27, 45, 0.6)'
                      : 'rgba(255, 255, 255, 0.8)',
                    border: `1px solid ${theme.colors.border}`,
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <div
                    className="stat-modern-icon"
                    style={{
                      background: `${theme.colors.secondary}15`,
                      color: theme.colors.secondary,
                    }}
                  >
                    <stat.icon size={20} color={theme.colors.secondary} />
                  </div>
                  <div className="stat-modern-content">
                    <div className="stat-modern-number" style={{ color: theme.colors.text }}>
                      {stat.number}
                    </div>
                    <div className="stat-modern-label" style={{ color: theme.colors.textSecondary }}>
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Futuristic Visual Panel */}
          <motion.div
            className="hero-visual-modern"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <div className="visual-panel-modern">
              <div
                className="panel-glass"
                style={{
                  background: isDark
                    ? 'rgba(20, 27, 45, 0.4)'
                    : 'rgba(255, 255, 255, 0.6)',
                  border: `1px solid ${theme.colors.border}`,
                  backdropFilter: 'blur(30px)',
                }}
              >
                <div className="panel-header" style={{ borderBottom: `1px solid ${theme.colors.border}` }}>
                  <div className="panel-title">
                    <div className="panel-dot" style={{ background: theme.colors.success }}></div>
                    <span style={{ color: theme.colors.text }}>EUR/USD</span>
                  </div>
                  <div className="panel-price" style={{ color: theme.colors.success }}>
                    <TrendingUpIcon size={14} color={theme.colors.success} />
                    <span>+0.45%</span>
                  </div>
                </div>
                <div className="panel-chart">
                  {[...Array(25)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="chart-bar-modern"
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.random() * 70 + 15}%` }}
                      transition={{
                        delay: 1 + i * 0.03,
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                      style={{
                        background: `linear-gradient(180deg, ${theme.colors.secondary} 0%, ${theme.colors.success} 100%)`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Metrics */}
              <div className="metrics-float">
                {[
                  { value: '98%', label: 'Win Rate', color: theme.colors.success },
                  { value: '2.4K', label: 'Trades', color: theme.colors.secondary },
                ].map((metric, i) => (
                  <motion.div
                    key={i}
                    className="metric-card"
                    whileHover={{ scale: 1.1, y: -8 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + i * 0.2 }}
                    style={{
                      background: isDark
                        ? 'rgba(20, 27, 45, 0.8)'
                        : 'rgba(255, 255, 255, 0.9)',
                      border: `1px solid ${metric.color}40`,
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <div className="metric-value" style={{ color: metric.color }}>
                      {metric.value}
                    </div>
                    <div className="metric-label" style={{ color: theme.colors.textSecondary }}>
                      {metric.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works" style={{ background: theme.colors.backgroundSecondary }}>
        <motion.div
          className="section-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-header">
            <h2 className="section-title" style={{ color: theme.colors.text }}>
              How It Works
            </h2>
            <p className="section-subtitle" style={{ color: theme.colors.textSecondary }}>
              Get started with Sigmora in three simple steps and begin your journey to trading success
            </p>
          </div>

          <div className="steps-container">
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
                  whileHover={{ y: -10, scale: 1.02 }}
                  style={{
                    background: theme.colors.card,
                    border: `1px solid ${theme.colors.border}`,
                  }}
                >
                  <div className="step-number" style={{ color: theme.colors.secondary }}>
                    {step.step}
                  </div>
                  <div 
                    className="step-icon"
                    style={{ 
                      background: `${theme.colors.secondary}15`,
                      color: theme.colors.secondary,
                    }}
                  >
                    <step.icon size={32} color={theme.colors.secondary} />
                  </div>
                  <h3 style={{ color: theme.colors.text }}>{step.title}</h3>
                  <p style={{ color: theme.colors.textSecondary }}>{step.description}</p>
                </motion.div>
              </FloatingCard>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Live Trading Chart Section */}
      <section className="chart-section" style={{ background: theme.colors.background }}>
        <motion.div
          className="section-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-header">
            <div className="section-badge" style={{ background: `${theme.colors.secondary}15`, color: theme.colors.secondary }}>
              <ActivityIcon size={16} color={theme.colors.secondary} />
              <span>Live Data</span>
            </div>
            <h2 className="section-title" style={{ color: theme.colors.text }}>
              Real-Time Market Analysis
            </h2>
            <p className="section-subtitle" style={{ color: theme.colors.textSecondary }}>
              Professional-grade trading charts powered by TradingView. Track EUR/USD, GBP/USD, USD/JPY,
              and more with advanced technical indicators, drawing tools, and market analysis.
            </p>
          </div>
          <FloatingCard>
            <div className="chart-wrapper">
              <TradingChart symbol="EURUSD" height={650} />
            </div>
          </FloatingCard>
        </motion.div>
      </section>

      {/* Features Preview */}
      <section className="features-preview" style={{ background: theme.colors.backgroundSecondary }}>
        <motion.div
          className="section-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-header">
            <h2 className="section-title" style={{ color: theme.colors.text }}>
              Why Choose Sigmora?
            </h2>
            <p className="section-subtitle" style={{ color: theme.colors.textSecondary }}>
              Experience the future of forex trading management with cutting-edge technology
              and professional-grade tools designed for serious traders.
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <FloatingCard key={index} delay={index * 0.1}>
                <motion.div
                  className="feature-card"
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
                    className="feature-icon-wrapper"
                    style={{ 
                      background: `${feature.color}15`,
                      color: feature.color,
                    }}
                  >
                    <feature.Icon size={36} color={feature.color} />
                  </div>
                  <h3 style={{ color: theme.colors.text }}>{feature.title}</h3>
                  <p style={{ color: theme.colors.textSecondary }}>{feature.description}</p>
                </motion.div>
              </FloatingCard>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section" style={{ background: theme.colors.background }}>
        <motion.div
          className="section-container"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="benefits-content">
            <div className="benefits-text">
              <h2 style={{ color: theme.colors.text }}>
                Everything You Need to Succeed in Forex Trading
              </h2>
              <p style={{ color: theme.colors.textSecondary }}>
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
                    <div 
                      className="benefit-icon"
                      style={{ 
                        background: `${theme.colors.secondary}15`,
                        color: theme.colors.secondary,
                      }}
                    >
                      <benefit.icon size={20} color={theme.colors.secondary} />
                    </div>
                    <div>
                      <h4 style={{ color: theme.colors.text }}>{benefit.title}</h4>
                      <p style={{ color: theme.colors.textSecondary }}>{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link to="/register/creator" className="btn-benefits" style={{ background: theme.colors.secondary, color: theme.colors.primary }}>
                <span>Get Started Today</span>
                <ArrowRightIcon size={20} color={theme.colors.primary} />
              </Link>
            </div>
            <FloatingCard delay={0.3}>
              <div 
                className="benefits-visual"
                style={{
                  background: theme.colors.card,
                  border: `1px solid ${theme.colors.border}`,
                }}
              >
                <div className="visual-stats">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="visual-stat"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <stat.icon size={24} color={theme.colors.secondary} />
                      <div>
                        <div className="visual-stat-number" style={{ color: theme.colors.text }}>
                          {stat.number}
                        </div>
                        <div className="visual-stat-label" style={{ color: theme.colors.textSecondary }}>
                          {stat.label}
                        </div>
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
      <section className="cta-section">
        <div className="cta-background">
          <div className="cta-orb cta-orb-1"></div>
          <div className="cta-orb cta-orb-2"></div>
        </div>
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Transform Your Trading?</h2>
          <p>
            Join thousands of successful traders on Sigmora today and start your journey to trading excellence.
            Experience the difference that professional-grade tools and expert guidance can make.
          </p>
          <div className="cta-buttons">
            <Link to="/register/creator" className="btn-cta">
              <span>Get Started Free</span>
              <ArrowRightIcon size={20} color="currentColor" />
            </Link>
            <Link to="/faq" className="btn-cta-secondary">
              View FAQ
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
