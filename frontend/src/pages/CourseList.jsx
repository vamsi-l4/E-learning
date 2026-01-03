import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import CourseCard from '../components/CourseCard';
import FilterBar from '../components/FilterBar';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    category: searchParams.get('category') || '',
    difficulty: searchParams.get('difficulty') || '',
    search: searchParams.get('search') || ''
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

      const res = await api.get(`/courses?${params}`);
      setCourses(res.data);
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
    setSearchParams(params);
  };

  if (loading) {
    return <div className="text-center py-8">Loading courses...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Courses</h1>
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      {courses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No courses found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;