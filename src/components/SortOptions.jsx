import './SortOptions.css'

function SortOptions({ sortBy, onSortChange }) {
  return (
    <div className="sort-options">
      <label htmlFor="sort-select" className="sort-label">
        Sort by:
      </label>
      <select 
        id="sort-select"
        value={sortBy} 
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        <option value="created">Date Created</option>
        <option value="category">Category</option>
        <option value="priority">Priority</option>
        <option value="dueDate">Due Date</option>
      </select>
    </div>
  )
}

export default SortOptions
