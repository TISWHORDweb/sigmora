import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { academyService } from '../../services/academyService';
import { paymentService } from '../../services/paymentService';
import toast from 'react-hot-toast';

const JoinAcademy = () => {
  const [academyCode, setAcademyCode] = useState('');
  const [academyInfo, setAcademyInfo] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await academyService.getAcademyByCode(academyCode);
      setAcademyInfo(data);
    } catch (error) {
      toast.error('Invalid academy code');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (packageId) => {
    setLoading(true);

    try {
      const { paymentLink } = await paymentService.initializePayment(packageId);
      // Open Flutterwave payment modal
      window.location.href = paymentLink;
    } catch (error) {
      toast.error('Failed to initialize payment');
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Join Academy</h1>
        
        {!academyInfo ? (
          <form onSubmit={handleCodeSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Enter Academy Code</label>
              <input
                type="text"
                value={academyCode}
                onChange={(e) => setAcademyCode(e.target.value.toUpperCase())}
                required
                maxLength={6}
                placeholder="Enter 6-character code"
                style={styles.input}
              />
            </div>
            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? 'Loading...' : 'Continue'}
            </button>
          </form>
        ) : (
          <div>
            <h2>{academyInfo.creator.creatorName}</h2>
            <p>Academy Code: {academyInfo.creator.academyCode}</p>
            
            <h3>Available Packages</h3>
            <div style={styles.packagesList}>
              {academyInfo.packages.map((pkg) => (
                <div key={pkg._id} style={styles.packageCard}>
                  <h4>{pkg.name}</h4>
                  <p>{pkg.description}</p>
                  <p style={styles.price}>₦{pkg.price.toLocaleString()}</p>
                  <ul>
                    {pkg.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSubscribe(pkg._id)}
                    disabled={loading}
                    style={styles.subscribeBtn}
                  >
                    Subscribe
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    maxWidth: '800px',
    width: '100%',
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
    fontSize: '1.5rem',
    textAlign: 'center',
    letterSpacing: '0.5rem',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  packagesList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
  },
  packageCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1.5rem',
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#007bff',
    margin: '1rem 0',
  },
  subscribeBtn: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '1rem',
  },
};

export default JoinAcademy;

