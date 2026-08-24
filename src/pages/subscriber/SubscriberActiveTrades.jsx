'use client';

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from '../../lib/router';
import { ArrowLeft } from 'lucide-react';
import SubscriberShell from '../../components/subscriber/SubscriberShell';
import SubscriberTradesContent from '../../components/subscriber/SubscriberTradesContent';
import { tradeService } from '../../services/tradeService';
import toast from 'react-hot-toast';

const SubscriberActiveTrades = () => {
  const navigate = useNavigate();
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const initialLoad = useRef(true);

  useEffect(() => {
    loadTrades();
    const interval = setInterval(loadTrades, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadTrades = async () => {
    try {
      const data = await tradeService.getSubscriberActiveTrades();
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
      title="Active Trades"
      subtitle="Live signals from your academy — updates every 5 seconds"
      activeNav="active-trades"
      loading={loading}
      topAction={
        <button type="button" className="cr-btn-ghost cr-btn-with-icon" onClick={() => navigate('/subscriber/dashboard')}>
          <ArrowLeft size={16} />
          Overview
        </button>
      }
    >
      {!loading && <SubscriberTradesContent trades={trades} variant="active" />}
    </SubscriberShell>
  );
};

export default SubscriberActiveTrades;
