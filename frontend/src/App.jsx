import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import CourseList from './pages/CourseList';
import CourseDetail from './pages/CourseDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
