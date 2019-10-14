import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useWeather(name: string) {
  const [weather, setWeather] = useState<Weather | null | undefined>(null)
  useEffect(() => {
    let cancelled = false
    axios.get<Weather>(`http://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=7b8d62338036e1523542ef891a97f6a6`)
      .then(res => {
        if (!cancelled)
          setWeather(res.data)
      })
      .catch(error => {
        console.error(error)
        setWeather(undefined)
      })
    return () => { cancelled = true }
  }, [name])
  return weather
}
