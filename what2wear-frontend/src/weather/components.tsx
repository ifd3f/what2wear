import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { WeatherData, WeatherDataSource } from "./interfaces"

type WeatherDataContextData = {
  data?: WeatherData
  ready: boolean
}

const WeatherDataContext = createContext<WeatherDataContextData>(null as any)
type WeatherDataProviderProps = {
  api: WeatherDataSource,
  children: ReactNode,
  position?: Position
}

export function WeatherDataProvider({api, children, position}: WeatherDataProviderProps) {
  const [data, setData] = useState<WeatherData | undefined>(undefined)
  const [ready, setReady] = useState(false)

  // Update whenever position changes
  useEffect(() => {
    setReady(false)

    if (!position) {
      setReady(false)
      return
    }
    ;(async () => {
      const conditions = await api.getConditionsAt(position)
      setData(conditions)
      setReady(true)
    })()
  }, [api, position])

  return <WeatherDataContext.Provider value={{
    data, ready
  }}>
    {children}
  </WeatherDataContext.Provider>
}

export function useWeatherData() {
  return useContext(WeatherDataContext)
}
