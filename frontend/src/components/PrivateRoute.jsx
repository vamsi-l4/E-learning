import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './PrivateRoute.css';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="private-route-loading">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;