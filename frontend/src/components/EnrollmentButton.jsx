import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './EnrollmentButton.css';

const EnrollmentButton = ({ courseId, isEnrolled, onEnroll }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      await api.post('/enrollments', { courseId });
      onEnroll();
    } catch (error) {
      console.error('Enrollment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isEnrolled) {
    return (
      <button
        disabled
        className="enrollment-button enrolled"
      >
        Enrolled
      </button>
    );
  }

  return (
    <button
      onClick={handleEnroll}
      disabled={loading}
      className="enrollment-button"
    >
      {loading ? 'Enrolling...' : 'Enroll Now'}
    </button>
  );
};

export default EnrollmentButton;