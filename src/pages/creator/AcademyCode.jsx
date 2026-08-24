'use client';

import { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';
import CreatorShell from '../../components/creator/CreatorShell';
import { academyService } from '../../services/academyService';
import toast from 'react-hot-toast';

const AcademyCode = () => {
  const [academyCode, setAcademyCode] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAcademyCode();
  }, []);

  const loadAcademyCode = async () => {
    try {
      const data = await academyService.getAcademyCode();
      setAcademyCode(data.academyCode || '');
      setCreatorName(data.creatorName || '');
    } catch {
      toast.error('Failed to load academy code');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!academyCode) return;
    navigator.clipboard.writeText(academyCode);
    toast.success('Academy code copied');
  };

  return (
    <CreatorShell
      title="Academy Code"
      subtitle="Share with subscribers so they can join your academy"
      activeNav="academy-code"
      loading={loading}
    >
      <div className="cr-card cr-card-glow cr-academy-card">
        <p className="cr-dash-hero-label">Creator</p>
        <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{creatorName || '—'}</p>

        <p className="cr-dash-hero-label" style={{ marginTop: 24 }}>
          Your code
        </p>
        <div className="cr-academy-code">{academyCode || '—'}</div>

        <button
          type="button"
          className="cr-btn-primary cr-btn-sm"
          style={{ width: 'auto', margin: '0 auto' }}
          onClick={copyToClipboard}
          disabled={!academyCode}
        >
          <Copy size={16} />
          Copy code
        </button>

        <div className="cr-academy-steps">
          <h3 className="cr-section-title" style={{ marginBottom: 0 }}>
            How to use
          </h3>
          <ol>
            <li>Share this code with your students</li>
            <li>They enter it when joining your academy</li>
            <li>They can subscribe to your packages and receive signals</li>
          </ol>
        </div>
      </div>
    </CreatorShell>
  );
};

export default AcademyCode;
