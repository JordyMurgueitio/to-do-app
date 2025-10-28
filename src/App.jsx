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
  
  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  
  // Calculate remaining todos
  const remainingTodos = todos.filter(todo => !todo.completed).length
  
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
          </div>
          
          <ul className="todo-list">
            {todos.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input 
                  type="checkbox" 
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span>{todo.text}</span>
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
