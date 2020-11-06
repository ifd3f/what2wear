{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE OverloadedStrings #-}

module WeatherAPICom.Client
        ( CurrentWeatherResponse(..)
        , fetchCurrentWeather
        ) where

import Data.Aeson
import Data.ByteString.UTF8 as BU
import Network.HTTP.Simple
import GHC.Generics
import What2Wear.ParamTypes (apiKey, WeatherAPIComContext)
import qualified WeatherAPICom.CurrentWeather as CW

data CurrentWeatherResponse = CurrentWeatherResponse 
    { current :: CW.CurrentWeather
    } deriving (Generic, Show)
instance ToJSON CurrentWeatherResponse
instance FromJSON CurrentWeatherResponse

data Condition = Condition 
    { text :: String 
    , icon :: String 
    , code :: Int 
    } deriving (Generic, Show)
instance ToJSON Condition
instance FromJSON Condition

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
