const initialState = []

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      return [...state, action.payload]
    }
    case 'todos/todoToggled': {
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo
        }

        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    }
    case 'todos/colorSelected': {
      const { color, todoId } = action.payload
      return state.map((todo) => {
        if (todo.id !== todoId) {
          return todo
        }

        return {
          ...todo,
          color,
        }
      })
    }
    case 'todos/todoDeleted': {
      return state.filter((todo) => todo.id !== action.payload)
    }
    case 'todos/allCompleted': {
      return state.map((todo) => {
        return { ...todo, completed: true }
      })
    }
    case 'todos/completedCleared': {
      return state.filter((todo) => !todo.completed)
    }
    case 'todos/todosLoaded': {
      return action.payload
    }
    default:
      return state
  }
}

// Thunk function
export async function fetchTodos(dispatch, getState) {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos')
  const data = await response.json()
  dispatch({ type: 'todos/todosLoaded', payload: data })
}

export function saveNewTodo(text) {
  return async function saveNewTodoThunk(dispatch, getState) {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', { 
      method: 'POST',
      body: JSON.stringify({
        title: text,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    const data = await response.json()
    dispatch({ type: 'todos/todoAdded', payload: data })
  }
}

export function deleteTodo(id){
  return async function deleteTodoThunk(dispatch, getState){
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json()
    dispatch({type:'todos/todoDeleted', payload:id})
  }
}