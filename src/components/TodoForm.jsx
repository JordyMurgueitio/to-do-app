import { useState } from 'react'
import './TodoForm.css'

function TodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('')
  const [priority, setPriority] = useState('medium')
  const [category, setCategory] = useState('Personal')
  const [dueDate, setDueDate] = useState('')

  const categories = ['Personal', 'Work', 'Learning', 'Projects', 'Other']

  const handleSubmit = (e) => {
    e.preventDefault()
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
      onAddTodo(newTodo)
      setInputValue('')
      setDueDate('')
      setPriority('medium')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form">
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
  )
}

export default TodoForm
