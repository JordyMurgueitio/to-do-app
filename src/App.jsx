import { useState, useEffect } from 'react'
import './App.css'
import TodoForm from './components/TodoForm'
import SearchBar from './components/SearchBar'
import FilterButtons from './components/FilterButtons'
import TodoList from './components/TodoList'

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
  
  // State for filtering todos
  const [filter, setFilter] = useState('all') // 'all', 'active', 'completed'
  const [searchTerm, setSearchTerm] = useState('')
  
  // State for sorting todos
  const [sortBy, setSortBy] = useState('created') // 'created', 'category', 'priority', 'dueDate'
  
  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])
  
  // Calculate remaining todos
  const remainingTodos = todos.filter(todo => !todo.completed).length
  
  // Function to add a new todo
  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo])
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
  
  // Function to edit a todo
  const editTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>✓ My Tasks</h1>
        <p>Organize your day, one task at a time</p>
      </header>
      
      <main className="app-main">
        <TodoForm onAddTodo={addTodo} />
        
        <div className="todo-list-section">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          
          <FilterButtons
            filter={filter}
            onFilterChange={setFilter}
            totalCount={todos.length}
            activeCount={remainingTodos}
            completedCount={todos.length - remainingTodos}
          />
          
          <TodoList
            todos={todos}
            searchTerm={searchTerm}
            filter={filter}
            sortBy={sortBy}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            onClearCompleted={clearCompleted}
            onSortChange={setSortBy}
          />
        </div>
      </main>
    </div>
  )
}

export default App
