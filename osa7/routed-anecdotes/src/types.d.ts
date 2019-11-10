export type Anecdote = {
  content: string
  author: string
  info: string
  id: string
  votes: number
}

export type ProtoAnecdote = Omit<Anecdote, 'id'>