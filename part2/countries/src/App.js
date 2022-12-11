import { useState, useEffect } from 'react'
import axios from 'axios'

const Languages = ({ country }) => {
  return (
    <div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
      </ul>
    </div>
  )
}

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({})

  const API_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    console.log('effect: fetch weather api')
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${API_key}`)
      .then(response => {
        console.log("we got a response from the weather api", response.data);
        setWeather(response.data)
        console.log("and here's what was stored in weather", weather);
      })
  }, [])
  
  console.log('whats up with the weather', weather);
  return (
    <div>
      <h3>weather in {country.capital[0]}</h3>
      <p>temperature {Math.round((weather.main?.temp - 273.15) * 9 / 5 + 32)} F</p>
      {weather.weather && <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />}
      <p>wind {weather.wind?.speed}</p>
    </div>
  )
}

const Country = ({ countries, filter }) => {
  const country = countries
    .filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))[0]
  
  return (
    <div>
      <h2>{country.name.common}</h2>
      {country.capital && <p>capital: {country.capital[0]}</p>}
      <p>area: {country.area}</p>
      <Languages country={country} />
      <img src={country.flags.png} width="200" alt={`flag of ${country.name.common}`}/>
      {country.capital && <Weather country={country} />}
    </div>
  )
}

const ListItem = ({ c, setFilter }) => {
  return (
    <li key={c.name.official}>
      {c.name.common}
      <button onClick={() => setFilter(c.name.common)}>show</button>
    </li>
  )
}

const List = ({ countries, filter, setFilter }) => {
  const filtered = countries
    .filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))
    .map(c => <ListItem key={c.name.official} c={c} setFilter={setFilter} />)
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
    console.log('effect: fetch restcountries api')
    axios
      .get('https://restcountries.com/v3.1/all/')
      .then(response => {
        console.log('promise fulfilled: got restcountries api')
        let sorted = response.data.slice().sort((a, b) => {
          if (a.name.common < b.name.common) return -1;
          if (a.name.common > b.name.common) return 1;
          return 0;
        })
        setCountries(sorted)
      })
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      find countries <input type="text" onChange={handleFilter} value={filter}/>
      <List countries={countries} filter={filter} setFilter={setFilter} />
    </div>
  )
}

export default App