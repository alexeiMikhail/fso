import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'



const App = () => {
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

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

    axios
    .post('http://localhost:3001/persons', newGuy)
    .then(response => {
      console.log(response)
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNum('')
    })

    
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
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
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  )
}

export default App