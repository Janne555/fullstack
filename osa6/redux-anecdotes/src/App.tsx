import React from 'react';
import { StoreType } from '.';
import { doVote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = (props: { store: StoreType }) => {
  const anecdotes = props.store.getState()

  const vote = (id: string) => {
    props.store.dispatch(doVote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
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
      <AnecdoteForm store={props.store} />
    </div>
  )
}

export default App