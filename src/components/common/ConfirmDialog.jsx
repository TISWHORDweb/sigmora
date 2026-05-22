import { useEffect } from 'react';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';
import './ConfirmDialog.css';

const VARIANTS = {
  default: { icon: CheckCircle, confirmClass: '' },
  success: { icon: CheckCircle, confirmClass: 'confirm-dialog__btn--success' },
  danger: { icon: AlertTriangle, confirmClass: 'confirm-dialog__btn--danger' },
  warning: { icon: AlertTriangle, confirmClass: 'confirm-dialog__btn--warning' },
};

const ConfirmDialog = ({
  open,
  title = 'Confirm',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  onConfirm,
  onCancel,
}) => {
  const { icon: Icon, confirmClass } = VARIANTS[variant] || VARIANTS.default;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onCancel?.();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="confirm-dialog-portal" role="presentation">
      <button type="button" className="confirm-dialog__backdrop" aria-label="Close" onClick={onCancel} />
      <div
        className="confirm-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-desc"
      >
        <button type="button" className="confirm-dialog__close" onClick={onCancel} aria-label="Close">
          <X size={18} />
        </button>
        <div className={`confirm-dialog__icon confirm-dialog__icon--${variant}`}>
          <Icon size={28} strokeWidth={2} />
        </div>
        <h2 id="confirm-dialog-title" className="confirm-dialog__title">
          {title}
        </h2>
        {message && (
          <p id="confirm-dialog-desc" className="confirm-dialog__message">
            {message}
          </p>
        )}
        <div className="confirm-dialog__actions">
          <button type="button" className="confirm-dialog__btn confirm-dialog__btn--ghost" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`confirm-dialog__btn confirm-dialog__btn--primary ${confirmClass}`}
            onClick={onConfirm}
            autoFocus
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
