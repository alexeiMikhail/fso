import Person from "./Person"

const Persons = ({ persons, newFilter }) => {
    return (
      <div>
        {persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase())).map(p => <Person key={p.name} p={p}/>)}
      </div>
    )
  }

export default Persons