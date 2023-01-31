import { applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducer'
import { configureStore } from '@reduxjs/toolkit'

const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
  // other store enhancers if any
)

const store = configureStore({
  reducer:rootReducer, 
  enhancer:composedEnhancer
})
export default store
