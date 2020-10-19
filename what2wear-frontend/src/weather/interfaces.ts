export type WeatherData = {
    /**
     * The temperature, in degrees Celsius
     */
    temperature: number
    /**
     * Humidity, between 0 and 1
     */
    humidity: number
    /**
     * Precipitation, in millimeters.
     */
    precipitation: number
    /**
     * Air quality index
     */
    aqi: number
}

export interface WeatherDataSource {
    getConditionsAt(position: Position): Promise<WeatherData>
}
