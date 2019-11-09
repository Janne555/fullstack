import React, { ReactElement } from 'react'
import { doVote } from '../reducers/anecdoteReducer'
import { StateType } from '../store'
import { Anecdote } from '../types'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

const mapStateToProps = (state: StateType) => {
  return {
    anecdotesToShow: state.anecdotes.filter(({ content }) => content.toLowerCase().includes(state.filter.toLowerCase()))
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    vote: ({ id, content }: Anecdote) => {
      dispatch(doVote(id))
      dispatch(setNotification(`You voted '${content}'`))
      setTimeout(() => {
        dispatch(setNotification(''))
      }, 5000);
    }
  }
}

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

function AnecdoteList({ anecdotesToShow, vote }: Props): ReactElement {
  return (
    <>
      {anecdotesToShow.map(anecdote =>
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

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)