import { createStore, combineReducers, applyMiddleware } from 'redux'
import notification from './reducers/notification'
import thunk from 'redux-thunk'
import blogs from './reducers/blogs'
import user from './reducers/user'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  notification,
  blogs,
  user
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export type AppState = ReturnType<typeof reducer>

export default store

