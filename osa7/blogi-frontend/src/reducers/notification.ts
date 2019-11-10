import { Action, State, AppAsyncAction } from '../types'

export const clearNotification = (): Action.SetNotification => ({ type: 'SET_NOTIFICATION', message: '', error: false })

export const setNotification = (message: string, error?: boolean): AppAsyncAction<Action.SetNotification> => {
  return async (dispatch): Promise<void> => {
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