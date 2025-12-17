import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Function to load todos from localStorage
  const loadTodos = () => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      return JSON.parse(savedTodos)
    }
    // Default todos with more details
    return [
      { 
        id: 1, 
        text: "Learn React basics", 
        completed: false,
        priority: 'high',
        category: 'Learning',
        dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
        createdAt: Date.now()
      },
      { 
        id: 2, 
        text: "Build a todo app", 
        completed: false,
        priority: 'medium',
        category: 'Projects',
        dueDate: '',
        createdAt: Date.now()
      },
      { 
        id: 3, 
        text: "Master React hooks", 
        completed: false,
        priority: 'low',
        category: 'Learning',
        dueDate: '',
        createdAt: Date.now()
      }
    ]
  }

  // State for managing todos
  const [todos, setTodos] = useState(loadTodos)
  
  // State for the input field
  const [inputValue, setInputValue] = useState('')
  const [priority, setPriority] = useState('medium')
  const [category, setCategory] = useState('Personal')
  const [dueDate, setDueDate] = useState('')
  
  // State for editing todos
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')
  
  // State for filtering todos
  const [filter, setFilter] = useState('all') // 'all', 'active', 'completed'
  const [searchTerm, setSearchTerm] = useState('')
  
  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  
  // Calculate remaining todos
  const remainingTodos = todos.filter(todo => !todo.completed).length
  
  // Filter and search todos
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
  
  // Check if task is overdue
  const isOverdue = (dueDate, completed) => {
    if (!dueDate || completed) return false
    return new Date(dueDate) < new Date().setHours(0,0,0,0)
  }
  
  // Check if due today
  const isDueToday = (dueDate) => {
    if (!dueDate) return false
    const today = new Date().setHours(0,0,0,0)
    const due = new Date(dueDate).setHours(0,0,0,0)
    return today === due
  }
  
  // Function to add a new todo
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        priority: priority,
        category: category,
        dueDate: dueDate,
        createdAt: Date.now()
      }
      setTodos([...todos, newTodo])
      setInputValue('')
      setDueDate('')
      setPriority('medium')
    }
  }
  
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    addTodo()
  }
  
  // Function to toggle todo completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }
  
  // Function to delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  
  // Function to clear all completed todos
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }
  
  // Function to start editing a todo
  const startEdit = (id, text) => {
    setEditingId(id)
    setEditValue(text)
  }
  
  // Function to save edited todo
  const saveEdit = () => {
    if (editValue.trim() !== '') {
      setTodos(todos.map(todo => 
        todo.id === editingId ? { ...todo, text: editValue.trim() } : todo
      ))
    }
    setEditingId(null)
    setEditValue('')
  }
  
  // Function to cancel editing
  const cancelEdit = () => {
    setEditingId(null)
    setEditValue('')
  }
  
  // Get unique categories
  const categories = ['Personal', 'Work', 'Learning', 'Projects', 'Other']
  
  return (
    <div className="app">
      <header className="app-header">
        <h1>✓ My Tasks</h1>
        <p>Organize your day, one task at a time</p>
      </header>
      
      <main className="app-main">
        <form onSubmit={handleSubmit} className="todo-input-section">
          <div className="input-row">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What needs to be done?"
              className="todo-input"
            />
            <button type="submit" className="add-btn">+ Add</button>
          </div>
          
          <div className="input-options">
            <select 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
              className="priority-select"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="category-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            
            <input 
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="date-input"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </form>
        
        <div className="todo-list-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="todo-stats">
            <span className="stats-text">
              {remainingTodos} {remainingTodos === 1 ? 'task' : 'tasks'} remaining
            </span>
            {todos.some(todo => todo.completed) && (
              <button 
                className="clear-completed-btn"
                onClick={clearCompleted}
              >
                Clear Completed
              </button>
            )}
          </div>
          
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({todos.length})
            </button>
            <button 
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active ({remainingTodos})
            </button>
            <button 
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Done ({todos.length - remainingTodos})
            </button>
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
                <li 
                  key={todo.id} 
                  className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}
                >
                  <input 
                    type="checkbox" 
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="todo-checkbox"
                  />
                  
                  <div className="todo-content">
                    {editingId === todo.id ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEdit()
                          if (e.key === 'Escape') cancelEdit()
                        }}
                        onBlur={saveEdit}
                        className="edit-input"
                        autoFocus
                      />
                    ) : (
                      <>
                        <span 
                          className="todo-text"
                          onDoubleClick={() => startEdit(todo.id, todo.text)}
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
                    onClick={() => deleteTodo(todo.id)}
                    title="Delete task"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
          
          <div className="keyboard-hint">
            <small>💡 Tip: Double-click a task to edit • Press Enter to save • Esc to cancel</small>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
