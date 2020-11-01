{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveGeneric #-}

module FetchWeatherAPI 
        ( APIContext(..)
        , CurrentWeather
        , CurrentWeatherResponse
        , fetchCurrentWeather
        ) where

import Data.Aeson
import Data.ByteString.UTF8 as BU
import Network.HTTP.Simple
import GHC.Generics

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

data APIContext = APIContext { 
    apiKey :: String
}

baseRequest :: APIContext -> Request
baseRequest (APIContext key)
    = setRequestHost "api.weatherapi.com"
    $ setRequestSecure True
    $ setRequestPort 443
    $ setRequestQueryString [("key", Just (BU.fromString key))]
    $ defaultRequest


fetchCurrentWeather :: APIContext -> String -> IO CurrentWeatherResponse
fetchCurrentWeather ctx location = do
    let request 
            = setRequestPath "/v1/current.json" 
            $ addToRequestQueryString [("q", Just (BU.fromString location))] 
            $ baseRequest ctx
    response <- httpJSON request :: IO (Response CurrentWeatherResponse)
    return $ getResponseBody response
