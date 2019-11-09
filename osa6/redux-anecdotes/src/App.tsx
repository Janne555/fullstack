import React from 'react';
import { StoreType } from '.';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification';
import Filter from './components/Filter'

const App = (props: { store: StoreType }) => {

  return (
    <div>
      <h2>Anecdotes</h2>
      {props.store.getState().notification && <Notification store={props.store} />}
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App