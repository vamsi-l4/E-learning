import { Link, useSearchParams } from 'react-router-dom';

const Pagination = ({ totalPages, currentPage }) => {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const getPageLink = (page) => {
    params.set('page', page);
    return `/courses?${params}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8">
      <nav className="flex items-center space-x-2">
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
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              page === currentPage
                ? 'text-blue-600 bg-blue-50 border border-blue-500'
                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </Link>
        ))}

        {currentPage < totalPages && (
          <Link
            to={getPageLink(currentPage + 1)}
            className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Pagination;