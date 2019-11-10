import { User, Action, AppAsyncAction } from '../types'
import Axios from 'axios'

export const initUsers = (): AppAsyncAction<Action.SetUsers> => {
  return async (dispatch): Promise<void> => {
    const { data: users } = await Axios.get('/api/user')
    dispatch({ type: 'SET_USERS', users })
  }
}

function users(state: User[] = [], { type, ...content }: Action.SetUsers): User[] {
  switch (type) {
    case 'SET_USERS':
      return content.users
    default:
      return state
  }
}

export default users