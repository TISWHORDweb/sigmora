import { useState, useEffect } from 'react';
import { CheckCircle2, CreditCard, X } from 'lucide-react';
import { subscriptionService } from '../../services/subscriptionService';
import { getApiErrorMessage } from '../../utils/apiErrors';
import toast from 'react-hot-toast';

const SubscribePackageModal = ({ open, onClose, pkg, creator, onSubscribed }) => {
  const [step, setStep] = useState('review');
  const [confirming, setConfirming] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (open) {
      setStep('review');
      setDone(false);
      setConfirming(false);
    }
  }, [open, pkg?._id]);

  if (!open || !pkg) return null;

  const subtotal = Number(pkg.price) || 0;
  const today = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleClose = () => {
    if (confirming) return;
    onClose();
  };

  const handleConfirmPayment = async () => {
    setConfirming(true);
    try {
      // Live payment gateway disabled — confirm creates subscription record
      const result = await subscriptionService.subscribeToPackage(pkg._id);
      setDone(true);
      toast.success(result.message || 'Subscription activated');
      onSubscribed?.(result.subscription);
      setTimeout(() => {
        handleClose();
      }, 1200);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to activate subscription'));
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="confirm-dialog-portal" role="presentation">
      <button type="button" className="confirm-dialog__backdrop" aria-label="Close" onClick={handleClose} />
      <div className="confirm-dialog confirm-dialog--wide" role="dialog" aria-modal="true">
        <button type="button" className="confirm-dialog__close" onClick={handleClose} aria-label="Close">
          <X size={18} />
        </button>

        {done ? (
          <div className="cr-subscribe-success">
            <CheckCircle2 size={48} color="var(--cr-green)" />
            <h2 className="confirm-dialog__title">You&apos;re subscribed</h2>
            <p className="confirm-dialog__message">
              {pkg.name} is active. You can now view signals for this package.
            </p>
          </div>
        ) : step === 'review' ? (
          <>
            <h2 className="confirm-dialog__title">Subscribe to {pkg.name}</h2>
            <p className="confirm-dialog__message">Review your order before continuing.</p>
            <div className="cr-receipt cr-receipt--modal">
              <div className="cr-receipt__head">
                <span className="cr-receipt__label">Order summary</span>
                <span className="cr-receipt__date">{today}</span>
              </div>
              <div className="cr-receipt__divider" />
              <div className="cr-receipt__row">
                <span>Academy</span>
                <strong>{creator?.creatorName || '—'}</strong>
              </div>
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
                <span>Total</span>
                <strong className="cr-receipt__amount">₦{subtotal.toLocaleString()}</strong>
              </div>
            </div>
            <div className="confirm-dialog__actions" style={{ marginTop: 16, paddingTop: 0 }}>
              <button type="button" className="confirm-dialog__btn confirm-dialog__btn--ghost" onClick={handleClose}>
                Cancel
              </button>
              <button
                type="button"
                className="confirm-dialog__btn confirm-dialog__btn--primary confirm-dialog__btn--success cr-btn-with-icon"
                onClick={() => setStep('confirm')}
              >
                Proceed to pay
                <CreditCard size={16} />
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="confirm-dialog__title">Confirm payment</h2>
            <p className="confirm-dialog__message">
              Confirm to activate <strong>{pkg.name}</strong> (₦{subtotal.toLocaleString()}) for{' '}
              {creator?.creatorName || 'your academy'}.
            </p>
            <div className="cr-card cr-confirm-pay-box">
              <div className="cr-receipt__row">
                <span>Package</span>
                <strong>{pkg.name}</strong>
              </div>
              <div className="cr-receipt__row">
                <span>Amount</span>
                <strong className="cr-receipt__amount">₦{subtotal.toLocaleString()}</strong>
              </div>
              <p className="cr-receipt__note" style={{ margin: '12px 0 0' }}>
                Payment is simulated for now. Tapping confirm will activate your subscription immediately.
              </p>
            </div>
            <div className="confirm-dialog__actions" style={{ marginTop: 16, paddingTop: 0 }}>
              <button
                type="button"
                className="confirm-dialog__btn confirm-dialog__btn--ghost"
                onClick={() => setStep('review')}
                disabled={confirming}
              >
                Back
              </button>
              <button
                type="button"
                className="confirm-dialog__btn confirm-dialog__btn--primary confirm-dialog__btn--success cr-btn-with-icon"
                onClick={handleConfirmPayment}
                disabled={confirming}
              >
                <CheckCircle2 size={16} />
                {confirming ? 'Activating…' : 'Confirm payment'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SubscribePackageModal;
