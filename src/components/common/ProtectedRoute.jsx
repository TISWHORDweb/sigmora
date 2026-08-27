'use client';

import { Navigate } from '../../lib/router';
import { useAuth } from '../../context/AuthContext';
import SigmoraLoader from './SigmoraLoader';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <SigmoraLoader fullScreen message="Loading…" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return children;
};

export default ProtectedRoute;

