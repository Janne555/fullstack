import React from 'react'
import useWeather from './hooks'
import WeatherInfo from './WeatherInfo'

export default function DetailedCountry({ country: { capital, flag, languages, name, population } }: DetailedCountryProps) {
  const weather = useWeather(name)

  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h2>languages</h2>
      <ul>
        {languages.map(({ name }) => <li key={name}>{name}</li>)}
      </ul>
      <img style={{ height: '133px', width: '200px' }} src={flag} alt={`flag of ${name}`} />
      <h2>Weather in {name}</h2>
      {weather
        ? <WeatherInfo weather={weather} />
        : weather === undefined
          ? <p>Failed to load weather</p>
          : <p>Loading weather...</p>
      }
    </div>
  )
}