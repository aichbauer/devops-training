import { ReactElement, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../helpers/contexts/auth';
import { ROLES } from '../helpers/roles';

export interface ProtectedRouteProps {
  type?: 'admin' | 'supermarkt-employee' | 'customer';
  children: ReactElement;
}

export function ProtectedRoute({ children, type }: ProtectedRouteProps) {
  const auth = useAuth();

  useEffect(() => {
    setTimeout(() => {
      auth?.setLoading(false);
    }, 500);
  });

  if (auth?.loading) {
    return null;
  }

  if (!auth?.token) {
    return <Navigate to="/" />;
  }

  if (type === ROLES.admin && auth.getTokenPayload().role !== ROLES.admin) {
    return <Navigate to="/error-404" />;
  }

  return children;
}
