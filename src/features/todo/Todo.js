import React from 'react'
import { useSelector, useDispatch, } from 'react-redux'
import { saveNewTodo, deleteTodo } from './todosSlice'
import { useState } from 'react'
// import { addTodo, removeToDo } from './todoSlice'

export function Todo() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos)
  let processedTodos = Object.values(todos)

  const handleChange = e => setText(e.target.value)
  const handleKeyDown = e => {
    // If the user pressed the Enter key:
    const trimmedText = text.trim()
    if (e.which === 13 && trimmedText) {
      // Then dispatch the thunk function itself
      dispatch(saveNewTodo(trimmedText))
      setText('')
    }
  }
  
  const handleButtonClick = id =>{
    dispatch(deleteTodo(id))
  }

  return (
    <div>
      <input className='border border-purple-500 border-t-2 bg-red-300' id="task-input" type="text" onKeyDown={handleKeyDown} value={text} onChange={handleChange} placeholder='Enter new task' />
      {/* <button onClick={() => {
            dispatch(addTodo(document.getElementById('task-input').value));
            document.getElementById('task-input').value = '';
        }} >Add todo</button> */}
      <ul>
        {
            processedTodos.map(function(listItem, index){
                return (
                  <>
                    <li className='text-rainbow' key={index} >{listItem.title}  </li>
                    <button className='bg-green-400 rounded p-2 lg:bg-yellow-400 hover:-skew-y-6 text-white' onClick={() => handleButtonClick(listItem.id)} >Delete</button>
                  </>
                )
            })
        }
      </ul>
    </div>
  )
}