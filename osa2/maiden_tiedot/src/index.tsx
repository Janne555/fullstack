import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import DetailedCountry from './DetailedCountry'


const App = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const [filter, setFilter] = useState<string>('')
  const [filterOverride, setFilterOverride] = useState<string | undefined>()

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

  function handleShow(name: string) {
    setFilterOverride(name)
  }

  function filterCountries() {
    if (filterOverride) {
      const result = countries.find(({ name }) => name === filterOverride)
      if (result)
        return [result]
    }
    return countries.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value)
    setFilterOverride(undefined)
  }

  return (
    <div>
      find countries <input onChange={handleChange} />
      <Countries countries={filterCountries()} onShow={handleShow} />
    </div >
  )
}


function Countries({ countries, onShow }: CountriesProps) {
  if (countries.length > 10)
    return <p>Too many countries, specify another filter</p>
  if (countries.length > 1)
    return <CountryList countries={countries} onShow={onShow} />
  if (countries.length === 1)
    return <DetailedCountry country={countries[0]} />
  return <p>No countries found</p>
}

function CountryList({ countries, onShow }: CountryListProps) {
  return (
    <ul style={{ listStyleType: 'none' }}>
      {countries.map(({ name }) => <li key={name}>{name} <button onClick={() => onShow(name)}>show</button></li>)}
    </ul>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))