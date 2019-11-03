import React from 'react'
import { Message as MessageType } from '../../types'

type Props = {
  message: MessageType
}

export default function Message({ message: { content, error } }: Props) {
  return (
    <div style={{ backgroundColor: error ? "red" : "green" }}>
      {content}
    </div>
  )
}
