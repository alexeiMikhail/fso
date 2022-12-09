import { useState, useRef } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')

  const handleNameInput = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const inputRef = useRef()

  const handleNumInput = (event) => {
    console.log(event.target.value)
    setNewNum(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    inputRef.current.select()
    if (persons.map((p) => p.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }  
    const newGuy = {name: newName, number: newNum}
    console.log(newGuy)
    setPersons(persons.concat(newGuy))
    setNewName('')
    setNewNum('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input autoFocus onChange={handleNameInput} ref={inputRef} value={newName}/>
        </div>
        <div>number: <input onChange={handleNumInput} value={newNum} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(p => <p key={p.name}>{p.name} {p.number}</p>)}
      </div>
    </div>
  )
}

export default App