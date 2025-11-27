import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useTheme } from '../../context/ThemeContext';
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
import './About.css';

const About = () => {
  const { theme } = useTheme();

  const values = [
    {
      Icon: TargetIcon,
      title: 'Excellence',
      desc: 'We strive for perfection in every feature and interaction, ensuring our platform meets the highest standards of quality and performance.',
      color: theme.colors.secondary,
    },
    {
      Icon: ShieldIcon,
      title: 'Transparency',
      desc: 'Open, honest communication builds trust and success. We believe in complete transparency in all our operations and trading activities.',
      color: theme.colors.success,
    },
    {
      Icon: ZapIcon,
      title: 'Innovation',
      desc: 'Constantly evolving to meet trader needs and market demands. We leverage cutting-edge technology to stay ahead of the curve.',
      color: theme.colors.secondary,
    },
    {
      Icon: DiamondIcon,
      title: 'Integrity',
      desc: 'Ethical practices and reliable service are our foundation. We operate with the highest level of integrity in everything we do.',
      color: theme.colors.secondary,
    },
  ];

  const features = [
    {
      Icon: ChartIcon,
      title: 'Advanced Analytics',
      desc: 'Real-time market analysis and comprehensive trading insights to help you make informed decisions.',
    },
    {
      Icon: UsersIcon,
      title: 'Expert Community',
      desc: 'Connect with professional traders and learn from the best in the industry.',
    },
    {
      Icon: ActivityIcon,
      title: 'Real-Time Updates',
      desc: 'Get instant notifications and live updates on market movements and trading opportunities.',
    },
    {
      Icon: TrendingUpIcon,
      title: 'Proven Strategies',
      desc: 'Access tested trading strategies from successful traders with verified track records.',
    },
  ];

  return (
    <div className="about-page" style={{ background: theme.colors.background }}>
      <Navbar />
      
      {/* Hero Section - Redesigned */}
      <section className="about-hero-redesigned">
        <div className="hero-background-about-new">
          <div className="hero-gradient-about-1"></div>
          <div className="hero-gradient-about-2"></div>
        </div>
        <div className="container-about-hero">
          <motion.div
            className="hero-text-about"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="hero-badge-about"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                background: `${theme.colors.secondary}15`,
                color: theme.colors.secondary,
                border: `1px solid ${theme.colors.secondary}30`,
              }}
            >
              <TargetIcon size={16} color={theme.colors.secondary} />
              Trusted by 10,000+ Traders
            </motion.span>
            <h1 style={{ color: theme.colors.text }}>
              Empowering Traders, <span style={{ color: theme.colors.secondary }}>Transforming Markets</span>
            </h1>
            <p className="hero-lead-about" style={{ color: theme.colors.textSecondary }}>
              We're building the future of professional forex trading, connecting expert creators with ambitious subscribers in a seamless, transparent ecosystem.
            </p>
            <div className="hero-stats-preview-about">
              {[
                { number: '10K+', label: 'Active Users', Icon: UsersIcon },
                { number: '500+', label: 'Expert Creators', Icon: TargetIcon },
                { number: '98%', label: 'Success Rate', Icon: TrendingUpIcon },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="stat-preview-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  style={{
                    background: theme.colors.card,
                    border: `1px solid ${theme.colors.border}`,
                  }}
                >
                  <stat.Icon size={24} color={theme.colors.secondary} />
                  <div>
                    <div className="stat-number" style={{ color: theme.colors.text }}>{stat.number}</div>
                    <div className="stat-label" style={{ color: theme.colors.textSecondary }}>{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story-modern" style={{ background: theme.colors.backgroundSecondary }}>
        <div className="container-about">
          <div className="story-content-modern">
            <motion.div
              className="story-text-modern"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 style={{ color: theme.colors.text }}>Our Story</h2>
              <div className="story-paragraphs" style={{ color: theme.colors.textSecondary }}>
                <p>
                  Founded in 2024, Sigmora emerged from a vision to democratize professional forex trading.
                  We recognized that successful trading requires more than just market knowledge—it demands
                  access to expert strategies, real-time insights, and a community of dedicated professionals.
                </p>
                <p>
                  Our platform bridges the gap between aspiring traders and seasoned experts, creating an
                  ecosystem where knowledge flows freely, strategies are shared transparently, and success
                  is achieved collectively. We believe that everyone deserves access to professional-grade
                  trading tools and expert guidance.
                </p>
                <p>
                  Today, Sigmora serves thousands of traders across 50+ countries, providing them with the
                  tools, insights, and community support needed to succeed in the competitive world of forex trading.
                  Our commitment to innovation and excellence drives us to continuously improve and expand our platform.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="story-image-modern"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <FloatingCard>
                <div
                  className="image-container-modern"
                  style={{
                    background: theme.colors.card,
                    border: `1px solid ${theme.colors.border}`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop"
                    alt="Trading Analytics"
                    className="about-image"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </FloatingCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission-modern" style={{ background: theme.colors.background }}>
        <div className="container-about">
          <motion.div
            className="mission-content-modern"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{ color: theme.colors.text }}>Our Mission</h2>
            <p style={{ color: theme.colors.textSecondary }}>
              To empower traders worldwide by providing cutting-edge tools, expert guidance, and a
              transparent platform that fosters growth, learning, and financial success in the
              dynamic world of forex trading. We're committed to making professional trading accessible
              to everyone, regardless of their experience level.
            </p>
          </motion.div>

          <div className="values-grid-modern">
            {values.map((value, i) => (
              <FloatingCard key={i} delay={i * 0.1}>
                <motion.div
                  className="value-card-modern"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  style={{
                    background: theme.colors.card,
                    border: `1px solid ${theme.colors.border}`,
                  }}
                >
                  <div
                    className="value-icon-modern"
                    style={{
                      background: `${value.color}15`,
                      color: value.color,
                    }}
                  >
                    <value.Icon size={32} color={value.color} />
                  </div>
                  <h3 style={{ color: theme.colors.text }}>{value.title}</h3>
                  <p style={{ color: theme.colors.textSecondary }}>{value.desc}</p>
                </motion.div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-features-modern" style={{ background: theme.colors.backgroundSecondary }}>
        <div className="container-about">
          <motion.div
            className="section-header-about"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ color: theme.colors.text }}>What Makes Us Different</h2>
            <p style={{ color: theme.colors.textSecondary }}>
              Discover the features and capabilities that set Sigmora apart from other trading platforms
            </p>
          </motion.div>

          <div className="features-grid-about">
            {features.map((feature, i) => (
              <FloatingCard key={i} delay={i * 0.1}>
                <motion.div
                  className="feature-card-about"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  style={{
                    background: theme.colors.card,
                    border: `1px solid ${theme.colors.border}`,
                  }}
                >
                  <div
                    className="feature-icon-about"
                    style={{
                      background: `${theme.colors.secondary}15`,
                      color: theme.colors.secondary,
                    }}
                  >
                    <feature.Icon size={28} color={theme.colors.secondary} />
                  </div>
                  <h3 style={{ color: theme.colors.text }}>{feature.title}</h3>
                  <p style={{ color: theme.colors.textSecondary }}>{feature.desc}</p>
                </motion.div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats-modern" style={{ background: theme.colors.background }}>
        <div className="container-about">
          <motion.div
            className="stats-header-about"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ color: theme.colors.text }}>Our Impact</h2>
            <p style={{ color: theme.colors.textSecondary }}>
              Numbers that reflect our commitment to excellence and trader success
            </p>
          </motion.div>

          <div className="stats-grid-about">
            {[
              { number: '10,000+', label: 'Active Traders', Icon: UsersIcon },
              { number: '500+', label: 'Expert Creators', Icon: TargetIcon },
              { number: '98%', label: 'Success Rate', Icon: TrendingUpIcon },
              { number: '24/7', label: 'Support', Icon: ActivityIcon },
              { number: '50+', label: 'Countries', Icon: ChartIcon },
            ].map((stat, i) => (
              <FloatingCard key={i} delay={i * 0.1}>
                <motion.div
                  className="stat-card-about"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  style={{
                    background: theme.colors.card,
                    border: `1px solid ${theme.colors.border}`,
                  }}
                >
                  <div
                    className="stat-icon-about"
                    style={{
                      background: `${theme.colors.secondary}15`,
                      color: theme.colors.secondary,
                    }}
                  >
                    <stat.Icon size={32} color={theme.colors.secondary} />
                  </div>
                  <div className="stat-number-large" style={{ color: theme.colors.text }}>{stat.number}</div>
                  <div className="stat-label-large" style={{ color: theme.colors.textSecondary }}>{stat.label}</div>
                </motion.div>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-modern" style={{ background: theme.colors.backgroundSecondary }}>
        <div className="container-about">
          <motion.div
            className="cta-content-about"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: theme.colors.card,
              border: `1px solid ${theme.colors.border}`,
            }}
          >
            <h2 style={{ color: theme.colors.text }}>Ready to Start Your Trading Journey?</h2>
            <p style={{ color: theme.colors.textSecondary }}>
              Join thousands of successful traders on Sigmora and experience the difference that
              professional-grade tools and expert guidance can make.
            </p>
            <Link
              to="/register/creator"
              className="btn-cta-about"
              style={{
                background: theme.colors.secondary,
                color: theme.colors.primary,
              }}
            >
              <span>Get Started Today</span>
              <ArrowRightIcon size={20} color={theme.colors.primary} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
