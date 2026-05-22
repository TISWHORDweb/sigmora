import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SigmoraLoader from './SigmoraLoader';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <SigmoraLoader fullScreen />;
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

