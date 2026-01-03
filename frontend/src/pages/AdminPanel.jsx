import { useState, useEffect } from 'react';
import api from '../utils/api';

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
    return <div className="text-center py-8">Loading admin panel...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>

      <div className="mb-6">
        <nav className="flex space-x-4">
          {['courses', 'users', 'reports'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'courses' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Courses</h2>
            <button
              onClick={() => setShowCourseForm(!showCourseForm)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {showCourseForm ? 'Cancel' : 'Add Course'}
            </button>
          </div>

          {showCourseForm && (
            <form onSubmit={handleCourseSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Slug"
                  value={courseForm.slug}
                  onChange={(e) => setCourseForm({...courseForm, slug: e.target.value})}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={courseForm.price}
                  onChange={(e) => setCourseForm({...courseForm, price: e.target.value})}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={courseForm.category}
                  onChange={(e) => setCourseForm({...courseForm, category: e.target.value})}
                  className="border p-2 rounded"
                  required
                />
                <select
                  value={courseForm.difficulty}
                  onChange={(e) => setCourseForm({...courseForm, difficulty: e.target.value})}
                  className="border p-2 rounded"
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
                  className="border p-2 rounded"
                />
              </div>
              <textarea
                placeholder="Description"
                value={courseForm.description}
                onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                className="border p-2 rounded w-full mt-4"
                rows="3"
                required
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
                Create Course
              </button>
            </form>
          )}

          <div className="grid gap-4">
            {courses.map(course => (
              <div key={course._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{course.title}</h3>
                  <p className="text-gray-600">{course.description}</p>
                </div>
                <button
                  onClick={() => deleteCourse(course._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
          <h2 className="text-2xl font-semibold mb-6">Users</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
          <h2 className="text-2xl font-semibold mb-6">Reports</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600">{reports.totalUsers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Total Courses</h3>
              <p className="text-3xl font-bold text-green-600">{reports.totalCourses}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Total Enrollments</h3>
              <p className="text-3xl font-bold text-purple-600">{reports.totalEnrollments}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;