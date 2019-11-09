import React from 'react';
import { StoreType } from '.';

const App = (props: { store: StoreType }) => {
  const anecdotes = props.store.getState()

  const vote = (id: string) => {
    props.store.dispatch({ id, type: "VOTE" })
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
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App