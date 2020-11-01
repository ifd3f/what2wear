import React, { useEffect, useState } from "react"
import "./App.scss"
import { WeatherDataProvider } from "./weather/components"
import { DummyWeatherDataSource } from "./weather/dummy"
import { WearGrid } from "./wear/wear-grid"
import { Layout } from "./layout"

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

  return (
    <WeatherDataProvider api={api} position={position}>
      <Layout title="What to wear?">
        <WearGrid />
      </Layout>
    </WeatherDataProvider>
  )
}

export default App
