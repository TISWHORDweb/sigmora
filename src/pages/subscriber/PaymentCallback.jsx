import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../../styles/landing-tokens.css';
import '../../styles/app-shell.css';

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get('status');

  useEffect(() => {
    if (status === 'successful') {
      toast.success('Payment successful! Your subscription is now active.');
      setTimeout(() => navigate('/subscriber/dashboard'), 2000);
    } else {
      toast.error('Payment failed. Please try again.');
      setTimeout(() => navigate('/join'), 2000);
    }
  }, [status, navigate]);

  return (
    <div className="app-shell-page app-shell-page--centered landing-premium">
      <div className="app-shell-card" style={{ textAlign: 'center' }}>
        <h1>Processing Payment...</h1>
        <p style={{ color: 'var(--muted-foreground)' }}>
          {status === 'successful' ? 'Payment successful!' : 'Payment failed'}
        </p>
      </div>
    </div>
  );
};

export default PaymentCallback;
