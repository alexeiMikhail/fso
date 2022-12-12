import { useState, useRef, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import personsService from './services/persons'



const App = () => {
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personsService
      .getAll()
      .then(response => setPersons(response))
  }, [])

  const handleNameInput = (event) => {
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
    const newGuy = {name: newName, number: newNum}
    if (persons.map((p) => p.name).includes(newName)) {
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) &&
      personsService
        .update(persons.filter(p => p.name === newName)[0].id, newGuy)
        .then(response => {
          personsService.getAll()
            .then(response => {
              setPersons(response)
              setNewNum('')
              setNewName('')
            })
          })
      return
    }

    personsService
      .create(newGuy)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(response))
        setNewName('')
        setNewNum('')
      })    
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const deletePerson = (person) => {
    window.confirm(`Delete ${person.name}?`) &&
    personsService.deleteItem(person.id)
      .then(() => {
        personsService
        .getAll()
        .then(response => setPersons(response))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={handleFilter} value={newFilter}/>
      <h2>add a new</h2>
      <Form handleSubmit={handleSubmit} 
        handleNumInput={handleNumInput} 
        handleNameInput={handleNameInput} 
        inputRef={inputRef}
        newName={newName}
        newNum={newNum} />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} del={deletePerson} />
    </div>
  )
}

export default App