import { UpdateAction, Anecdote, NewAnecdoteAction, InitAction } from '../types'
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
export const doVote = ({ id, votes, ...rest }: Anecdote): (dispatch: ThunkDispatch<StateType, undefined, UpdateAction>) => Promise<void> => {
  return async (dispatch: Dispatch) => {
    const { data: anecdote } = await Axios.put<Anecdote>(`http://localhost:3001/anecdotes/${id}`, { ...rest, votes: votes + 1 })
    dispatch(({ id, type: "UPDATE", anecdote }))
  }
}


const reducer = (state: Anecdote[] = [], action: UpdateAction | NewAnecdoteAction | InitAction) => {
  let newState: Anecdote[] | undefined = undefined
  switch (action.type) {
    case 'UPDATE':
      {
        const index = state.findIndex(({ id }) => id === action.anecdote.id)
        if (index === -1)
          break
        let copy = [...state]
        copy[index] = action.anecdote
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