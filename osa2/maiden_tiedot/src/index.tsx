import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

type Country = {
  name: string
  capital: string
  population: number
  languages: {
    name: string
  }[]
  flag: string
}

const App = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [filter, setFilter] = useState<string>('')

  useEffect(() => {
    let hasCancelled = false
    axios.get<Country[]>('https://restcountries.eu/rest/v2/all')
      .then(response => {
        if (!hasCancelled)
          setCountries(response.data)
      })
      .catch(console.error)
    return () => { hasCancelled = true }
  }, [])

  return (
    <div>
      find countries <input onChange={e => setFilter(e.target.value)} />
      <Countries countries={countries.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))} />
    </div >
  )
}

type CountriesProps = {
  countries: Country[]
}

function Countries({ countries }: CountriesProps) {
  if (countries.length > 10)
    return <p>Too many countries, specify another filter</p>
  if (countries.length > 1)
    return <CountryList countries={countries} />
  if (countries.length === 1)
    return <DetailedCountry country={countries[0]} />
  return <p>No countries found</p>
}


type CountryListProps = {
  countries: Country[]
}

function CountryList({ countries }: CountryListProps) {
  return (
    <ul style={{ listStyleType: 'none' }}>
      {countries.map(({ name }) => <li key={name}>{name}</li>)}
    </ul>
  )
}

type DetailedCountryProps = {
  country: Country
}


function DetailedCountry({ country: { capital, flag, languages, name, population } }: DetailedCountryProps) {
  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h2>languages</h2>
      <ul>
        {languages.map(({ name }) => <li key={name}>{name}</li>)}
      </ul>
      <img style={{ height: '100px', width: '100px' }} src={flag} alt={`flag of ${name}`} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))