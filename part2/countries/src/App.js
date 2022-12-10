import { useState, useEffect } from 'react'
import axios from 'axios'

const Languages = ({ country }) => {
  return (
    <ul>
      {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
    </ul>
  )
}

const Country = ({ countries, filter }) => {
  const country = countries
    .filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))[0]
  
  console.log(country)
  console.log(country.name.common);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital[0]}</p>
      <p>area: {country.area}</p>
      <h3>languages:</h3>
      <Languages country={country} />
      <img src={country.flags.png} width="200" alt={`flag of ${country.name.common}`}/>
    </div>
  )
}

const List = ({ countries, filter }) => {
  const filtered = countries
    .filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))
    .map(c => <li key={c.name.official}>{c.name.common}</li>)
  return (filtered.length === 1 ? 
    <Country countries={countries} filter={filter} /> :
    filtered.length <= 10 ?  
    <ul>{filtered}</ul> : 
    <div>Too many matches, specify another filter</div> 
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all/')
      .then(response => {
        console.log('promise fulfilled')
        let sorted = response.data.slice().sort((a, b) => {
          if (a.name.common < b.name.common) return -1;
          if (a.name.common > b.name.common) return 1;
          return 0;
        })
        setCountries(sorted)
      })
  }, [])

  console.log(countries.map(c => c))

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      find countries <input type="text" onChange={handleFilter} value={filter}/>
      <List countries={countries} filter={filter} />
    </div>
  )
}

export default App