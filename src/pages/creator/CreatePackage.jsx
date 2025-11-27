import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { packageService } from '../../services/packageService';
import { useTheme } from '../../context/ThemeContext';
import FloatingCard from '../../components/3d/FloatingCards';
import { PackageIcon, ArrowRightIcon, PlusIcon } from '../../components/icons/Icons';
import toast from 'react-hot-toast';
import './CreatePackage.css';

const CreatePackage = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    features: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const featuresArray = formData.features
        .split(',')
        .map(f => f.trim())
        .filter(f => f.length > 0);

      await packageService.createPackage({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        features: featuresArray,
      });

      toast.success('Package created successfully!');
      navigate('/creator/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create package');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-package-page" style={{ background: theme.colors.background }}>
      {/* Header */}
      <motion.header
        className="page-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          background: theme.colors.card,
          borderBottom: `1px solid ${theme.colors.border}`,
        }}
      >
        <div className="header-content">
          <Link to="/creator/dashboard" className="back-link" style={{ color: theme.colors.textSecondary }}>
            <ArrowRightIcon size={20} color={theme.colors.textSecondary} style={{ transform: 'rotate(180deg)' }} />
            <span>Back to Dashboard</span>
          </Link>
          <div className="header-title">
            <div className="header-icon" style={{ background: `${theme.colors.secondary}20`, color: theme.colors.secondary }}>
              <PackageIcon size={24} color={theme.colors.secondary} />
            </div>
            <div>
              <h1 style={{ color: theme.colors.text }}>Create Package</h1>
              <p style={{ color: theme.colors.textSecondary }}>Create a new subscription package for your students</p>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="page-container">
        <FloatingCard>
          <motion.div
            className="form-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: theme.colors.card,
              border: `1px solid ${theme.colors.border}`,
            }}
          >
            <form onSubmit={handleSubmit} className="package-form">
              <div className="form-group">
                <label style={{ color: theme.colors.text }}>Package Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Basic, Pro, Advanced"
                  style={{
                    background: theme.colors.backgroundSecondary,
                    border: `1px solid ${theme.colors.border}`,
                    color: theme.colors.text,
                  }}
                />
              </div>

              <div className="form-group">
                <label style={{ color: theme.colors.text }}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Describe what subscribers will get with this package..."
                  style={{
                    background: theme.colors.backgroundSecondary,
                    border: `1px solid ${theme.colors.border}`,
                    color: theme.colors.text,
                  }}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label style={{ color: theme.colors.text }}>Price (NGN)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    style={{
                      background: theme.colors.backgroundSecondary,
                      border: `1px solid ${theme.colors.border}`,
                      color: theme.colors.text,
                    }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label style={{ color: theme.colors.text }}>
                  Features <span style={{ color: theme.colors.textTertiary, fontSize: '0.9rem' }}>(comma-separated)</span>
                </label>
                <input
                  type="text"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  placeholder="Feature 1, Feature 2, Feature 3"
                  style={{
                    background: theme.colors.backgroundSecondary,
                    border: `1px solid ${theme.colors.border}`,
                    color: theme.colors.text,
                  }}
                />
                <p className="form-hint" style={{ color: theme.colors.textTertiary }}>
                  Separate multiple features with commas
                </p>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => navigate('/creator/dashboard')}
                  className="btn-cancel"
                  style={{
                    background: theme.colors.backgroundSecondary,
                    border: `1px solid ${theme.colors.border}`,
                    color: theme.colors.text,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-submit"
                  style={{
                    background: theme.colors.secondary,
                    color: theme.colors.primary,
                  }}
                >
                  {loading ? (
                    'Creating...'
                  ) : (
                    <>
                      <PlusIcon size={20} color={theme.colors.primary} />
                      <span>Create Package</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </FloatingCard>
      </div>
    </div>
  );
};

export default CreatePackage;
