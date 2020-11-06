{-# LANGUAGE DataKinds       #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeOperators   #-}
module What2Wear.Weather
    ( WeatherAPI
    , weatherAPI
    ) where

import Servant
import What2Wear.ParamTypes ( WeatherAPIComContext(..), ServerParams(..) )
import Control.Monad.IO.Class (MonadIO(liftIO))
import qualified WeatherAPICom.CurrentWeather as CW
import WeatherAPICom.Client (current, fetchCurrentWeather)

type WeatherAPI = "current" :> Get '[JSON] CW.CurrentWeather

weatherAPI :: ServerParams -> Server WeatherAPI
weatherAPI params = do
  let ctx = WeatherAPIComContext { apiKey = weatherAPIComKey params }
  responded <- liftIO (fetchCurrentWeather ctx "London")
  return (current responded)
