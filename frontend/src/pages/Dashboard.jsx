import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const res = await api.get('/enrollments/me');
      setEnrollments(res.data);
    } catch (error) {
      console.error('Failed to fetch enrollments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (enrollmentId, lessonId, completed) => {
    try {
      await api.put(`/enrollments/${enrollmentId}/progress`, {
        lessonId,
        completed
      });
      fetchEnrollments(); // Refresh data
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  return (
    <div>
      <h1 className="dashboard-title">My Dashboard</h1>

      {enrollments.length === 0 ? (
        <div className="dashboard-empty">
          <p className="dashboard-empty-text">You haven't enrolled in any courses yet.</p>
          <Link
            to="/courses"
            className="dashboard-browse-btn"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="dashboard-enrollments">
          {enrollments.map(enrollment => (
            <div key={enrollment._id} className="enrollment-card">
              <div className="enrollment-header">
                <div>
                  <h2 className="enrollment-course-title">
                    <Link
                      to={`/courses/${enrollment.courseId.slug}`}
                      className="enrollment-course-link"
                    >
                      {enrollment.courseId.title}
                    </Link>
                  </h2>
                  <p className="enrollment-course-desc">{enrollment.courseId.description}</p>
                </div>
                <span className="enrollment-date">
                  Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                </span>
              </div>

              <div className="enrollment-lessons">
                <h3 className="enrollment-lessons-title">Lessons</h3>
                <div className="enrollment-lessons-list">
                  {enrollment.courseId.lessons
                    .sort((a, b) => a.order - b.order)
                    .map(lesson => {
                      const isCompleted = enrollment.progress[lesson._id] || false;
                      return (
                        <div key={lesson._id} className="lesson-item">
                          <div className="lesson-item-left">
                            <input
                              type="checkbox"
                              checked={isCompleted}
                              onChange={(e) => updateProgress(enrollment._id, lesson._id, e.target.checked)}
                              className="lesson-checkbox"
                            />
                            <span className={`lesson-text ${isCompleted ? 'completed' : ''}`}>
                              {lesson.title}
                            </span>
                          </div>
                          {lesson.videoUrl && (
                            <a
                              href={lesson.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="lesson-video-link"
                            >
                              Watch
                            </a>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="enrollment-progress">
                Progress: {Object.values(enrollment.progress).filter(Boolean).length} / {enrollment.courseId.lessons.length} lessons completed
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;