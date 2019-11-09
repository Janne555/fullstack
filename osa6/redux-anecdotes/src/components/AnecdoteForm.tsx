import React from 'react'
import { StoreType } from '../index'
import { doCreate } from '../reducers/anecdoteReducer'

export default function AnecdoteForm({ store }: { store: StoreType }) {

  const create = (e: any) => {
    e.preventDefault()
    Object.defineProperty(e.target, "note", String)
    store.dispatch(doCreate(e.target.anecdote.value))
    e.target.anecdote.value = ''
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create} >
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </>
  )
}
