import React, { useEffect, useState } from "react"
import logo from "./logo.svg"
import "./App.scss"
import { WeatherDataProvider } from "./weather/components"
import { DummyWeatherDataSource } from "./weather/dummy"

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

  console.log(position)

  return (
    <WeatherDataProvider api={api} position={position}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </WeatherDataProvider>
  )
}

export default App
