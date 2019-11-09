import React, { ReactElement } from 'react'
import { doVote } from '../reducers/anecdoteReducer'
import { StateType } from '../store'
import { Anecdote } from '../types'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

const mapStateToProps = (state: StateType) => {
  return {
    anecdotesToShow: state.anecdotes.filter(({ content }) => content.toLowerCase().includes(state.filter.toLowerCase()))
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<StateType, undefined, any>) => {
  return {
    vote: (anecdote: Anecdote) => {
      dispatch(doVote(anecdote))
      dispatch(setNotification(`You voted '${anecdote.content}'`))
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