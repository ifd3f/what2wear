{-# LANGUAGE DataKinds       #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeOperators   #-}
module Weather
    ( WeatherAPI
    , weatherAPI
    ) where

import Servant
import WeatherAPICom ( CurrentWeather, fetchCurrentWeather, CurrentWeatherResponse(current) )
import ParamTypes ( WeatherAPIComContext(..), ServerParams(..) )
import Control.Monad.IO.Class (MonadIO(liftIO))

type WeatherAPI = "current" :> Get '[JSON] CurrentWeather

weatherAPI :: ServerParams -> Server WeatherAPI
weatherAPI params = do
  let ctx = WeatherAPIComContext { apiKey = weatherAPIComKey params }
  responded <- liftIO (fetchCurrentWeather ctx "London")
  return (current responded)
