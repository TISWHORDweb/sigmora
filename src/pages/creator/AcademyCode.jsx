import { useState, useEffect } from 'react';
import { academyService } from '../../services/academyService';
import toast from 'react-hot-toast';

const AcademyCode = () => {
  const [academyCode, setAcademyCode] = useState('');
  const [creatorName, setCreatorName] = useState('');

  useEffect(() => {
    loadAcademyCode();
  }, []);

  const loadAcademyCode = async () => {
    try {
      const data = await academyService.getAcademyCode();
      setAcademyCode(data.academyCode);
      setCreatorName(data.creatorName);
    } catch (error) {
      toast.error('Failed to load academy code');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(academyCode);
    toast.success('Academy code copied to clipboard!');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Your Academy Code</h1>
        <p style={styles.creatorName}>Creator: {creatorName}</p>
        
        <div style={styles.codeContainer}>
          <h2 style={styles.code}>{academyCode}</h2>
          <button onClick={copyToClipboard} style={styles.copyBtn}>
            Copy Code
          </button>
        </div>

        <div style={styles.info}>
          <h3>How to use:</h3>
          <ol>
            <li>Share this code with your students</li>
            <li>Students will use it to join your academy</li>
            <li>They can then subscribe to your packages</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  creatorName: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '2rem',
  },
  codeContainer: {
    margin: '2rem 0',
  },
  code: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#007bff',
    letterSpacing: '0.5rem',
    marginBottom: '1rem',
  },
  copyBtn: {
    padding: '0.75rem 2rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  info: {
    marginTop: '2rem',
    textAlign: 'left',
  },
};

export default AcademyCode;

