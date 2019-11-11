import React from 'react'
import { State } from '../types'
import { useAppSelector } from '../hooks/reduxHooks'
import { Card } from 'semantic-ui-react'

export default function Message(): JSX.Element {
  const { message, error } = useAppSelector<State.Notification>(state => state.notification)
  return (
    <Card fluid color={error ? 'red' : 'green'} header={message} />
  )
}
