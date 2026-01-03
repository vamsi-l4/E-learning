import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          E-Learning Platform
        </Link>
        <nav className="header-nav">
          <Link to="/courses" className="header-nav-link">
            Courses
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="header-nav-link">
                Dashboard
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="header-nav-link">
                  Admin
                </Link>
              )}
              <span className="header-greeting">Hello, {user.name}</span>
              <button
                onClick={handleLogout}
                className="header-logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="header-nav-link">
                Login
              </Link>
              <Link to="/signup" className="header-signup-btn">
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