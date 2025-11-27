import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useTheme } from '../../context/ThemeContext';
import FloatingCard from '../../components/3d/FloatingCards';
import { ArrowRightIcon, CheckIcon, ShieldIcon, TargetIcon } from '../../components/icons/Icons';
import './FAQ.css';

const FAQ = () => {
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I create an account on Sigmora?',
          a: 'Creating an account is simple! Click on "Get Started" in the navigation bar, choose whether you want to be a Creator (trading instructor) or Subscriber (follower), fill in your details, and you\'re ready to go. The entire process takes less than 2 minutes.',
        },
        {
          q: 'What is the difference between a Creator and Subscriber?',
          a: 'Creators are professional traders who share their trading strategies and signals with subscribers. Subscribers follow creators, subscribe to their packages, and receive real-time trade notifications. Both roles are essential to our platform ecosystem.',
        },
        {
          q: 'Do I need trading experience to use Sigmora?',
          a: 'Not at all! Sigmora is designed for traders of all experience levels. Subscribers can learn from expert creators, while experienced traders can become creators and share their knowledge. Our platform provides all the tools and guidance you need.',
        },
      ],
    },
    {
      category: 'Subscriptions & Packages',
      questions: [
        {
          q: 'How do subscription packages work?',
          a: 'Creators create subscription packages with different features and pricing. Subscribers can browse available packages, choose one that fits their needs, make a payment, and gain access to that creator\'s trades and strategies for 30 days.',
        },
        {
          q: 'What payment methods are accepted?',
          a: 'We currently accept payments through Flutterwave, which supports various payment methods including bank transfers, credit/debit cards, and mobile money. All transactions are secure and encrypted.',
        },
        {
          q: 'Can I cancel my subscription?',
          a: 'Subscriptions are active for 30 days from the date of purchase. After the period expires, you can choose to renew or let it expire. There are no automatic renewals, so you have full control over your subscription.',
        },
        {
          q: 'What happens when my subscription expires?',
          a: 'When your subscription expires, you\'ll lose access to new trades from that creator. However, you can still view your completed trades history. To continue receiving new trades, simply renew your subscription.',
        },
      ],
    },
    {
      category: 'Trading & Features',
      questions: [
        {
          q: 'How do I follow trades in real-time?',
          a: 'Once you subscribe to a creator\'s package, you\'ll automatically receive notifications when they place new trades. You can view all active trades in your dashboard, see entry points, stop loss, take profit levels, and track their progress in real-time.',
        },
        {
          q: 'Can I copy trades automatically?',
          a: 'Currently, Sigmora provides trade signals and notifications. You execute trades manually on your preferred broker platform. This gives you full control over your trading decisions and risk management.',
        },
        {
          q: 'What trading assets are supported?',
          a: 'Sigmora supports all major forex pairs (EUR/USD, GBP/USD, USD/JPY, etc.), commodities (Gold, Silver, Oil), cryptocurrencies (BTC/USD, ETH/USD), and indices. Creators can add any trading asset they use.',
        },
        {
          q: 'How accurate are the trading signals?',
          a: 'All creators on our platform are verified professionals with proven track records. We display success rates and performance metrics for each creator, allowing you to make informed decisions about who to follow.',
        },
      ],
    },
    {
      category: 'Creator Features',
      questions: [
        {
          q: 'How do I become a Creator?',
          a: 'Sign up as a Creator during registration. Once registered, you can create subscription packages, add trading assets, and start sharing your trades with subscribers. There\'s no approval process - you can start immediately!',
        },
        {
          q: 'How do I create a subscription package?',
          a: 'Go to your Creator Dashboard, click "Create Package", fill in the package details (name, description, price, features), and publish it. Subscribers will then be able to see and subscribe to your package.',
        },
        {
          q: 'How do I share my academy code?',
          a: 'Your unique academy code is available in your Creator Dashboard. Share this code with potential subscribers, and they can use it to join your academy and view your available packages.',
        },
        {
          q: 'Can I see my subscriber statistics?',
          a: 'Yes! Your Creator Dashboard provides comprehensive analytics including number of subscribers, active trades, completed trades, win rate, and total profit. This helps you track your performance and growth.',
        },
      ],
    },
    {
      category: 'Security & Support',
      questions: [
        {
          q: 'Is my data secure?',
          a: 'Absolutely! We use bank-level encryption (256-bit SSL) to protect all your data. Your passwords are hashed, and we never store sensitive payment information. Your privacy and security are our top priorities.',
        },
        {
          q: 'What if I forget my password?',
          a: 'On the login page, click "Forgot Password" and enter your email address. You\'ll receive a password reset link via email. Follow the instructions to create a new password.',
        },
        {
          q: 'How can I contact support?',
          a: 'You can reach our support team 24/7 through the Contact page, email support@sigmora.com, or use the live chat feature in your dashboard. We typically respond within a few hours.',
        },
        {
          q: 'Do you offer refunds?',
          a: 'Refund policies vary by creator and package. Please review the specific terms before subscribing. If you have issues, contact our support team, and we\'ll work to resolve them promptly.',
        },
      ],
    },
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page" style={{ background: theme.colors.background }}>
      <Navbar />
      
      {/* Redesigned Hero Section */}
      <section className="faq-hero-redesigned">
        <div className="hero-background-faq-new">
          <div className="hero-gradient-faq-1"></div>
          <div className="hero-gradient-faq-2"></div>
        </div>
        <div className="container-faq-hero">
          <motion.div
            className="hero-text-faq"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="hero-badge-faq"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                background: `${theme.colors.secondary}15`,
                color: theme.colors.secondary,
                border: `1px solid ${theme.colors.secondary}30`,
              }}
            >
              <ShieldIcon size={16} color={theme.colors.secondary} />
              Quick Answers
            </motion.span>
            <h1 style={{ color: theme.colors.text }}>
              Frequently Asked <span style={{ color: theme.colors.secondary }}>Questions</span>
            </h1>
            <p className="hero-lead-faq" style={{ color: theme.colors.textSecondary }}>
              Everything you need to know about using our platform, subscriptions, trading features, and more.
              Can't find what you're looking for? Contact our support team.
            </p>
            <div className="hero-categories-preview">
              {faqs.map((category, i) => (
                <motion.div
                  key={i}
                  className="category-preview-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  style={{
                    background: theme.colors.card,
                    border: `1px solid ${theme.colors.border}`,
                  }}
                >
                  <div className="category-count" style={{ color: theme.colors.secondary }}>
                    {category.questions.length}
                  </div>
                  <span style={{ color: theme.colors.text }}>{category.category}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="faq-content-modern" style={{ background: theme.colors.backgroundSecondary }}>
        <div className="container-faq">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="faq-category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h2 className="category-title" style={{ color: theme.colors.text }}>
                {category.category}
              </h2>
              <div className="faq-list">
                {category.questions.map((faq, questionIndex) => {
                  const index = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openIndex === index;
                  
                  return (
                    <FloatingCard key={questionIndex} delay={questionIndex * 0.05}>
                      <motion.div
                        className="faq-item"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: questionIndex * 0.05 }}
                        style={{
                          background: theme.colors.card,
                          border: `1px solid ${theme.colors.border}`,
                        }}
                      >
                        <button
                          className="faq-question"
                          onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                          style={{ color: theme.colors.text }}
                        >
                          <span>{faq.q}</span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ color: theme.colors.secondary }}
                          >
                            <ArrowRightIcon size={20} color={theme.colors.secondary} style={{ transform: 'rotate(90deg)' }} />
                          </motion.div>
                        </button>
                        <motion.div
                          className="faq-answer"
                          initial={false}
                          animate={{
                            height: isOpen ? 'auto' : 0,
                            opacity: isOpen ? 1 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          style={{ color: theme.colors.textSecondary }}
                        >
                          <div className="faq-answer-content">
                            <CheckIcon size={18} color={theme.colors.success} style={{ marginRight: '0.75rem', flexShrink: 0 }} />
                            <p>{faq.a}</p>
                          </div>
                        </motion.div>
                      </motion.div>
                    </FloatingCard>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="faq-cta-modern" style={{ background: theme.colors.background }}>
        <div className="container-faq">
          <motion.div
            className="cta-content-faq"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: theme.colors.card,
              border: `1px solid ${theme.colors.border}`,
            }}
          >
            <h2 style={{ color: theme.colors.text }}>Still Have Questions?</h2>
            <p style={{ color: theme.colors.textSecondary }}>
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="cta-buttons-faq">
              <a
                href="/contact"
                className="btn-cta-faq"
                style={{
                  background: theme.colors.secondary,
                  color: theme.colors.primary,
                }}
              >
                <span>Contact Support</span>
                <ArrowRightIcon size={18} color={theme.colors.primary} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;

