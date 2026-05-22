import { useEffect } from 'react';
import { X } from 'lucide-react';
import './ConfirmDialog.css';

/**
 * Modal for reviewing details before an action (trade confirm, create package, etc.)
 */
const DetailModal = ({
  open,
  title,
  subtitle,
  children,
  confirmLabel = 'Continue',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
  confirmVariant = 'success',
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape' && !loading) onCancel?.();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onCancel, loading]);

  if (!open) return null;

  const confirmClass =
    confirmVariant === 'danger'
      ? 'confirm-dialog__btn--danger'
      : confirmVariant === 'warning'
        ? 'confirm-dialog__btn--warning'
        : 'confirm-dialog__btn--success';

  return (
    <div className="confirm-dialog-portal" role="presentation">
      <button
        type="button"
        className="confirm-dialog__backdrop"
        aria-label="Close"
        onClick={loading ? undefined : onCancel}
        disabled={loading}
      />
      <div className="confirm-dialog confirm-dialog--wide" role="dialog" aria-modal="true">
        <button
          type="button"
          className="confirm-dialog__close"
          onClick={onCancel}
          disabled={loading}
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <h2 className="confirm-dialog__title" style={{ marginBottom: subtitle ? 6 : 16 }}>
          {title}
        </h2>
        {subtitle && <p className="confirm-dialog__message">{subtitle}</p>}
        <div className="detail-modal__body">{children}</div>
        <div className="confirm-dialog__actions" style={{ marginTop: 20 }}>
          <button
            type="button"
            className="confirm-dialog__btn confirm-dialog__btn--ghost"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`confirm-dialog__btn confirm-dialog__btn--primary ${confirmClass}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Please wait…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export const DetailRow = ({ label, value, highlight }) => (
  <div className={`detail-modal__row ${highlight || ''}`}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default DetailModal;
