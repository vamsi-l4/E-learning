import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {course.thumbnailUrl && (
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">
          <Link to={`/courses/${course.slug}`} className="text-blue-600 hover:text-blue-800">
            {course.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 capitalize">{course.category}</span>
          <span className="text-sm text-gray-500 capitalize">{course.difficulty}</span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-2xl font-bold text-green-600">${course.price}</span>
          <Link
            to={`/courses/${course.slug}`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;