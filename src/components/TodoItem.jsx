import { useState } from 'react'
import './TodoItem.css'

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.text)

  const isOverdue = (dueDate, completed) => {
    if (!dueDate || completed) return false
    return new Date(dueDate) < new Date().setHours(0,0,0,0)
  }

  const isDueToday = (dueDate) => {
    if (!dueDate) return false
    const today = new Date().setHours(0,0,0,0)
    const due = new Date(dueDate).setHours(0,0,0,0)
    return today === due
  }

  const handleSave = () => {
    if (editValue.trim() !== '') {
      onEdit(todo.id, editValue.trim())
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditValue(todo.text)
    setIsEditing(false)
  }

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  return (
    <li 
      className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}
    >
      <input 
        type="checkbox" 
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      
      <div className="todo-content">
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave()
              if (e.key === 'Escape') handleCancel()
            }}
            onBlur={handleSave}
            className="edit-input"
            autoFocus
          />
        ) : (
          <>
            <span 
              className="todo-text"
              onDoubleClick={handleDoubleClick}
            >
              {todo.text}
            </span>
            <div className="todo-meta">
              {todo.category && (
                <span className="todo-category">{todo.category}</span>
              )}
              {todo.dueDate && (
                <span className={`todo-date ${isOverdue(todo.dueDate, todo.completed) ? 'overdue' : isDueToday(todo.dueDate) ? 'due-today' : ''}`}>
                  {isOverdue(todo.dueDate, todo.completed) ? '⚠️ ' : isDueToday(todo.dueDate) ? '📅 ' : ''}
                  {new Date(todo.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              )}
              <span className={`priority-badge priority-${todo.priority}`}>
                {todo.priority}
              </span>
            </div>
          </>
        )}
      </div>
      
      <button 
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        title="Delete task"
      >
        ✕
      </button>
    </li>
  )
}

export default TodoItem
