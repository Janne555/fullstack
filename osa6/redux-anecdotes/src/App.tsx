import React from 'react';
import { StoreType } from '.';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'


const App = (props: { store: StoreType }) => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList store={props.store} />
      <AnecdoteForm store={props.store} />
    </div>
  )
}

export default App