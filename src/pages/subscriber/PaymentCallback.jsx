'use client';

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from '../../lib/router';
import SigmoraLoader from '../../components/common/SigmoraLoader';
import toast from 'react-hot-toast';
import '../../styles/creator-admin.css';

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get('status');

  useEffect(() => {
    if (status === 'successful') {
      toast.success('Payment successful! Your subscription is now active.');
      setTimeout(() => navigate('/subscriber/subscriptions'), 2000);
    } else {
      toast.error('Payment failed. Please try again.');
      setTimeout(() => navigate('/subscriber/academy'), 2000);
    }
  }, [status, navigate]);

  return (
    <div className="cr-app" style={{ minHeight: '100vh' }}>
      <div className="cr-grain" aria-hidden="true" />
      <div className="cr-main-loader" style={{ minHeight: '100vh' }}>
        <SigmoraLoader fullScreen={false} inline message="Processing payment…" />
        <p style={{ textAlign: 'center', color: 'var(--cr-muted)', marginTop: 16 }}>
          {status === 'successful' ? 'Payment successful' : 'Payment failed'}
        </p>
      </div>
    </div>
  );
};

export default PaymentCallback;
