import './FilterBar.css';

const FilterBar = ({ filters, onFilterChange }) => {
  const categories = ['Web Development', 'Data Science', 'Design', 'Marketing', 'Business'];
  const difficulties = ['beginner', 'intermediate', 'advanced'];

  return (
    <div className="filter-bar">
      <div className="filter-bar-controls">
        <div className="filter-group">
          <label className="filter-label">Category</label>
          <select
            value={filters.category || ''}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label">Difficulty</label>
          <select
            value={filters.difficulty || ''}
            onChange={(e) => onFilterChange({ ...filters, difficulty: e.target.value })}
            className="filter-select"
          >
            <option value="">All Levels</option>
            {difficulties.map(diff => (
              <option key={diff} value={diff}>{diff.charAt(0).toUpperCase() + diff.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label">Search</label>
          <input
            type="text"
            placeholder="Search courses..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="filter-input"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;