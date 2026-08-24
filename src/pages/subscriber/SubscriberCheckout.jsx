'use client';

import { useState } from 'react';
import { useLocation, useNavigate } from '../../lib/router';
import { ArrowLeft, CreditCard } from 'lucide-react';
import SubscriberShell from '../../components/subscriber/SubscriberShell';
import { paymentService } from '../../services/paymentService';
import { getApiErrorMessage } from '../../utils/apiErrors';
import toast from 'react-hot-toast';

const SubscriberCheckout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { package: pkg, creator } = location.state || {};
  const [paying, setPaying] = useState(false);

  if (!pkg) {
    return (
      <SubscriberShell title="Checkout" subtitle="No package selected" activeNav="academy">
        <div className="cr-card cr-empty">
          <h3>Nothing to checkout</h3>
          <p>Choose a package from your academy page first.</p>
          <button
            type="button"
            className="cr-btn-primary cr-btn-sm no-pulse cr-btn-with-icon"
            style={{ marginTop: 16, width: 'auto' }}
            onClick={() => navigate('/subscriber/academy')}
          >
            <ArrowLeft size={16} />
            Back to academy
          </button>
        </div>
      </SubscriberShell>
    );
  }

  const subtotal = Number(pkg.price) || 0;
  const today = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePay = async () => {
    setPaying(true);
    try {
      const { paymentLink } = await paymentService.initializePayment(pkg._id);
      window.location.href = paymentLink;
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to start payment'));
      setPaying(false);
    }
  };

  return (
    <SubscriberShell
      title="Checkout"
      subtitle="Review your order before payment"
      activeNav="academy"
      topAction={
        <button
          type="button"
          className="cr-btn-ghost cr-btn-with-icon"
          onClick={() => navigate('/subscriber/academy')}
        >
          <ArrowLeft size={16} />
          Academy
        </button>
      }
    >
      <div className="cr-checkout-layout">
        <div className="cr-card cr-receipt">
          <div className="cr-receipt__head">
            <span className="cr-receipt__label">Payment receipt</span>
            <span className="cr-receipt__date">{today}</span>
          </div>
          <div className="cr-receipt__divider" />
          <div className="cr-receipt__row">
            <span>Academy</span>
            <strong>{creator?.creatorName || '—'}</strong>
          </div>
          <div className="cr-receipt__row">
            <span>Academy code</span>
            <code className="cr-nav-code">{creator?.academyCode || '—'}</code>
          </div>
          <div className="cr-receipt__divider" />
          <div className="cr-receipt__row cr-receipt__row--package">
            <div>
              <strong>{pkg.name}</strong>
              {pkg.description && <p className="cr-receipt__desc">{pkg.description}</p>}
            </div>
            <span className="cr-receipt__amount">₦{subtotal.toLocaleString()}</span>
          </div>
          {pkg.features?.length > 0 && (
            <ul className="cr-receipt__features">
              {pkg.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          )}
          <div className="cr-receipt__divider" />
          <div className="cr-receipt__row cr-receipt__total">
            <span>Total due</span>
            <strong className="cr-receipt__amount">₦{subtotal.toLocaleString()}</strong>
          </div>
          <p className="cr-receipt__note">
            You will be redirected to our secure payment partner to complete this purchase. Subscription
            activates after successful payment.
          </p>
          <button
            type="button"
            className="cr-btn-primary cr-btn-sm no-pulse cr-btn-block cr-btn-with-icon"
            onClick={handlePay}
            disabled={paying}
          >
            <CreditCard size={18} />
            {paying ? 'Redirecting…' : 'Proceed to pay'}
          </button>
        </div>
      </div>
    </SubscriberShell>
  );
};

export default SubscriberCheckout;
