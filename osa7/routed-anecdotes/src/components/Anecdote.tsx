import React from 'react'
import * as Types from '../types'

type Props = {
  anecdote: Types.Anecdote
}

export default function Anecdote({ anecdote }: Props) {
  return (
    <div>
      <h1>{anecdote.content}</h1>
      has {anecdote.votes} votes
      for more info see {anecdote.info}
    </div>
  )
}
