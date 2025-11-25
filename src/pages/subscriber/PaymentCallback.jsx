import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get('status');

  useEffect(() => {
    if (status === 'successful') {
      toast.success('Payment successful! Your subscription is now active.');
      setTimeout(() => {
        navigate('/subscriber/dashboard');
      }, 2000);
    } else {
      toast.error('Payment failed. Please try again.');
      setTimeout(() => {
        navigate('/join');
      }, 2000);
    }
  }, [status, navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Processing Payment...</h1>
        <p>{status === 'successful' ? 'Payment successful!' : 'Payment failed'}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
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
    textAlign: 'center',
  },
};

export default PaymentCallback;

