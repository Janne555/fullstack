import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { Provider } from 'react-redux'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(reducer)
export type StoreType = typeof store
export type StateType = ReturnType<typeof reducer>

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App store={store} />
    </Provider >,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)