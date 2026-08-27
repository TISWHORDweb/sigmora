'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { assetService } from '../../services/assetService';
import { getApiErrorMessage } from '../../utils/apiErrors';
import SymbolPicker from './SymbolPicker';
import toast from 'react-hot-toast';

const CreateAssetModal = ({ open, onClose, onCreated, existingSymbols = [] }) => {
  const [symbol, setSymbol] = useState('');
  const [pip, setPip] = useState('');
  const [spread, setSpread] = useState('');
  const [margin, setMargin] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setSymbol('');
    setPip('');
    setSpread('');
    setMargin('');
  };

  const handleClose = () => {
    if (submitting) return;
    reset();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symbol.trim()) {
      toast.error('Select a symbol');
      return;
    }
    setSubmitting(true);
    try {
      await assetService.createAsset({
        symbol: symbol.trim(),
        pipValue: parseFloat(pip),
        spread: parseFloat(spread),
        margin: parseFloat(margin),
      });
      toast.success(`Asset "${symbol.trim()}" created`);
      reset();
      onCreated?.();
      onClose();
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to create asset'));
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
        <h2 className="confirm-dialog__title">Add asset</h2>
        <p className="confirm-dialog__message">Pick a market symbol, then set PIP, spread, and margin.</p>
        <form onSubmit={handleSubmit} className="detail-modal__form">
          <div className="cr-form-grid-2">
            <div className="cr-field" style={{ gridColumn: '1 / -1' }}>
              <span className="cr-field-label">Symbol</span>
              <SymbolPicker
                value={symbol}
                onChange={setSymbol}
                exclude={existingSymbols}
                placeholder="Search forex, crypto, metals…"
                required
              />
            </div>
            <div className="cr-field">
              <span className="cr-field-label">PIP value</span>
              <input
                className="cr-input"
                type="number"
                step="0.0001"
                placeholder="0.0001"
                value={pip}
                onChange={(e) => setPip(e.target.value)}
                required
              />
            </div>
            <div className="cr-field">
              <span className="cr-field-label">Spread</span>
              <input
                className="cr-input"
                type="number"
                step="0.1"
                placeholder="1.2"
                value={spread}
                onChange={(e) => setSpread(e.target.value)}
                required
              />
            </div>
            <div className="cr-field">
              <span className="cr-field-label">Margin</span>
              <input
                className="cr-input"
                type="number"
                placeholder="500"
                value={margin}
                onChange={(e) => setMargin(e.target.value)}
                required
              />
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
              {submitting ? 'Creating…' : 'Create asset'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssetModal;
