import { Link, useSearchParams } from 'react-router-dom';
import './Pagination.css';

const Pagination = ({ totalPages, currentPage }) => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const getPageLink = (page) => {
    params.set('page', page);
    return `/courses?${params}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination-container">
      <nav className="pagination-nav">
        {currentPage > 1 && (
          <Link
            to={getPageLink(currentPage - 1)}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Previous
          </Link>
        )}

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <Link
            key={page}
            to={getPageLink(page)}
            className={`pagination-link ${page === currentPage ? 'active' : ''}`}
          >
            {page}
          </Link>
        ))}

        {currentPage < totalPages && (
          <Link
            to={getPageLink(currentPage + 1)}
            className="pagination-link"
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Pagination;