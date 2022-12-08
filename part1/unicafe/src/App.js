import { useState } from 'react'

const Total = ({ good, neutral, bad }) => {
  return (
    <tr>
      <td>all</td>
      <td>{good + neutral + bad}</td>
    </tr>
  )
}

const Average = ({ good, neutral, bad }) => {
  return (
    <tr>
      <td>average</td>
      <td>{(good * 1 + neutral * 0 + bad * (-1) ) / (good + neutral + bad)}</td>
    </tr>
  )
}

const Positive = ({ good, neutral, bad }) => {
  return (
    <tr>
      <td>positive</td>
      <td>{good * 100 / (good + neutral + bad)} %</td>
    </tr>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
    
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (!good && !neutral && !bad) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <Total good={good} neutral={neutral} bad={bad} />
        <Average good={good} neutral={neutral} bad={bad} />
        <Positive good={good} neutral={neutral} bad={bad} />
      </tbody>
    </table>
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App