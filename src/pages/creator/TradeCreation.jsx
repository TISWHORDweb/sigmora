import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tradeService } from '../../services/tradeService';
import { assetService } from '../../services/assetService';
import { packageService } from '../../services/packageService';
import toast from 'react-hot-toast';

const TradeCreation = () => {
  const [assets, setAssets] = useState([]);
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    asset: '',
    type: 'BUY',
    pip: '',
    spread: '',
    takeProfit: '',
    stopLoss: '',
    packages: [],
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [assetsData, packagesData] = await Promise.all([
        assetService.getAssets(),
        packageService.getCreatorPackages(),
      ]);
      setAssets(assetsData);
      setPackages(packagesData);
    } catch (error) {
      toast.error('Failed to load data');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePackageToggle = (packageId) => {
    setFormData({
      ...formData,
      packages: formData.packages.includes(packageId)
        ? formData.packages.filter(id => id !== packageId)
        : [...formData.packages, packageId],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.packages.length === 0) {
      toast.error('Please select at least one package');
      return;
    }

    setLoading(true);

    try {
      await tradeService.createTrade({
        asset: formData.asset,
        type: formData.type,
        pip: parseFloat(formData.pip),
        spread: parseFloat(formData.spread),
        takeProfit: parseFloat(formData.takeProfit),
        stopLoss: parseFloat(formData.stopLoss),
        packages: formData.packages,
      });

      toast.success('Trade created successfully!');
      navigate('/creator/trades/active');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create trade');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Create Trade</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label>Select Packages</label>
            <div style={styles.checkboxGroup}>
              {packages.map((pkg) => (
                <label key={pkg._id} style={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.packages.includes(pkg._id)}
                    onChange={() => handlePackageToggle(pkg._id)}
                  />
                  {pkg.name}
                </label>
              ))}
            </div>
          </div>

          <div style={styles.formGroup}>
            <label>Asset</label>
            <select
              name="asset"
              value={formData.asset}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="">Select an asset</option>
              {assets.map((asset) => (
                <option key={asset._id} value={asset._id}>
                  {asset.symbol}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label>Trade Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              style={styles.select}
            >
              <option value="BUY">BUY (Green)</option>
              <option value="SELL">SELL (Red)</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label>PIP</label>
            <input
              type="number"
              name="pip"
              value={formData.pip}
              onChange={handleChange}
              required
              step="0.01"
            />
          </div>

          <div style={styles.formGroup}>
            <label>Spread</label>
            <input
              type="number"
              name="spread"
              value={formData.spread}
              onChange={handleChange}
              required
              step="0.01"
            />
          </div>

          <div style={styles.formGroup}>
            <label>Take Profit (TP)</label>
            <input
              type="number"
              name="takeProfit"
              value={formData.takeProfit}
              onChange={handleChange}
              required
              step="0.01"
            />
          </div>

          <div style={styles.formGroup}>
            <label>Stop Loss (SL)</label>
            <input
              type="number"
              name="stopLoss"
              value={formData.stopLoss}
              onChange={handleChange}
              required
              step="0.01"
            />
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Placing Trade...' : 'Place Trade'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  select: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

export default TradeCreation;

