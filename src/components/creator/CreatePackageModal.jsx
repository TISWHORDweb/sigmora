import { useState, useCallback } from 'react';
import { X } from 'lucide-react';
import DetailModal from '../common/DetailModal';
import { packageService } from '../../services/packageService';
import { getApiErrorMessage } from '../../utils/apiErrors';
import toast from 'react-hot-toast';

const CreatePackageModal = ({ open, onClose, onCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [features, setFeatures] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setName('');
    setDescription('');
    setPrice('');
    setFeatureInput('');
    setFeatures([]);
  };

  const handleClose = () => {
    if (submitting) return;
    reset();
    onClose();
  };

  const addFeature = useCallback((raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    setFeatures((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
    setFeatureInput('');
  }, []);

  const onFeatureKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addFeature(featureInput.replace(/,/g, ''));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await packageService.createPackage({
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        features,
      });
      toast.success(`Package "${name}" created`);
      reset();
      onCreated?.();
      onClose();
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to create package'));
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="confirm-dialog-portal" role="presentation">
      <button type="button" className="confirm-dialog__backdrop" aria-label="Close" onClick={handleClose} />
      <div className="confirm-dialog confirm-dialog--wide" role="dialog" aria-modal="true">
        <button type="button" className="confirm-dialog__close" onClick={handleClose} aria-label="Close">
          <X size={18} />
        </button>
        <h2 className="confirm-dialog__title">Create package</h2>
        <p className="confirm-dialog__message">Add a new subscription tier for your academy.</p>
        <form onSubmit={handleSubmit} className="detail-modal__form">
          <div className="cr-field">
            <span className="cr-field-label">Package name</span>
            <input
              className="cr-input"
              placeholder="e.g. Pro, Advanced"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ fontFamily: 'var(--cr-body)' }}
            />
          </div>
          <div className="cr-field">
            <span className="cr-field-label">Description</span>
            <textarea
              className="cr-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What subscribers receive…"
              required
            />
          </div>
          <div className="cr-field">
            <span className="cr-field-label">Monthly price (NGN)</span>
            <div className="cr-price-prefix">
              <span>₦</span>
              <input
                className="cr-input"
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="cr-field">
            <span className="cr-field-label">Features</span>
            <input
              className="cr-input"
              style={{ fontFamily: 'var(--cr-body)' }}
              placeholder="Press Enter to add"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={onFeatureKeyDown}
              onBlur={() => addFeature(featureInput)}
            />
            <div className="cr-tags-wrap">
              {features.map((f) => (
                <span key={f} className="cr-tag">
                  {f}
                  <button type="button" onClick={() => setFeatures((prev) => prev.filter((x) => x !== f))}>
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="confirm-dialog__actions" style={{ marginTop: 8, paddingTop: 16 }}>
            <button type="button" className="confirm-dialog__btn confirm-dialog__btn--ghost" onClick={handleClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="confirm-dialog__btn confirm-dialog__btn--primary confirm-dialog__btn--success"
              disabled={submitting}
            >
              {submitting ? 'Creating…' : 'Create package'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePackageModal;
