import { createStore, combineReducers, applyMiddleware } from 'redux'
import notification from './reducers/notification'
import thunk from 'redux-thunk'


const reducer = combineReducers({
  notification
})

const store = createStore(reducer, applyMiddleware(thunk))

export type AppState = ReturnType<typeof reducer>

export default store

