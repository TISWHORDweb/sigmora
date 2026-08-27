'use client';

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from '../../lib/router';
import { ArrowLeft } from 'lucide-react';
import SubscriberShell from '../../components/subscriber/SubscriberShell';
import SubscriberTradesContent from '../../components/subscriber/SubscriberTradesContent';
import { tradeService } from '../../services/tradeService';
import toast from 'react-hot-toast';

const SubscriberCompletedTrades = () => {
  const navigate = useNavigate();
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialLoad = useRef(true);

  useEffect(() => {
    loadTrades();
  }, []);

  const loadTrades = async () => {
    try {
      const data = await tradeService.getSubscriberCompletedTrades();
      setTrades(Array.isArray(data) ? data : []);
    } catch {
      if (initialLoad.current) toast.error('Failed to load trades');
    } finally {
      if (initialLoad.current) {
        initialLoad.current = false;
        setLoading(false);
      }
    }
  };

  return (
    <SubscriberShell
      title="Completed Trades"
      subtitle="Closed signals and outcomes from your academy"
      activeNav="completed-trades"
      loading={loading}
      topAction={
        <button type="button" className="cr-btn-ghost cr-btn-with-icon" onClick={() => navigate('/subscriber/dashboard')}>
          <ArrowLeft size={16} />
          Overview
        </button>
      }
    >
      {!loading && (
        <SubscriberTradesContent
          trades={trades}
          variant="completed"
          onTradeUpdated={(updated) =>
            setTrades((prev) => prev.map((t) => (t._id === updated._id ? updated : t)))
          }
        />
      )}
    </SubscriberShell>
  );
};

export default SubscriberCompletedTrades;
