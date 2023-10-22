import { Navigate } from 'react-router-dom';
import { useAuth } from '../helpers/contexts/auth';

export function UnprotectedRoute({ children }) {
  const auth = useAuth();

  if (auth.token) {
    auth.setLoading(false);
    return <Navigate to="/dashboard" />;
  }

  return children;
}
