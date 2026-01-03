import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      if (!error.response) {
        setError('Unable to connect to server. Please ensure the backend is running.');
      } else {
        setError(error.response?.data?.message || 'Signup failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>

      {error && (
        <div className="signup-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="signup-form-group">
          <label className="signup-label" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="signup-input"
            required
          />
        </div>

        <div className="signup-form-group">
          <label className="signup-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="signup-input"
            required
          />
        </div>

        <div className="signup-form-group">
          <label className="signup-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="signup-input"
            required
            minLength="6"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="signup-button"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>

      <p className="signup-footer">
        Already have an account?{' '}
        <Link to="/login" className="signup-link">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;