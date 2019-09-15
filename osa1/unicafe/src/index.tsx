import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give feedback</h2>
      <Button text="good" handleClick={() => setGood((prev) => prev + 1)} />
      <Button text="neutral" handleClick={() => setNeutral((prev) => prev + 1)} />
      <Button text="bad" handleClick={() => setBad((prev) => prev + 1)} />
      <h2>statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

type StatisticsProps = {
  good: number
  neutral: number
  bad: number
}

const Statistics = ({ good, neutral, bad }: StatisticsProps) => {
  function average() {
    const result = (good - bad) / (good + neutral + bad)
    return isNaN(result) ? 0 : result.toFixed(1)
  }

  function positive() {
    const result = good / (good + neutral + bad) * 100
    return isNaN(result) ? 0 : result.toFixed(1)
  }

  if (!bad && !neutral && !good)
    return <p>no feedback given</p>

  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={good + neutral + bad} />
        <Statistic text="average" value={average()} />
        <Statistic text="positive" value={`${positive()} %`} />
      </tbody>
    </table>
  )
}

type StatisticProps = {
  text: string
  value: number | string
}

const Statistic = ({ text, value }: StatisticProps) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

type ButtonProps = {
  text: string
  handleClick: () => void
}

const Button = ({ handleClick, text }: ButtonProps) => <button onClick={handleClick}>{text}</button>

ReactDOM.render(<App />, document.getElementById('root'))