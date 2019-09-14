import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function average() {
    const result = (good - bad) / (good + neutral + bad)
    return isNaN(result) ? 0 : result
  }

  function positive() {
    const result = good / (good + neutral + bad) * 100
    return isNaN(result) ? 0 : result
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <button onClick={() => setGood((prev) => prev + 1)}>Good</button>
      <button onClick={() => setNeutral((prev) => prev + 1)}>Neutral</button>
      <button onClick={() => setBad((prev) => prev + 1)}>Bad</button>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good}</p>
      <p>average {average()}</p>
      <p>positive {positive()}%</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))