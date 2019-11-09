import React, { ReactElement } from 'react'
import { doVote } from '../reducers/anecdoteReducer'
import { StoreType } from '..'
import { Anecdote } from '../types'
import { setNotification } from '../reducers/notificationReducer'

interface Props {
  store: StoreType
}

export default function AnecdoteList({ store }: Props): ReactElement {
  const anecdotes = store.getState().anecdotes

  const vote = ({ id, content }: Anecdote) => {
    store.dispatch(doVote(id))
    store.dispatch(setNotification(`You voted '${content}'`))
    setTimeout(() => {
      store.dispatch(setNotification(''))
    }, 5000);
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}
