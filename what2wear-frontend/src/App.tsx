import React, { useEffect, useState } from "react"
import "./App.scss"
import { WeatherDataProvider } from "./weather/components"
import { DummyWeatherDataSource } from "./weather/dummy"
import { WearGrid } from "./wear/wear-grid"
import { Layout } from "./layout"
import { ZoneAdjustmentSlider } from "./wear/preference-editor"
import { RangePreferences } from "./wear/preferences"

function App() {
  const api = new DummyWeatherDataSource({
    temperature: 30,
    humidity: 0.2,
    aqi: 30,
    precipitation: 30,
  })
  const [position, setPosition] = useState<Position | undefined>()
  const [preference, setPreference] = useState<RangePreferences<any>>({
    name: "hat",
    clothes: [
      {
        clothingType: "Jacket",
        minTemp: -Infinity,
      },
      {
        clothingType: "Sweater",
        minTemp: 10,
      },
      {
        clothingType: "Long-sleeve",
        minTemp: 20,
      },
      {
        clothingType: "T-shirt",
        minTemp: 30,
      },
    ],
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setPosition(position)
    })
  }, [])

  return (
    <WeatherDataProvider api={api} position={position}>
      <Layout title="What to wear?">
        <WearGrid />
        <ZoneAdjustmentSlider
          preference={preference}
          setPreference={setPreference}
        />
      </Layout>
    </WeatherDataProvider>
  )
}

export default App
