import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CourseCard from './components/CourseCard';

const mockCourse = {
  _id: '1',
  title: 'Test Course',
  slug: 'test-course',
  description: 'A test course description',
  price: 49.99,
  category: 'Web Development',
  difficulty: 'beginner',
  thumbnailUrl: 'https://example.com/image.jpg'
};

describe('CourseCard', () => {
  it('renders course information', () => {
    render(<CourseCard course={mockCourse} />);
    
    expect(screen.getByText('Test Course')).toBeInTheDocument();
    expect(screen.getByText('A test course description')).toBeInTheDocument();
    expect(screen.getByText('$49.99')).toBeInTheDocument();
    expect(screen.getByText('Web Development')).toBeInTheDocument();
    expect(screen.getByText('beginner')).toBeInTheDocument();
  });
});