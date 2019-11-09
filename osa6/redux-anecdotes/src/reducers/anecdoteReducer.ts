import { VoteAction, Anecdote, NewAnecdoteAction, InitAction } from '../types'
import Axios from 'axios'
import { ThunkDispatch } from 'redux-thunk'
import { StateType } from '../store'
import { Dispatch } from 'redux'

export const getId = () => (100000 * Math.random()).toFixed(0)

export const doCreate = (content: string): (dispatch: ThunkDispatch<StateType, undefined, NewAnecdoteAction>) => Promise<void> => {
  return async (dispatch: Dispatch) => {
    const { data: anecdote } = await Axios.post<Anecdote>('http://localhost:3001/anecdotes', { content, votes: 0 })
    dispatch({ type: "NEW", ...anecdote })
  }
}
export const doVote = (id: string): VoteAction => ({ id, type: "VOTE" })


const reducer = (state: Anecdote[] = [], action: VoteAction | NewAnecdoteAction | InitAction) => {
  let newState: Anecdote[] | undefined = undefined
  switch (action.type) {
    case 'VOTE':
      {
        const index = state.findIndex(({ id }) => id === action.id)
        if (index === -1)
          break
        let copy = [...state]
        copy[index] = { ...state[index], votes: state[index].votes + 1 }
        newState = copy
        break
      }
    case 'NEW':
      {
        const { type, ...anecdote } = action
        newState = state.concat(anecdote)
        break
      }
    case 'INIT':
      {
        newState = action.anecdotes
        break
      }
  }

  if (!newState)
    newState = [...state]

  console.log('state now: ', state)
  console.log('action', action)

  newState.sort((a, b) => b.votes - a.votes)
  return newState
}

export default reducer