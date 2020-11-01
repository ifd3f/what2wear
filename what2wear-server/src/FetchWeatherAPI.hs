{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveGeneric #-}

module FetchWeatherAPI(fetchCurrentWeather) where

import Data.Aeson
import Data.ByteString.UTF8 as BU
import Network.HTTP.Simple
import GHC.Generics

data CurrentWeather = CurrentWeather {
    temp_c :: Float
} deriving (Generic, Show)
instance ToJSON CurrentWeather
instance FromJSON CurrentWeather

data APIContext = APIContext String

baseRequest :: APIContext -> Request
baseRequest (APIContext key)
    = setRequestHost "api.weatherapi.com"
    $ setRequestSecure True
    $ setRequestPort 443
    $ setRequestQueryString [("key", Just "key")]
    $ defaultRequest


fetchCurrentWeather :: APIContext -> String -> IO CurrentWeather
fetchCurrentWeather ctx location = do
    let request 
            = setRequestPath "/v1/current.json" 
            $ addToRequestQueryString [("q", Just (BU.fromString location))] 
            $ baseRequest ctx
    rq <- parseRequest "POST http://httpbin.org/post"
    response <- httpJSON rq :: IO (Response CurrentWeather)
    return $ getResponseBody response
