import TodoItem from './TodoItem'
import './TodoList.css'

function TodoList({ 
  todos, 
  searchTerm, 
  filter,
  onToggle, 
  onDelete, 
  onEdit,
  onClearCompleted 
}) {
  const remainingTodos = todos.filter(todo => !todo.completed).length

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

      {filteredTodos.length === 0 ? (
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
          {filteredTodos.map(todo => (
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
