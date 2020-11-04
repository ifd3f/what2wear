{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE OverloadedStrings #-}

module WeatherAPICom
        ( CurrentWeather(..)
        , CurrentWeatherResponse(..)
        , fetchCurrentWeather
        ) where

import Data.Aeson
import Data.ByteString.UTF8 as BU
import Network.HTTP.Simple
import GHC.Generics
import ParamTypes (apiKey, WeatherAPIComContext)

data CurrentWeatherResponse = CurrentWeatherResponse {
    current :: CurrentWeather
} deriving (Generic, Show)
instance ToJSON CurrentWeatherResponse
instance FromJSON CurrentWeatherResponse

data CurrentWeather = CurrentWeather {
    temp_c :: Float
} deriving (Generic, Show)
instance ToJSON CurrentWeather
instance FromJSON CurrentWeather


baseRequest :: WeatherAPIComContext -> Request
baseRequest ctx
    = setRequestHost "api.weatherapi.com"
    $ setRequestSecure True
    $ setRequestPort 443
    $ setRequestQueryString [("key", Just $ BU.fromString $ apiKey ctx)]
    $ defaultRequest


fetchCurrentWeather :: WeatherAPIComContext -> String -> IO CurrentWeatherResponse
fetchCurrentWeather ctx location = do
    let request 
            = setRequestPath "/v1/current.json" 
            $ addToRequestQueryString [("q", Just (BU.fromString location))] 
            $ baseRequest ctx
    response <- httpJSON request :: IO (Response CurrentWeatherResponse)
    return $ getResponseBody response
