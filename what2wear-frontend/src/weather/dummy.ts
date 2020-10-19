import { WeatherData, WeatherDataSource } from "./interfaces"

export class DummyWeatherDataSource implements WeatherDataSource {
  data: WeatherData

  constructor(data: WeatherData) {
    this.data = data
  }

  getConditionsAt(_: Position): Promise<WeatherData> {
    return Promise.resolve(this.data)
  }
}
