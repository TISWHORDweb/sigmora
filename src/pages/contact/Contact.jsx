import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useTheme } from '../../context/ThemeContext';
import FloatingCard from '../../components/3d/FloatingCards';
import { ActivityIcon, ShieldIcon, TargetIcon, ChartIcon } from '../../components/icons/Icons';
import toast from 'react-hot-toast';
import './Contact.css';

const Contact = () => {
  const { theme } = useTheme();
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
    toast.success('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { Icon: ActivityIcon, label: 'Email', value: 'support@sigmora.com', color: theme.colors.secondary },
    { Icon: ChartIcon, label: 'Phone', value: '+1 (555) 123-4567', color: theme.colors.success },
    { Icon: TargetIcon, label: 'Address', value: '123 Trading Street, Financial District, NY 10004', color: theme.colors.secondary },
    { Icon: ShieldIcon, label: 'Support Hours', value: '24/7 - We\'re always here for you', color: theme.colors.success },
  ];

  return (
    <div className="contact-page" style={{ background: theme.colors.background }}>
      <Navbar />
      
      {/* Redesigned Hero Section */}
      <section className="contact-hero-redesigned">
        <div className="hero-background-contact-new">
          <div className="hero-gradient-contact-1"></div>
          <div className="hero-gradient-contact-2"></div>
        </div>
        <div className="container-contact-hero">
          <motion.div
            className="hero-text-contact"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="hero-badge-contact"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                background: `${theme.colors.secondary}15`,
                color: theme.colors.secondary,
                border: `1px solid ${theme.colors.secondary}30`,
              }}
            >
              <ActivityIcon size={16} color={theme.colors.secondary} />
              24/7 Support Available
            </motion.span>
            <h1 style={{ color: theme.colors.text }}>
              Get In Touch, <span style={{ color: theme.colors.secondary }}>We're Here to Help</span>
            </h1>
            <p className="hero-lead-contact" style={{ color: theme.colors.textSecondary }}>
              Have questions or need assistance? Our support team is available 24/7 to help you
              with any inquiries about our platform, features, or trading services.
            </p>
            <div className="hero-contact-preview">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  className="contact-preview-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  style={{
                    background: theme.colors.card,
                    border: `1px solid ${theme.colors.border}`,
                  }}
                >
                  <div
                    className="contact-preview-icon"
                    style={{
                      background: `${info.color}15`,
                      color: info.color,
                    }}
                  >
                    <info.Icon size={20} color={info.color} />
                  </div>
                  <div>
                    <div style={{ color: theme.colors.text, fontWeight: 600, fontSize: '0.9rem' }}>{info.label}</div>
                    <div style={{ color: theme.colors.textSecondary, fontSize: '0.85rem' }}>{info.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="contact-content-modern" style={{ background: theme.colors.backgroundSecondary }}>
        <div className="container-contact">
          <div className="contact-grid-modern">
            <motion.div
              className="contact-info-modern"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 style={{ color: theme.colors.text }}>Contact Information</h2>
              <div className="info-items-modern">
                {contactInfo.map((info, index) => (
                  <FloatingCard key={index} delay={index * 0.1}>
                    <motion.div
                      className="info-item-modern"
                      whileHover={{ scale: 1.02, y: -5 }}
                      style={{
                        background: theme.colors.card,
                        border: `1px solid ${theme.colors.border}`,
                      }}
                    >
                      <div
                        className="info-icon-modern"
                        style={{
                          background: `${info.color}15`,
                          color: info.color,
                        }}
                      >
                        <info.Icon size={24} color={info.color} />
                      </div>
                      <div>
                        <h3 style={{ color: theme.colors.text }}>{info.label}</h3>
                        <p style={{ color: theme.colors.textSecondary }}>{info.value}</p>
                      </div>
                    </motion.div>
                  </FloatingCard>
                ))}
              </div>
            </motion.div>

            <FloatingCard delay={0.2}>
              <motion.form
                className="contact-form-modern"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{
                  background: theme.colors.card,
                  border: `1px solid ${theme.colors.border}`,
                }}
              >
                <h2 style={{ color: theme.colors.text }}>Send us a Message</h2>
                <div className="form-group-modern">
                  <label style={{ color: theme.colors.text }}>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      background: theme.colors.backgroundSecondary,
                      border: `1px solid ${theme.colors.border}`,
                      color: theme.colors.text,
                    }}
                  />
                </div>
                <div className="form-group-modern">
                  <label style={{ color: theme.colors.text }}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      background: theme.colors.backgroundSecondary,
                      border: `1px solid ${theme.colors.border}`,
                      color: theme.colors.text,
                    }}
                  />
                </div>
                <div className="form-group-modern">
                  <label style={{ color: theme.colors.text }}>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    style={{
                      background: theme.colors.backgroundSecondary,
                      border: `1px solid ${theme.colors.border}`,
                      color: theme.colors.text,
                    }}
                  />
                </div>
                <div className="form-group-modern">
                  <label style={{ color: theme.colors.text }}>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    required
                    style={{
                      background: theme.colors.backgroundSecondary,
                      border: `1px solid ${theme.colors.border}`,
                      color: theme.colors.text,
                    }}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="submit-button-modern"
                  style={{
                    background: theme.colors.secondary,
                    color: theme.colors.primary,
                  }}
                >
                  Send Message
                </button>
              </motion.form>
            </FloatingCard>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;

