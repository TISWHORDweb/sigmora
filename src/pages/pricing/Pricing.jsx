import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import './Pricing.css';

const Pricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: '₦5,000',
      period: '/month',
      description: 'Perfect for beginners',
      features: [
        'Access to basic trades',
        'Email support',
        'Basic analytics',
        'Mobile app access',
        'Community forum',
      ],
      popular: false,
    },
    {
      name: 'Pro',
      price: '₦15,000',
      period: '/month',
      description: 'For serious traders',
      features: [
        'All basic features',
        'Advanced analytics',
        'Priority support',
        'Advanced strategies',
        'Risk management tools',
        'Live trading sessions',
      ],
      popular: true,
    },
    {
      name: 'Advanced',
      price: '₦30,000',
      period: '/month',
      description: 'For professionals',
      features: [
        'All pro features',
        '1-on-1 mentorship',
        'Custom strategies',
        'API access',
        'White-label options',
        'Dedicated account manager',
      ],
      popular: false,
    },
  ];

  return (
    <div className="pricing-page">
      <Navbar />
      
      <section className="pricing-hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Choose Your Plan</h1>
          <p>Flexible pricing for traders at every level</p>
        </motion.div>
      </section>

      <section className="pricing-plans">
        <div className="container">
          <div className="plans-grid">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                <h3>{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
                <div className="plan-price">
                  <span className="price">{plan.price}</span>
                  <span className="period">{plan.period}</span>
                </div>
                <ul className="plan-features">
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <span className="check-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register/subscriber"
                  className="plan-button"
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;

