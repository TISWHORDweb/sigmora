import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import CreatorShell from '../../components/creator/CreatorShell';
import SubscriberShell from '../../components/subscriber/SubscriberShell';
import { authService } from '../../services/authService';
import { getApiErrorMessage } from '../../utils/apiErrors';
import toast from 'react-hot-toast';

const ProfileForm = () => {
  const { user, updateProfile } = useAuth();
  const isCreator = user?.role === 'creator';

  const [name, setName] = useState(user?.name || '');
  const [creatorName, setCreatorName] = useState(user?.creatorName || '');
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const payload = { name: name.trim() };
      if (isCreator) payload.creatorName = creatorName.trim();
      await updateProfile(payload);
    } catch {
      /* toast in context */
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    setSavingPassword(true);
    try {
      await authService.changePassword(currentPassword, newPassword);
      toast.success('Password updated');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to change password'));
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="cr-page cr-profile-page">
      <form className="cr-card cr-form-panel" onSubmit={handleProfileSubmit}>
        <h3 className="cr-form-section-title" style={{ marginTop: 0 }}>
          Profile
        </h3>
        <div className="cr-form-grid-2">
          <div className="cr-field">
            <span className="cr-field-label">Full name</span>
            <input
              className="cr-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="cr-field">
            <span className="cr-field-label">Email</span>
            <input className="cr-input" value={user?.email || ''} disabled />
            <span className="cr-field-hint">Email cannot be changed here</span>
          </div>
          {isCreator && (
            <>
              <div className="cr-field">
                <span className="cr-field-label">Creator / academy name</span>
                <input
                  className="cr-input"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  required
                />
              </div>
              <div className="cr-field">
                <span className="cr-field-label">Academy code</span>
                <input className="cr-input" value={user?.academyCode || ''} disabled />
              </div>
            </>
          )}
          {!isCreator && user?.creatorInfo && (
            <div className="cr-field" style={{ gridColumn: '1 / -1' }}>
              <span className="cr-field-label">Subscribed academy</span>
              <input
                className="cr-input"
                value={`${user.creatorInfo.creatorName || '—'} (${user.creatorInfo.academyCode || '—'})`}
                disabled
              />
            </div>
          )}
        </div>
        <button
          type="submit"
          className="cr-btn-primary cr-btn-sm no-pulse"
          style={{ width: 'auto', marginTop: 8 }}
          disabled={savingProfile}
        >
          {savingProfile ? 'Saving…' : 'Save profile'}
        </button>
      </form>

      <form className="cr-card cr-form-panel" onSubmit={handlePasswordSubmit} style={{ marginTop: 24 }}>
        <h3 className="cr-form-section-title" style={{ marginTop: 0 }}>
          Change password
        </h3>
        <div className="cr-form-grid-2">
          <div className="cr-field">
            <span className="cr-field-label">Current password</span>
            <input
              className="cr-input"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <div className="cr-field">
            <span className="cr-field-label">New password</span>
            <input
              className="cr-input"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>
          <div className="cr-field">
            <span className="cr-field-label">Confirm new password</span>
            <input
              className="cr-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>
        </div>
        <button
          type="submit"
          className="cr-btn-primary cr-btn-sm no-pulse"
          style={{ width: 'auto', marginTop: 8 }}
          disabled={savingPassword}
        >
          {savingPassword ? 'Updating…' : 'Update password'}
        </button>
      </form>
    </div>
  );
};

const ProfilePage = () => {
  const { user } = useAuth();
  const isCreator = user?.role === 'creator';

  if (isCreator) {
    return (
      <CreatorShell
        title="Profile"
        subtitle="Update your account details and password"
        activeNav="profile"
      >
        <ProfileForm />
      </CreatorShell>
    );
  }

  return (
    <SubscriberShell
      title="Profile"
      subtitle="Update your account details and password"
      activeNav="profile"
    >
      <ProfileForm />
    </SubscriberShell>
  );
};

export default ProfilePage;
