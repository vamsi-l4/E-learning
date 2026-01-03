import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

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
        className="bg-green-500 text-white px-6 py-3 rounded-lg cursor-not-allowed"
      >
        Enrolled
      </button>
    );
  }

  return (
    <button
      onClick={handleEnroll}
      disabled={loading}
      className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
    >
      {loading ? 'Enrolling...' : 'Enroll Now'}
    </button>
  );
};

export default EnrollmentButton;