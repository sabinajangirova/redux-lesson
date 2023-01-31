import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount } from './counterSlice'

export function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <div>
        <input id="amount-input" type="number" />
        <button
          aria-label="Increment Value By Amount"
          onClick={() => dispatch(incrementByAmount(parseInt(document.getElementById('amount-input').value)))}
        >
          Increment By Amount
        </button>
      </div>
    </div>
  )
}