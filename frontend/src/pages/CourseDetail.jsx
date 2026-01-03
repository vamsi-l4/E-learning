import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import EnrollmentButton from '../components/EnrollmentButton';
import './CourseDetail.css';

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
    return <div className="course-detail-loading">Loading course...</div>;
  }

  if (!course) {
    return <div className="course-detail-not-found">Course not found</div>;
  }

  return (
    <div className="course-detail-container">
      <div className="course-detail-card">
        {course.thumbnailUrl && (
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="course-detail-image"
          />
        )}
        <div className="course-detail-content">
          <h1 className="course-detail-title">{course.title}</h1>
          <div className="course-detail-meta">
            <span className="course-detail-badge category">
              {course.category}
            </span>
            <span className="course-detail-badge difficulty">
              {course.difficulty}
            </span>
            <span className="course-detail-price">${course.price}</span>
          </div>
          <p className="course-detail-description">{course.description}</p>
          <EnrollmentButton
            courseId={course._id}
            isEnrolled={isEnrolled}
            onEnroll={fetchEnrollments}
          />
        </div>
      </div>

      <div className="course-syllabus">
        <h2 className="course-syllabus-title">Course Syllabus</h2>
        <div className="course-lessons">
          {course.lessons
            .sort((a, b) => a.order - b.order)
            .map((lesson, index) => (
              <div key={index} className="course-lesson">
                <h3 className="course-lesson-title">{lesson.title}</h3>
                <div
                  className="course-lesson-content"
                  dangerouslySetInnerHTML={{ __html: lesson.contentHtml }}
                />
                {lesson.videoUrl && (
                  <a
                    href={lesson.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="course-lesson-video-link"
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