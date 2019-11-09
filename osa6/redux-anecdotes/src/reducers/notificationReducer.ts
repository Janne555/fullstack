import { SetNotificationAction } from '../types'
import { ThunkDispatch } from 'redux-thunk'
import { StateType } from '../store'
import { Dispatch } from 'redux'

export const setNotification = (content: string, time: number): (dispatch: ThunkDispatch<StateType, undefined, SetNotificationAction>) => Promise<void> => {
  return async (dispatch: Dispatch) => {
    dispatch(({ type: "SET_NOTIFICATION", content }))
    setTimeout(() => {
      dispatch((({ type: "SET_NOTIFICATION", content: "" })))
    }, time)
  }
}

function notificationReducer(state = "", action: SetNotificationAction) {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.content
    default:
      return state
  }
}

export default notificationReducer