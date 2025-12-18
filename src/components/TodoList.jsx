import TodoItem from './TodoItem'
import SortOptions from './SortOptions'
import './TodoList.css'

function TodoList({ 
  todos, 
  searchTerm, 
  filter,
  sortBy,
  onToggle, 
  onDelete, 
  onEdit,
  onClearCompleted,
  onSortChange
}) {
  const remainingTodos = todos.filter(todo => !todo.completed).length

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    // Filter by completion status
    const statusMatch = filter === 'all' || 
                       (filter === 'active' && !todo.completed) || 
                       (filter === 'completed' && todo.completed)
    
    // Filter by search term
    const searchMatch = searchTerm === '' || 
                       todo.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (todo.category && todo.category.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return statusMatch && searchMatch
  })

  // Sort todos
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    switch (sortBy) {
      case 'category':
        return (a.category || '').localeCompare(b.category || '')
      
      case 'priority': {
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }
      
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate) - new Date(b.dueDate)
      
      case 'created':
      default:
        return b.createdAt - a.createdAt
    }
  })

  return (
    <div className="todo-list-container">
      <div className="todo-stats">
        <span className="stats-text">
          {remainingTodos} {remainingTodos === 1 ? 'task' : 'tasks'} remaining
        </span>
        {todos.some(todo => todo.completed) && (
          <button 
            className="clear-completed-btn"
            onClick={onClearCompleted}
          >
            Clear Completed
          </button>
        )}
      </div>

      <SortOptions sortBy={sortBy} onSortChange={onSortChange} />

      {sortedTodos.length === 0 ? (
        <div className="empty-state">
          <p>
            {searchTerm ? '🔍 No tasks match your search' : 
             filter === 'completed' ? '🎉 No completed tasks yet' :
             filter === 'active' ? '✨ All caught up!' :
             '📝 Start by adding a task above'}
          </p>
        </div>
      ) : (
        <ul className="todo-list">
          {sortedTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}

      <div className="keyboard-hint">
        <small>💡 Tip: Double-click a task to edit • Press Enter to save • Esc to cancel</small>
      </div>
    </div>
  )
}

export default TodoList
