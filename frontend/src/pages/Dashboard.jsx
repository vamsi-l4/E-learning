import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

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
    return <div className="text-center py-8">Loading dashboard...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

      {enrollments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
          <Link
            to="/courses"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {enrollments.map(enrollment => (
            <div key={enrollment._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    <Link
                      to={`/courses/${enrollment.courseId.slug}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {enrollment.courseId.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600">{enrollment.courseId.description}</p>
                </div>
                <span className="text-sm text-gray-500">
                  Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                </span>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Lessons</h3>
                <div className="space-y-2">
                  {enrollment.courseId.lessons
                    .sort((a, b) => a.order - b.order)
                    .map(lesson => {
                      const isCompleted = enrollment.progress[lesson._id] || false;
                      return (
                        <div key={lesson._id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={isCompleted}
                              onChange={(e) => updateProgress(enrollment._id, lesson._id, e.target.checked)}
                              className="mr-3"
                            />
                            <span className={isCompleted ? 'line-through text-gray-500' : ''}>
                              {lesson.title}
                            </span>
                          </div>
                          {lesson.videoUrl && (
                            <a
                              href={lesson.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Watch
                            </a>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="text-sm text-gray-600">
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