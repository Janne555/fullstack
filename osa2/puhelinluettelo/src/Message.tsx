import React from 'react'

type Props = {
  message: string
  error: boolean
}

export default function Message({ message, error }: Props) {
  return (
    <div className={`message ${error ? "error" : ""}`}>
      <p>{message}</p>
    </div>
  )
}
