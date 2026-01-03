import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="text-center">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-4 rounded-lg mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Learn New Skills Online
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Discover courses from top instructors and advance your career
        </p>
        <Link
          to="/courses"
          className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Browse Courses
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Expert Instructors</h3>
          <p className="text-gray-600">
            Learn from industry professionals with years of experience
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Flexible Learning</h3>
          <p className="text-gray-600">
            Study at your own pace with lifetime access to courses
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Career Advancement</h3>
          <p className="text-gray-600">
            Gain skills that employers are looking for
          </p>
        </div>
      </div>

      <div className="bg-gray-100 py-12 px-4 rounded-lg">
        <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {['Web Development', 'Data Science', 'Design', 'Marketing'].map(category => (
            <Link
              key={category}
              to={`/courses?category=${encodeURIComponent(category)}`}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h4 className="font-semibold">{category}</h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;