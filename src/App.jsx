import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Function to load todos from localStorage
  const loadTodos = () => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      return JSON.parse(savedTodos)
    }
    // Default todos if nothing in localStorage
    return [
      { id: 1, text: "Learn React basics", completed: false },
      { id: 2, text: "Build a todo app", completed: false },
      { id: 3, text: "Master React hooks", completed: false }
    ]
  }

  // State for managing todos
  const [todos, setTodos] = useState(loadTodos)
  
  // State for the input field
  const [inputValue, setInputValue] = useState('')
  
  // State for editing todos
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')
  
  // State for filtering todos
  const [filter, setFilter] = useState('all') // 'all', 'active', 'completed'
  
  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  
  // Calculate remaining todos
  const remainingTodos = todos.filter(todo => !todo.completed).length
  
  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true // 'all'
  })
  
  // Function to add a new todo
  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(), // Simple ID generation
        text: inputValue.trim(),
        completed: false
      }
      setTodos([...todos, newTodo])
      setInputValue('')
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
  return (
    <div className="app">
      <header className="app-header">
        <h1>My Todo App</h1>
        <p>Stay organized and get things done!</p>
      </header>
      
      <main className="app-main">
        <form onSubmit={handleSubmit} className="todo-input-section">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What needs to be done?"
            className="todo-input"
          />
          <button type="submit" className="add-btn">Add Todo</button>
        </form>
        
        <div className="todo-list-section">
          <div className="todo-stats">
            <span>{remainingTodos} items left</span>
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
              All
            </button>
            <button 
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button 
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
          
          <ul className="todo-list">
            {filteredTodos.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
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
                  <span onDoubleClick={() => startEdit(todo.id, todo.text)}>
                    {todo.text}
                  </span>
                )}
                <button 
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}

export default App
