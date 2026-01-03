const FilterBar = ({ filters, onFilterChange }) => {
  const categories = ['Web Development', 'Data Science', 'Design', 'Marketing', 'Business'];
  const difficulties = ['beginner', 'intermediate', 'advanced'];

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={filters.category || ''}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
          <select
            value={filters.difficulty || ''}
            onChange={(e) => onFilterChange({ ...filters, difficulty: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">All Levels</option>
            {difficulties.map(diff => (
              <option key={diff} value={diff}>{diff.charAt(0).toUpperCase() + diff.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            placeholder="Search courses..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;