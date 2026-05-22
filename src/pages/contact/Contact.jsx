import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import FloatingCard from '../../components/3d/FloatingCards';
import { ActivityIcon, ShieldIcon, TargetIcon, ChartIcon } from '../../components/icons/Icons';
import toast from 'react-hot-toast';
import '../../styles/landing-tokens.css';
import '../../styles/landing-page.css';

const PageHeroBg = () => (
  <div className="page-hero-bg" aria-hidden="true">
    <div className="hero-gradient-orb orb-modern-1" />
    <div className="hero-gradient-orb orb-modern-2" />
    <div className="hero-grid-modern" />
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { Icon: ActivityIcon, label: 'Email', value: 'support@sigmora.com' },
    { Icon: ChartIcon, label: 'Phone', value: '+1 (555) 123-4567' },
    { Icon: TargetIcon, label: 'Address', value: '123 Trading Street, Financial District, NY 10004' },
    { Icon: ShieldIcon, label: 'Support Hours', value: "24/7 — We're always here for you" },
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
            <ActivityIcon size={16} />
            24/7 Support Available
          </span>
          <h1 className="page-hero-title">
            Get In Touch, <span className="gradient-modern">We're Here to Help</span>
          </h1>
          <p className="page-hero-subtitle">
            Questions about our platform, features, or trading services? Reach out anytime.
          </p>
        </motion.div>
      </section>

      <section className="landing-section section-bg-even">
        <div className="section-container contact-layout">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-header section-header-left">
              <span className="section-eyebrow">Contact</span>
              <h2 className="section-title">Contact Information</h2>
              <p className="section-subtitle">
                Choose the channel that works best for you—we typically respond within a few hours.
              </p>
            </div>
            <div className="landing-list">
              {contactInfo.map((info, index) => (
                <FloatingCard key={info.label} delay={index * 0.06}>
                  <motion.div
                    className="landing-list-item contact-info-row"
                    whileHover={{ y: -2 }}
                  >
                    <div className="landing-list-icon">
                      <info.Icon size={20} color="currentColor" />
                    </div>
                    <div>
                      <h4>{info.label}</h4>
                      <p>{info.value}</p>
                    </div>
                  </motion.div>
                </FloatingCard>
              ))}
            </div>
          </motion.div>

          <FloatingCard delay={0.15}>
            <motion.form
              className="contact-form-card"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2>Send us a Message</h2>
              <div className="form-field">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>
              <button type="submit" className="btn-landing-primary">
                Send Message
              </button>
            </motion.form>
          </FloatingCard>
        </div>
      </section>

      <Footer landing />
    </div>
  );
};

export default Contact;
