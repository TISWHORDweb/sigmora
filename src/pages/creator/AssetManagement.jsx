import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { assetService } from '../../services/assetService';
import { useTheme } from '../../context/ThemeContext';
import FloatingCard from '../../components/3d/FloatingCards';
import { BarChartIcon, PlusIcon, ArrowRightIcon, SettingsIcon } from '../../components/icons/Icons';
import toast from 'react-hot-toast';
import './AssetManagement.css';

const AssetManagement = () => {
  const { theme } = useTheme();
  const [assets, setAssets] = useState([]);
  const [formData, setFormData] = useState({
    symbol: '',
    pipValue: '',
    spread: '',
    margin: '',
  });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      const data = await assetService.getAssets();
      setAssets(data);
    } catch (error) {
      toast.error('Failed to load assets');
    }
  };

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
      await assetService.createAsset({
        symbol: formData.symbol.toUpperCase(),
        pipValue: parseFloat(formData.pipValue),
        spread: parseFloat(formData.spread),
        margin: parseFloat(formData.margin),
      });

      toast.success('Asset created successfully!');
      setFormData({ symbol: '', pipValue: '', spread: '', margin: '' });
      setShowForm(false);
      loadAssets();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create asset');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this asset?')) return;

    try {
      await assetService.deleteAsset(id);
      toast.success('Asset deleted successfully!');
      loadAssets();
    } catch (error) {
      toast.error('Failed to delete asset');
    }
  };

  return (
    <div className="asset-management-page" style={{ background: theme.colors.background }}>
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
            <div className="header-icon" style={{ background: `${theme.colors.primary}20`, color: theme.colors.primary }}>
              <BarChartIcon size={24} color={theme.colors.primary} />
            </div>
            <div>
              <h1 style={{ color: theme.colors.text }}>Asset Management</h1>
              <p style={{ color: theme.colors.textSecondary }}>Manage your trading assets and their specifications</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-add-asset"
            style={{
              background: theme.colors.secondary,
              color: theme.colors.primary,
            }}
          >
            <PlusIcon size={20} color={theme.colors.primary} />
            <span>{showForm ? 'Cancel' : 'Add Asset'}</span>
          </button>
        </div>
      </motion.header>

      <div className="page-container">
        {showForm && (
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
              <h2 style={{ color: theme.colors.text, marginBottom: '2rem' }}>Add New Asset</h2>
              <form onSubmit={handleSubmit} className="asset-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label style={{ color: theme.colors.text }}>Symbol</label>
                    <input
                      type="text"
                      name="symbol"
                      value={formData.symbol}
                      onChange={handleChange}
                      required
                      placeholder="e.g., USD/JPY, GOLD, BTC/USDT"
                      style={{
                        background: theme.colors.backgroundSecondary,
                        border: `1px solid ${theme.colors.border}`,
                        color: theme.colors.text,
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ color: theme.colors.text }}>PIP Value</label>
                    <input
                      type="number"
                      name="pipValue"
                      value={formData.pipValue}
                      onChange={handleChange}
                      required
                      step="0.0001"
                      placeholder="0.0001"
                      style={{
                        background: theme.colors.backgroundSecondary,
                        border: `1px solid ${theme.colors.border}`,
                        color: theme.colors.text,
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ color: theme.colors.text }}>Spread</label>
                    <input
                      type="number"
                      name="spread"
                      value={formData.spread}
                      onChange={handleChange}
                      required
                      step="0.01"
                      placeholder="0.01"
                      style={{
                        background: theme.colors.backgroundSecondary,
                        border: `1px solid ${theme.colors.border}`,
                        color: theme.colors.text,
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ color: theme.colors.text }}>Margin</label>
                    <input
                      type="number"
                      name="margin"
                      value={formData.margin}
                      onChange={handleChange}
                      required
                      step="0.01"
                      placeholder="0.01"
                      style={{
                        background: theme.colors.backgroundSecondary,
                        border: `1px solid ${theme.colors.border}`,
                        color: theme.colors.text,
                      }}
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
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
                    {loading ? 'Creating...' : 'Create Asset'}
                  </button>
                </div>
              </form>
            </motion.div>
          </FloatingCard>
        )}

        {/* Assets List */}
        <motion.div
          className="assets-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 style={{ color: theme.colors.text, marginBottom: '1.5rem' }}>
            Your Assets ({assets.length})
          </h2>
          {assets.length === 0 ? (
            <div className="empty-state" style={{ background: theme.colors.card, border: `1px solid ${theme.colors.border}` }}>
              <BarChartIcon size={48} color={theme.colors.textTertiary} />
              <p style={{ color: theme.colors.textSecondary }}>No assets yet. Add your first asset above.</p>
            </div>
          ) : (
            <div className="assets-grid">
              {assets.map((asset, index) => (
                <FloatingCard key={asset._id} delay={index * 0.1}>
                  <motion.div
                    className="asset-card"
                    whileHover={{ scale: 1.02, y: -5 }}
                    style={{
                      background: theme.colors.card,
                      border: `1px solid ${theme.colors.border}`,
                    }}
                  >
                    <div className="asset-header">
                      <div className="asset-symbol" style={{ color: theme.colors.secondary }}>
                        {asset.symbol}
                      </div>
                      <button
                        onClick={() => handleDelete(asset._id)}
                        className="btn-delete"
                        style={{ color: theme.colors.danger }}
                      >
                        ×
                      </button>
                    </div>
                    <div className="asset-details">
                      <div className="asset-detail">
                        <span style={{ color: theme.colors.textSecondary }}>PIP Value</span>
                        <span style={{ color: theme.colors.text, fontWeight: 600 }}>{asset.pipValue}</span>
                      </div>
                      <div className="asset-detail">
                        <span style={{ color: theme.colors.textSecondary }}>Spread</span>
                        <span style={{ color: theme.colors.text, fontWeight: 600 }}>{asset.spread}</span>
                      </div>
                      <div className="asset-detail">
                        <span style={{ color: theme.colors.textSecondary }}>Margin</span>
                        <span style={{ color: theme.colors.text, fontWeight: 600 }}>{asset.margin}</span>
                      </div>
                    </div>
                  </motion.div>
                </FloatingCard>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AssetManagement;
