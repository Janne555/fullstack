import { VoteAction, Anecdote, NewAnecdoteAction } from '../types'

export const getId = () => (100000 * Math.random()).toFixed(0)

export const doCreate = (content: string): NewAnecdoteAction => ({ type: "NEW", id: getId(), content, votes: 0 })
export const doVote = (id: string): VoteAction => ({ id, type: "VOTE" })


const reducer = (state: Anecdote[] = [], action: VoteAction | NewAnecdoteAction) => {
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
  }

  if (!newState)
    newState = [...state]

  console.log('state now: ', state)
  console.log('action', action)

  newState.sort((a, b) => b.votes - a.votes)
  return newState
}

export default reducer