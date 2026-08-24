'use client';

import { useState } from 'react';
import { Link } from '../../lib/router';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import FloatingCard from '../../components/3d/FloatingCards';
import { ArrowRightIcon, ShieldIcon } from '../../components/icons/Icons';
import '../../styles/landing-tokens.css';
import '../../styles/landing-page.css';

const PageHeroBg = () => (
  <div className="page-hero-bg" aria-hidden="true">
    <div className="hero-gradient-orb orb-modern-1" />
    <div className="hero-gradient-orb orb-modern-2" />
    <div className="hero-grid-modern" />
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I create an account on Sigmora?',
          a: 'Click "Get Started" in the navigation, choose Creator or Subscriber, fill in your details, and you\'re ready. The process takes less than 2 minutes.',
        },
        {
          q: 'What is the difference between a Creator and Subscriber?',
          a: 'Creators share trading strategies and signals. Subscribers follow creators, subscribe to packages, and receive real-time trade notifications.',
        },
        {
          q: 'Do I need trading experience to use Sigmora?',
          a: 'No. Sigmora is designed for all experience levels. Subscribers learn from experts; experienced traders can become creators and share knowledge.',
        },
      ],
    },
    {
      category: 'Subscriptions & Packages',
      questions: [
        {
          q: 'How do subscription packages work?',
          a: 'Creators publish packages with features and pricing. Subscribers choose a package, pay securely, and gain access to that creator\'s trades for 30 days.',
        },
        {
          q: 'What payment methods are accepted?',
          a: 'We accept payments through Flutterwave, including bank transfers, cards, and mobile money. All transactions are encrypted.',
        },
        {
          q: 'Can I cancel my subscription?',
          a: 'Subscriptions run for 30 days from purchase with no automatic renewal—you choose whether to renew when it expires.',
        },
        {
          q: 'What happens when my subscription expires?',
          a: 'You lose access to new trades from that creator but can still view completed trade history. Renew anytime to continue.',
        },
      ],
    },
    {
      category: 'Trading & Features',
      questions: [
        {
          q: 'How do I follow trades in real-time?',
          a: 'After subscribing, you receive notifications when the creator places trades. View active trades, entry, stop loss, and take profit in your dashboard.',
        },
        {
          q: 'Can I copy trades automatically?',
          a: 'Sigmora provides signals and notifications. You execute trades manually on your broker for full control over decisions and risk.',
        },
        {
          q: 'What trading assets are supported?',
          a: 'Major forex pairs, commodities, cryptocurrencies, and indices. Creators can add any assets they trade.',
        },
        {
          q: 'How accurate are the trading signals?',
          a: 'Creators are verified professionals. We display success rates and performance metrics so you can choose who to follow.',
        },
      ],
    },
    {
      category: 'Creator Features',
      questions: [
        {
          q: 'How do I become a Creator?',
          a: 'Sign up as a Creator during registration, then create packages, add assets, and share trades—no approval wait required.',
        },
        {
          q: 'How do I create a subscription package?',
          a: 'In your Creator Dashboard, click "Create Package", add name, description, price, and features, then publish.',
        },
        {
          q: 'How do I share my academy code?',
          a: 'Your unique academy code is in the Creator Dashboard. Share it so subscribers can join your academy and view packages.',
        },
        {
          q: 'Can I see my subscriber statistics?',
          a: 'Yes. Your dashboard includes subscribers, active and completed trades, win rate, and profit analytics.',
        },
      ],
    },
    {
      category: 'Security & Support',
      questions: [
        {
          q: 'Is my data secure?',
          a: 'We use 256-bit SSL encryption. Passwords are hashed and we never store sensitive payment details on our servers.',
        },
        {
          q: 'What if I forget my password?',
          a: 'Use "Forgot Password" on the login page. You\'ll receive a reset link by email to create a new password.',
        },
        {
          q: 'How can I contact support?',
          a: 'Reach us 24/7 via the Contact page, email support@sigmora.com, or live chat in your dashboard.',
        },
        {
          q: 'Do you offer refunds?',
          a: 'Refund policies vary by creator and package. Review terms before subscribing; contact support if you have issues.',
        },
      ],
    },
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

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
            <ShieldIcon size={16} />
            Help Center
          </span>
          <h1 className="page-hero-title">
            Frequently Asked <span className="gradient-modern">Questions</span>
          </h1>
          <p className="page-hero-subtitle">
            Everything you need to know about accounts, subscriptions, trading, and support.
          </p>
        </motion.div>
      </section>

      <section className="landing-section">
        <div className="section-container">
          <div className="mk-related">
            <Link to="/getting-started" className="mk-related-card">
              <h3>Getting started</h3>
              <p>Account, package, first signal — in three steps</p>
              <span>
                View <ArrowRightIcon size={14} color="currentColor" />
              </span>
            </Link>
            <Link to="/fees" className="mk-related-card">
              <h3>Fees</h3>
              <p>Creator packages, 30 days, no auto-renew trap</p>
              <span>
                View <ArrowRightIcon size={14} color="currentColor" />
              </span>
            </Link>
            <Link to="/contact" className="mk-related-card">
              <h3>Customer support</h3>
              <p>24/7 — trading and technical specialists</p>
              <span>
                View <ArrowRightIcon size={14} color="currentColor" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="landing-section section-bg-even">
        <div className="section-container">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              className="faq-category-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.05 }}
            >
              <h2 className="faq-category-title">{category.category}</h2>
              <div className="faq-items">
                {category.questions.map((faq, questionIndex) => {
                  const index = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openIndex === index;

                  return (
                    <FloatingCard key={faq.q} delay={questionIndex * 0.03}>
                      <div className="faq-item-card">
                        <button
                          type="button"
                          className="faq-question-btn"
                          onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                          aria-expanded={isOpen}
                        >
                          <span>{faq.q}</span>
                          <span className={`faq-chevron ${isOpen ? 'open' : ''}`} aria-hidden="true">
                            <ArrowRightIcon size={18} color="currentColor" />
                          </span>
                        </button>
                        <motion.div
                          className="faq-answer-panel"
                          initial={false}
                          animate={{
                            height: isOpen ? 'auto' : 0,
                            opacity: isOpen ? 1 : 0,
                          }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="faq-answer-inner">
                            <p>{faq.a}</p>
                          </div>
                        </motion.div>
                      </div>
                    </FloatingCard>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="landing-cta section-bg-odd">
        <div className="landing-cta-inner">
          <h2>
            Still Have <span className="gradient-modern">Questions?</span>
          </h2>
          <p>Our support team is here to help you get the most out of Sigmora.</p>
          <div className="landing-cta-actions">
            <Link to="/contact" className="btn-landing-primary">
              Contact Support
              <ArrowRightIcon size={18} color="currentColor" />
            </Link>
            <Link to="/getting-started" className="btn-landing-secondary">
              Getting started
            </Link>
          </div>
        </div>
      </section>

      <Footer landing />
    </div>
  );
};

export default FAQ;
