import React from 'react';
import { StoreType } from '.';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification';


const App = (props: { store: StoreType }) => {

  return (
    <div>
      <h2>Anecdotes</h2>
      {props.store.getState().notification && <Notification store={props.store} />}
      <AnecdoteList store={props.store} />
      <AnecdoteForm store={props.store} />
    </div>
  )
}

export default App