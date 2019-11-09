import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { Provider } from 'react-redux'
import axios from 'axios'
import { Anecdote } from './types'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(reducer)
export type StoreType = typeof store
export type StateType = ReturnType<typeof reducer>

axios
  .get<Anecdote[]>('http://localhost:3001/anecdotes')
  .then(({ data }) => {
    data.forEach(anecdote => store.dispatch({ type: "NEW", ...anecdote }))
  })

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider >,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)