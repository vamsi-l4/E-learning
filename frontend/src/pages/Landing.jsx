import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="landing-hero">
        <h1 className="landing-hero-title">
          Learn New Skills Online
        </h1>
        <p className="landing-hero-subtitle">
          Discover courses from top instructors and advance your career
        </p>
        <Link
          to="/courses"
          className="landing-hero-button"
        >
          Browse Courses
        </Link>
      </div>

      <div className="landing-features">
        <div className="landing-feature-card">
          <h3 className="landing-feature-title">Expert Instructors</h3>
          <p className="landing-feature-description">
            Learn from industry professionals with years of experience
          </p>
        </div>
        <div className="landing-feature-card">
          <h3 className="landing-feature-title">Flexible Learning</h3>
          <p className="landing-feature-description">
            Study at your own pace with lifetime access to courses
          </p>
        </div>
        <div className="landing-feature-card">
          <h3 className="landing-feature-title">Career Advancement</h3>
          <p className="landing-feature-description">
            Gain skills that employers are looking for
          </p>
        </div>
      </div>

      <div className="landing-categories">
        <h2 className="landing-categories-title">Popular Categories</h2>
        <div className="landing-categories-grid">
          {['Web Development', 'Data Science', 'Design', 'Marketing'].map(category => (
            <Link
              key={category}
              to={`/courses?category=${encodeURIComponent(category)}`}
              className="landing-category-link"
            >
              <h4 className="landing-category-title">{category}</h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;