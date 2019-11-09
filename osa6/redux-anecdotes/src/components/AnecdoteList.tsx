import React, { ReactElement } from 'react'
import { doVote } from '../reducers/anecdoteReducer'
import { StoreType } from '..'

interface Props {
  store: StoreType
}

export default function AnecdoteList({ store }: Props): ReactElement {
  const anecdotes = store.getState().anecdotes

  const vote = (id: string) => {
    store.dispatch(doVote(id))
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}
