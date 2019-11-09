import React from 'react'
import { doCreate } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { StateType } from '../store'

const mapDispatchToProps = (dispatch: ThunkDispatch<StateType, undefined, any>) => {
  return {
    onSubmit: (e: any) => {
      e.preventDefault()
      Object.defineProperty(e.target, "note", String)
      dispatch(doCreate(e.target.anecdote.value))
      dispatch(setNotification(`You created '${e.target.anecdote.value}'`))
      e.target.anecdote.value = ''
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 5000);
    }
  }
}

function AnecdoteForm({ onSubmit }: ReturnType<typeof mapDispatchToProps>) {
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={onSubmit} >
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </>
  )
}

export default connect(mapDispatchToProps, mapDispatchToProps)(AnecdoteForm)