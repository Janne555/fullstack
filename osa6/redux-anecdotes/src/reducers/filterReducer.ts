import { SetFilterAction } from '../types'

export const setFilter = (content: string): SetFilterAction => ({ type: "SET_FILTER", content })

function filterReducer(state = "", action: SetFilterAction) {
  switch (action.type) {
    case "SET_FILTER":
      return action.content
    default:
      return state
  }
}

export default filterReducer