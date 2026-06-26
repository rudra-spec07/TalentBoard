import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

/**
 * Guard for routes that require authentication and optional role-based permissions.
 */
export const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-medium text-sm">Verifying session details...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // If not authorized for this role, redirect to default dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
