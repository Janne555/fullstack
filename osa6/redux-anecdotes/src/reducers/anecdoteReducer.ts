import { VoteAction, Anecdote, NewAnecdoteAction } from '../types'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

export const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote: string): Anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action: VoteAction | NewAnecdoteAction) => {
  switch (action.type) {
    case 'VOTE':
      {
        const index = state.findIndex(({ id }) => id === action.id)
        if (index === -1)
          return state
        let copy = [...state]
        copy[index] = { ...state[index], votes: state[index].votes + 1 }
        return copy
      }
    case 'NEW':
      {
        const { type, ...anecdote } = action
        return state.concat(anecdote)
      }
  }

  console.log('state now: ', state)
  console.log('action', action)

  return state
}

export default reducer