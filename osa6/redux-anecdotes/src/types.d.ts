export type ReducerAction = {
  type: "VOTE"
  id: string
}

export type Anecdote = {
  content: string
  id: string
  votes: number
}