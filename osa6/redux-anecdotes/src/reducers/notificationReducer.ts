import { SetNotificationAction } from '../types'

export const setNotification = (content: string): SetNotificationAction => ({ type: "SET_NOTIFICATION", content })

function notificationReducer(state = "", action: SetNotificationAction) {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.content
    default:
      return state
  }
}

export default notificationReducer