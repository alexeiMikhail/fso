import { useState, useRef } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newFilter, setNewFilter] = useState('')

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

  const handleFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input type="text" onChange={handleFilter} value={newFilter}/></div>
      <h2>add a new</h2>
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
        {persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase())).map(p => <p key={p.name}>{p.name} {p.number}</p>)}
      </div>
    </div>
  )
}

export default App