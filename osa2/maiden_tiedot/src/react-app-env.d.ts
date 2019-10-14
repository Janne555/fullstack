/// <reference types="react-scripts" />

type Weather = {
  weather: {
    description: string
  }[]
  main: {
    temp: number
  }
}

type WeatherInfoProps = {
  weather: Weather
}

type DetailedCountryProps = {
  country: Country
}

type CountryListProps = {
  countries: Country[]
  onShow: (name: string) => void
}

type Country = {
  name: string
  capital: string
  population: number
  languages: {
    name: string
  }[]
  flag: string
}

type CountriesProps = {
  countries: Country[]
  onShow: (name: string) => void
}