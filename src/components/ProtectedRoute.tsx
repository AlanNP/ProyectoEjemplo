import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Permission } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  permission?: Permission;
}

export default function ProtectedRoute({ children, permission }: ProtectedRouteProps) {
  const { isAuthenticated, hasPermission } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (permission && !hasPermission(permission)) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <span className="text-3xl">🚫</span>
        </div>
        <h2 className="text-xl font-semibold text-slate-700">Acceso Denegado</h2>
        <p className="text-slate-500 text-sm">No tienes permisos para ver este módulo.</p>
      </div>
    );
  }

  return <>{children}</>;
}
