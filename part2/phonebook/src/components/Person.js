import personsService from '../services/persons'

const Person = ({ p, del }) => {

    return (
      <p key={p.name}>
        {p.name} {p.number}
        <button onClick={() => del(p)}>Delete</button>
      </p>
    )
  }

export default Person