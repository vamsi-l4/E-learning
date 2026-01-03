import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import CourseCard from '../components/CourseCard';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import './CourseList.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    category: searchParams.get('category') || '',
    difficulty: searchParams.get('difficulty') || '',
    search: searchParams.get('search') || '',
    page: parseInt(searchParams.get('page')) || 1
  };

  useEffect(() => {
    fetchCourses();
  }, [searchParams]);

  const fetchCourses = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.difficulty) params.append('difficulty', filters.difficulty);
      if (filters.search) params.append('search', filters.search);
      params.append('page', filters.page);
      params.append('limit', 9); // 9 courses per page

      const res = await api.get(`/courses?${params}`);
      setCourses(res.data.courses || res.data);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(res.data.currentPage || 1);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.difficulty) params.set('difficulty', newFilters.difficulty);
    if (newFilters.search) params.set('search', newFilters.search);
    params.set('page', 1); // Reset to page 1 when filtering
    setSearchParams(params);
  };

  if (loading) {
    return (
      <div className="course-list-container">
        <div className="course-list-loading">
          <div className="course-list-loading-text">Loading amazing courses...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="course-list-container">
      <div className="course-list-header">
        <h1 className="course-list-title">Explore Courses</h1>
        <p className="course-list-subtitle">
          Discover your next learning adventure from our curated collection of expert-led courses
        </p>
      </div>

      <FilterBar filters={filters} onFilterChange={handleFilterChange} />

      {courses.length === 0 ? (
        <div className="course-list-empty">
          <h2 className="course-list-empty-text">No courses found</h2>
          <p className="course-list-empty-suggestion">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
        </div>
      ) : (
        <>
          <div className="course-grid">
            {courses.map(course => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </>
      )}
    </div>
  );
};

export default CourseList;