import { Action, State, AppAsyncAction, Credentials } from '../types'
import * as services from '../services/services'
import { setNotification } from './notification'


export const setUser = (username: string, token: string): Action.SetUser => ({ type: 'SET_USER', username, token })

export const login = (credentials: Credentials): AppAsyncAction<Action.SetUser> => {
  return async (dispatch): Promise<void> => {
    try {
      const { username, token } = await services.login(credentials)
      window.localStorage.setItem('username', username)
      window.localStorage.setItem('token', token)
      dispatch(setUser(username, token))
      dispatch(setNotification(`logged in as ${username}`))
    } catch (error) {
      console.error(error)
      dispatch(setNotification('failed to login', true))
    }
  }
}

export const initUser = (): AppAsyncAction<Action.SetUser> => {
  return async (dispatch): Promise<void> => {
    const token = window.localStorage.getItem('token')
    const username = window.localStorage.getItem('username')
    if (token && username) {
      dispatch(setUser(username, token))
    }
  }
}

export const logout = (): Action.Logout => {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('username')
  return { type: 'LOGOUT' }
}

function user(state: State.User = {}, { type, ...content }: Action.UserAction): State.User {
  switch (type) {
    case 'SET_USER':
      return content
    case 'LOGOUT':
      return {}
    default:
      return state
  }
}

export default user