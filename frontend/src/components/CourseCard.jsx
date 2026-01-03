import { Link } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      {course.thumbnailUrl && (
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="course-card-image"
        />
      )}
      <div className="course-card-content">
        <h3 className="course-card-title">
          <Link to={`/courses/${course.slug}`} className="course-card-title-link">
            {course.title}
          </Link>
        </h3>
        <p className="course-card-description">{course.description}</p>
        <div className="course-card-meta">
          <span className="course-card-meta-item">{course.category}</span>
          <span className="course-card-meta-item">{course.difficulty}</span>
        </div>
        <div className="course-card-footer">
          <span className="course-card-price">${course.price}</span>
          <Link
            to={`/courses/${course.slug}`}
            className="course-card-button"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;