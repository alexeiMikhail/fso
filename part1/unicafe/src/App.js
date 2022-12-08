import { useState } from 'react'

const Total = ({ good, neutral, bad }) => {
  return (
    <p>all {good + neutral + bad}</p>
  )
}

const Average = ({ good, neutral, bad }) => {
  return (
    <p>average {(good * 1 + neutral * 0 + bad * (-1) ) / (good + neutral + bad)}</p>
  )
}

const Positive = ({ good, neutral, bad }) => {
  return (
    <p>positive {good * 100 / (good + neutral + bad)} %</p>
  )
}

const Statistic = ({ feedback, votes }) => {
  return (
    <p>{feedback} {votes}</p>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistic feedback={"good"} votes={good} />
      <Statistic feedback={"neutral"} votes={neutral} />
      <Statistic feedback={"bad"} votes={bad} />
      <Total good={good} neutral={neutral} bad={bad} />
      <Average good={good} neutral={neutral} bad={bad} />
      <Positive good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App