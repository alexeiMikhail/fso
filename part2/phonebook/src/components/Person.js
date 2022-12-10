const Person = ({ p }) => {
    return (
      <p key={p.name}>{p.name} {p.number}</p>
    )
  }

export default Person