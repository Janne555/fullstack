import { VoteAction, Anecdote, NewAnecdoteAction, InitAction } from '../types'
import Axios from 'axios'

export const getId = () => (100000 * Math.random()).toFixed(0)

export const doCreate = (content: string): NewAnecdoteAction => {
  const anecdote = { id: getId(), content, votes: 0 }
  Axios.post('http://localhost:3001/anecdotes', anecdote)
  return { type: "NEW", ...anecdote }
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