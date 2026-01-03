import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import EnrollmentButton from '../components/EnrollmentButton';

const CourseDetail = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
    if (user) fetchEnrollments();
  }, [slug, user]);

  const fetchCourse = async () => {
    try {
      const res = await api.get(`/courses/slug/${slug}`);
      setCourse(res.data);
    } catch (error) {
      console.error('Failed to fetch course:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const res = await api.get('/enrollments/me');
      setEnrollments(res.data);
    } catch (error) {
      console.error('Failed to fetch enrollments:', error);
    }
  };

  const isEnrolled = enrollments.some(enrollment => enrollment.courseId._id === course?._id);

  if (loading) {
    return <div className="text-center py-8">Loading course...</div>;
  }

  if (!course) {
    return <div className="text-center py-8">Course not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        {course.thumbnailUrl && (
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {course.category}
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm capitalize">
              {course.difficulty}
            </span>
            <span className="text-2xl font-bold text-green-600">${course.price}</span>
          </div>
          <p className="text-gray-700 mb-6">{course.description}</p>
          <EnrollmentButton
            courseId={course._id}
            isEnrolled={isEnrolled}
            onEnroll={fetchEnrollments}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Course Syllabus</h2>
        <div className="space-y-4">
          {course.lessons
            .sort((a, b) => a.order - b.order)
            .map((lesson, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-lg">{lesson.title}</h3>
                <div
                  className="text-gray-600 mt-2"
                  dangerouslySetInnerHTML={{ __html: lesson.contentHtml }}
                />
                {lesson.videoUrl && (
                  <a
                    href={lesson.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
                  >
                    Watch Video
                  </a>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;