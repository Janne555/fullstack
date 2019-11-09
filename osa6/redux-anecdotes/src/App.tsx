import React, { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification';
import Filter from './components/Filter'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Anecdote } from './types';
import Axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { StateType } from './store';

const mapDispatchToProps = (dispatch: ThunkDispatch<StateType, undefined, any>) => {
  return {
    initAnecdotes: () => {
      dispatch(async (dispatch: Dispatch) => {
        const response = await Axios.get<Anecdote[]>('http://localhost:3001/anecdotes')
        dispatch({
          type: "INIT",
          anecdotes: response.data
        })
      })
    }
  }
}


const App = ({ initAnecdotes }: ReturnType<typeof mapDispatchToProps>) => {
  useEffect(() => {
    initAnecdotes()
  }, [initAnecdotes])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, mapDispatchToProps)(App)