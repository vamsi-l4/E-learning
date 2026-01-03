import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          E-Learning Platform
        </Link>
        <nav className="flex items-center space-x-4">
          <Link to="/courses" className="text-gray-700 hover:text-blue-600">
            Courses
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-gray-700 hover:text-blue-600">
                  Admin
                </Link>
              )}
              <span className="text-gray-700">Hello, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;