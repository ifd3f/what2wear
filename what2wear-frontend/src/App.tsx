import React, { useEffect, useState } from "react"
import "./App.scss"
import { WeatherDataProvider } from "./weather/components"
import { DummyWeatherDataSource } from "./weather/dummy"
import { useStyles } from "./material-styles"
import { WearGrid } from "./wear/wear-grid"

function App() {
  const api = new DummyWeatherDataSource({
    temperature: 30,
    humidity: 0.2,
    aqi: 30,
    precipitation: 30,
  })
  const [position, setPosition] = useState<Position | undefined>()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setPosition(position)
    })
  }, [])

  const classes = useStyles()

  return (
    <WeatherDataProvider api={api} position={position}>
      <div className={classes.root}>
        <WearGrid />
      </div>
    </WeatherDataProvider>
  )
}

export default App
