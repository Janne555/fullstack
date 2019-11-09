import React, { ReactElement } from 'react'
import { doVote } from '../reducers/anecdoteReducer'
import { StoreType, StateType } from '..'
import { Anecdote } from '../types'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const mapStateToProps = (state: StateType) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

type Props = ReturnType<typeof mapStateToProps> & { store: StoreType }

function AnecdoteList({ anecdotes, filter, store }: Props): ReactElement {
  const filteredAnecdotes = anecdotes.filter(({ content }) => content.toLowerCase().includes(filter.toLowerCase()))

  const vote = ({ id, content }: Anecdote) => {
    store.dispatch(doVote(id))
    store.dispatch(setNotification(`You voted '${content}'`))
    setTimeout(() => {
      store.dispatch(setNotification(''))
    }, 5000);
  }

  return (
    <>
      {filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default connect(mapStateToProps)(AnecdoteList)