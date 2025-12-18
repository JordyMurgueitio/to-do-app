import './FilterButtons.css'

function FilterButtons({ filter, onFilterChange, totalCount, activeCount, completedCount }) {
  return (
    <div className="filter-buttons">
      <button 
        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        All ({totalCount})
      </button>
      <button 
        className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
        onClick={() => onFilterChange('active')}
      >
        Active ({activeCount})
      </button>
      <button 
        className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
        onClick={() => onFilterChange('completed')}
      >
        Done ({completedCount})
      </button>
    </div>
  )
}

export default FilterButtons
