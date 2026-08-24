'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { ArrowRight, CheckCircle2, GraduationCap } from 'lucide-react';
import SubscriberShell from '../../components/subscriber/SubscriberShell';
import SubscribePackageModal from '../../components/subscriber/SubscribePackageModal';
import { academyService } from '../../services/academyService';
import { subscriptionService } from '../../services/subscriptionService';
import { getAcademyName } from '../../utils/subscriberAcademy';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const SubscriberAcademy = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [academy, setAcademy] = useState(null);
  const [mySubscriptions, setMySubscriptions] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  const loadSubscriptions = useCallback(async () => {
    try {
      const data = await subscriptionService.getSubscriptions();
      setMySubscriptions(Array.isArray(data) ? data : []);
    } catch {
      /* non-blocking */
    }
  }, []);

  const loadAcademy = useCallback(async () => {
    try {
      const data = await academyService.getMyAcademy();
      setAcademy(data);
    } catch {
      toast.error('Failed to load academy details');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAcademy();
    loadSubscriptions();
  }, [loadAcademy, loadSubscriptions]);

  const activePackageIds = useMemo(() => {
    const now = Date.now();
    return new Set(
      mySubscriptions
        .filter((s) => s.status === 'active' && new Date(s.expiryDate).getTime() > now)
        .map((s) => (typeof s.package === 'object' ? s.package?._id : s.package))
        .filter(Boolean)
        .map(String)
    );
  }, [mySubscriptions]);

  const academyName = academy?.creator?.creatorName || getAcademyName(user) || 'Your academy';
  const academyCode = academy?.creator?.academyCode || user?.creatorInfo?.academyCode || '—';

  const handleSubscribe = (pkg) => {
    if (activePackageIds.has(String(pkg._id))) {
      toast.success('You are already subscribed to this package');
      return;
    }
    setSelectedPackage(pkg);
    setSubscribeOpen(true);
  };

  const handleSubscribed = () => {
    loadSubscriptions();
  };

  return (
    <SubscriberShell
      title="My Academy"
      subtitle="Academy details and available packages"
      activeNav="academy"
      loading={loading}
    >
      {academy && (
        <div className="cr-page-full">
          <div className="cr-card cr-academy-hero">
            <div className="cr-academy-hero__icon">
              <GraduationCap size={28} />
            </div>
            <div className="cr-academy-hero__body">
              <h2 className="cr-academy-hero__title">{academyName}</h2>
              <p className="cr-academy-hero__meta">
                Academy code: <code className="cr-nav-code">{academyCode}</code>
              </p>
              <p className="cr-academy-hero__text">
                Subscribe to a package to unlock live signals for that tier. You only see trades tied to packages
                you have subscribed to.
              </p>
            </div>
          </div>

          <div className="cr-packages-header" style={{ marginTop: 28 }}>
            <h3 className="cr-section-title">Available packages</h3>
            <span className="cr-search-bar__count">{academy.packages?.length ?? 0} packages</span>
          </div>

          {academy.packages?.length === 0 ? (
            <div className="cr-card cr-empty">
              <h3>No packages yet</h3>
              <p>Your academy has not published subscription packages yet.</p>
            </div>
          ) : (
            <div className="cr-packages-grid">
              {academy.packages.map((pkg) => {
                const isSubscribed = activePackageIds.has(String(pkg._id));
                return (
                  <article key={pkg._id} className="cr-card cr-package-card">
                    <div className="cr-package-card-head">
                      <h4 className="cr-package-card-name">{pkg.name}</h4>
                      <span className="cr-package-card-price">₦{Number(pkg.price).toLocaleString()}</span>
                    </div>
                    {isSubscribed && (
                      <span className="cr-status-pill cr-status-pill--active cr-package-subscribed">
                        <CheckCircle2 size={12} />
                        Subscribed
                      </span>
                    )}
                    {pkg.description && <p className="cr-package-card-desc">{pkg.description}</p>}
                    {pkg.features?.length > 0 && (
                      <div className="cr-package-card-features">
                        {pkg.features.slice(0, 5).map((f) => (
                          <span key={f} className="cr-tag">
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                    <button
                      type="button"
                      className={`cr-btn-primary cr-btn-sm no-pulse cr-btn-block cr-btn-with-icon ${isSubscribed ? 'cr-btn-ghost' : ''}`}
                      onClick={() => handleSubscribe(pkg)}
                      disabled={isSubscribed}
                    >
                      {isSubscribed ? 'Subscribed' : 'Subscribe'}
                      {!isSubscribed && <ArrowRight size={16} />}
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}

      <SubscribePackageModal
        open={subscribeOpen}
        onClose={() => {
          setSubscribeOpen(false);
          setSelectedPackage(null);
        }}
        pkg={selectedPackage}
        creator={academy?.creator}
        onSubscribed={handleSubscribed}
      />
    </SubscriberShell>
  );
};

export default SubscriberAcademy;
