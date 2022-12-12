import Person from "./Person"

const Persons = ({ persons, newFilter, del }) => {
    return (
      <div>
        {persons.filter(p => p.name.toLowerCase()
          .includes(newFilter.toLowerCase()))
          .sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
          .map(p => <Person key={p.name} p={p} del={del} />)}
      </div>
    )
  }

export default Persons