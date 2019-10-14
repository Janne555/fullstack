import React from 'react'

export default function WeatherInfo({ weather }: WeatherInfoProps) {
  return (
    <>
      <p>description: {weather.weather[0] ? weather.weather[0].description : "none"}</p>
      <p>temperature: {Math.round(weather.main.temp - 273.15)}</p>
    </>
  )
}