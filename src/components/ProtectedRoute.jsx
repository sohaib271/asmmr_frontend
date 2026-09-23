import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, admin = false }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <main className="route-loading">Loading your account…</main>;
  if (!user) return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  if (admin && user.role !== 'admin') return <Navigate to="/portal" replace />;
  return children;
}
