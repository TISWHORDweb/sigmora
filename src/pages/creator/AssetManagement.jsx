import { useState, useEffect } from 'react';
import { assetService } from '../../services/assetService';
import toast from 'react-hot-toast';

const AssetManagement = () => {
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
        symbol: formData.symbol,
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
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Asset Management</h1>
        <button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>
          {showForm ? 'Cancel' : 'Add Asset'}
        </button>
      </div>

      {showForm && (
        <div style={styles.card}>
          <h2>Add New Asset</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Symbol</label>
              <input
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleChange}
                required
                placeholder="e.g., USD/JPY, GOLD, BTC/USDT"
              />
            </div>

            <div style={styles.formGroup}>
              <label>PIP Value</label>
              <input
                type="number"
                name="pipValue"
                value={formData.pipValue}
                onChange={handleChange}
                required
                step="0.0001"
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
              <label>Margin</label>
              <input
                type="number"
                name="margin"
                value={formData.margin}
                onChange={handleChange}
                required
                step="0.01"
              />
            </div>

            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? 'Creating...' : 'Create Asset'}
            </button>
          </form>
        </div>
      )}

      <div style={styles.assetsList}>
        <h2>Your Assets</h2>
        {assets.length === 0 ? (
          <p>No assets yet. Add your first asset above.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>PIP Value</th>
                <th>Spread</th>
                <th>Margin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset._id}>
                  <td>{asset.symbol}</td>
                  <td>{asset.pipValue}</td>
                  <td>{asset.spread}</td>
                  <td>{asset.margin}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(asset._id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  addBtn: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '1rem',
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
  button: {
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  assetsList: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  deleteBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default AssetManagement;

