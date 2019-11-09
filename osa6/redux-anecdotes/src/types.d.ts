export type VoteAction = {
  type: "VOTE"
  id: string
}

export type NewAnecdoteAction = {
  type: "NEW"
  id: string
  content: string
  votes: number
}

export type Anecdote = {
  content: string
  id: string
  votes: number
}