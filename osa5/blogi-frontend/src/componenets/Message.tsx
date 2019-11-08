import React from 'react'
import { Message as MessageType } from '../../types'

type Props = {
  message: MessageType;
}

export default function Message({ message: { content, error } }: Props) {
  return (
    <div style={{ color: error ? 'red' : 'green', backgroundColor: 'grey', border: `solid 3px ${error ? 'red' : 'green'}`, padding: '1em' }}>
      {content}
    </div>
  )
}
