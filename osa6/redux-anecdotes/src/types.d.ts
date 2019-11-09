export type UpdateAction = {
  type: "UPDATE"
  anecdote: Anecdote
}

export type InitAction = {
  type: "INIT"
  anecdotes: Anecdote[]
}

export type NewAnecdoteAction = {
  type: "NEW"
  id: string
  content: string
  votes: number
}

export type SetNotificationAction = {
  type: "SET_NOTIFICATION"
  content: string
}

export type SetFilterAction = {
  type: "SET_FILTER"
  content: string
}

export type Anecdote = {
  content: string
  id: string
  votes: number
}
