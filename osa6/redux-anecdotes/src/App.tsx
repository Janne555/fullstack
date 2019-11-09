import React from 'react';
import { StoreType } from '.';
import { getId } from './reducers/anecdoteReducer';

const App = (props: { store: StoreType }) => {
  const anecdotes = props.store.getState()

  const vote = (id: string) => {
    props.store.dispatch({ id, type: "VOTE" })
  }

  const create = (e: any) => {
    e.preventDefault()
    Object.defineProperty(e.target, "note", String)
    props.store.dispatch({ type: "NEW", id: getId(), content: e.target.anecdote.value, votes: 0 })
    e.target.anecdote.value = ''
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
      <form onSubmit={create} >
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App