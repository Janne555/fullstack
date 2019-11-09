import React from 'react'
import { doCreate } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch: Dispatch) => {
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

export default connect(null, mapDispatchToProps)(AnecdoteForm)