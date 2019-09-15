import React, { useState } from 'react'
import ReactDOM from 'react-dom'

type AppProps = {
  anecdotes: string[]
}

const App = (props: AppProps) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState<number[]>([])

  function handleNext() {
    if (selected + 1 < anecdotes.length)
      setSelected((prev) => prev + 1)
    else
      setSelected(0)
  }

  function handleVote() {
    setVotes((prev) => {
      const copy = [...prev]
      if (copy[selected] == null)
        copy[selected] = 0
      copy[selected] += 1
      return copy
    })
  }

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected] != null ? votes[selected] : 0} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)