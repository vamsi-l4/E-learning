import { useState, useEffect } from 'react';
import api from '../utils/api';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState({});
  const [loading, setLoading] = useState(true);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [courseForm, setCourseForm] = useState({
    title: '',
    slug: '',
    description: '',
    price: '',
    category: '',
    difficulty: 'beginner',
    thumbnailUrl: '',
    lessons: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesRes, usersRes, reportsRes] = await Promise.all([
        api.get('/courses'),
        api.get('/admin/users'),
        api.get('/admin/reports')
      ]);
      setCourses(coursesRes.data);
      setUsers(usersRes.data);
      setReports(reportsRes.data);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/courses', courseForm);
      setShowCourseForm(false);
      setCourseForm({
        title: '',
        slug: '',
        description: '',
        price: '',
        category: '',
        difficulty: 'beginner',
        thumbnailUrl: '',
        lessons: []
      });
      fetchData();
    } catch (error) {
      console.error('Failed to create course:', error);
    }
  };

  const deleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await api.delete(`/courses/${id}`);
        fetchData();
      } catch (error) {
        console.error('Failed to delete course:', error);
      }
    }
  };

  if (loading) {
    return <div className="admin-panel-loading">Loading admin panel...</div>;
  }

  return (
    <div className="admin-panel-container">
      <h1 className="admin-panel-title">Admin Panel</h1>

      <div className="admin-panel-tabs">
        {['courses', 'users', 'reports'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`admin-panel-tab ${activeTab === tab ? 'active' : ''}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'courses' && (
        <div>
          <div className="admin-panel-section-header">
            <h2 className="admin-panel-section-title">Courses</h2>
            <button
              onClick={() => setShowCourseForm(!showCourseForm)}
              className="admin-panel-add-button"
            >
              {showCourseForm ? 'Cancel' : 'Add Course'}
            </button>
          </div>

          {showCourseForm && (
            <form onSubmit={handleCourseSubmit} className="admin-panel-form">
              <div className="admin-panel-form-grid">
                <input
                  type="text"
                  placeholder="Title"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                  className="admin-panel-input"
                  required
                />
                <input
                  type="text"
                  placeholder="Slug"
                  value={courseForm.slug}
                  onChange={(e) => setCourseForm({...courseForm, slug: e.target.value})}
                  className="admin-panel-input"
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={courseForm.price}
                  onChange={(e) => setCourseForm({...courseForm, price: e.target.value})}
                  className="admin-panel-input"
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={courseForm.category}
                  onChange={(e) => setCourseForm({...courseForm, category: e.target.value})}
                  className="admin-panel-input"
                  required
                />
                <select
                  value={courseForm.difficulty}
                  onChange={(e) => setCourseForm({...courseForm, difficulty: e.target.value})}
                  className="admin-panel-select"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <input
                  type="url"
                  placeholder="Thumbnail URL"
                  value={courseForm.thumbnailUrl}
                  onChange={(e) => setCourseForm({...courseForm, thumbnailUrl: e.target.value})}
                  className="admin-panel-input"
                />
              </div>
              <textarea
                placeholder="Description"
                value={courseForm.description}
                onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                className="admin-panel-textarea"
                rows="3"
                required
              />
              <button type="submit" className="admin-panel-submit-button">
                Create Course
              </button>
            </form>
          )}

          <div className="admin-panel-courses-grid">
            {courses.map(course => (
              <div key={course._id} className="admin-panel-course-card">
                <div className="admin-panel-course-info">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                </div>
                <button
                  onClick={() => deleteCourse(course._id)}
                  className="admin-panel-delete-button"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div>
          <h2 className="admin-panel-users-title">Users</h2>
          <div className="admin-panel-table-container">
            <table className="admin-panel-table">
              <thead className="admin-panel-table-header">
                <tr>
                  <th className="admin-panel-table-header-cell">Name</th>
                  <th className="admin-panel-table-header-cell">Email</th>
                  <th className="admin-panel-table-header-cell">Role</th>
                  <th className="admin-panel-table-header-cell">Joined</th>
                </tr>
              </thead>
              <tbody className="admin-panel-table-body">
                {users.map(user => (
                  <tr key={user._id}>
                    <td className="admin-panel-table-cell">{user.name}</td>
                    <td className="admin-panel-table-cell">{user.email}</td>
                    <td className="admin-panel-table-cell">{user.role}</td>
                    <td className="admin-panel-table-cell">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'reports' && (
        <div>
          <h2 className="admin-panel-reports-title">Reports</h2>
          <div className="admin-panel-reports-grid">
            <div className="admin-panel-report-card">
              <h3 className="admin-panel-report-title">Total Users</h3>
              <p className="admin-panel-report-value users">{reports.totalUsers}</p>
            </div>
            <div className="admin-panel-report-card">
              <h3 className="admin-panel-report-title">Total Courses</h3>
              <p className="admin-panel-report-value courses">{reports.totalCourses}</p>
            </div>
            <div className="admin-panel-report-card">
              <h3 className="admin-panel-report-title">Total Enrollments</h3>
              <p className="admin-panel-report-value enrollments">{reports.totalEnrollments}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;