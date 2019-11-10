import { Action, State, AppDispatch } from '../types'
import { AppState } from '../store'
import { ThunkDispatch } from 'redux-thunk'

export const clearNotification = (): Action.SetNotification => ({ type: 'SET_NOTIFICATION', message: '', error: false })

export const setNotification = (message: string, error?: boolean): (dispatch: ThunkDispatch<AppState, undefined, Action.SetNotification>) => Promise<void> => {
  return async (dispatch: AppDispatch): Promise<void> => {
    dispatch(({ type: 'SET_NOTIFICATION', message, error: error ? true : false }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}


export default function notification(state = { message: '', error: false }, { type, ...content }: Action.SetNotification): State.Notification {
  switch (type) {
    case 'SET_NOTIFICATION':
      return content
    default:
      return state
  }
}