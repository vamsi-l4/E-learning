import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './AdminRoute.css';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="admin-route-loading">Loading...</div>;
  }

  return user && user.role === 'admin' ? children : <Navigate to="/" />;
};

export default AdminRoute;