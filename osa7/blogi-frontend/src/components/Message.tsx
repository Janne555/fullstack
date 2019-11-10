import React from 'react'
import { State } from '../types'
import { useAppSelector } from '../hooks/reduxHooks'

export default function Message(): JSX.Element {
  const { message, error } = useAppSelector<State.Notification>(state => state.notification)
  return (
    <div style={{ color: error ? 'red' : 'green', backgroundColor: 'grey', border: `solid 3px ${error ? 'red' : 'green'}`, padding: '1em' }}>
      {message}
    </div>
  )
}
