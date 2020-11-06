{-# LANGUAGE DeriveGeneric #-}

module WeatherAPICom.CurrentWeather(CurrentWeather(..)) where 
import Data.Aeson
import GHC.Generics

data CurrentWeather = CurrentWeather 
    { uv :: Float
    , temp_c :: Float
    , temp_f :: Float
    , wind_mph :: Float
    , wind_kph :: Float
    , wind_degree :: Float
    , wind_dir :: String
    , pressure_mb :: Float
    , pressure_in :: Float
    , precip_mm :: Float
    , precip_in :: Float
    , humidity :: Float
    , cloud :: Float
    , feelslike_c :: Float
    , feelslike_f :: Float
    , vis_km :: Float
    , vis_miles :: Float
    , gust_mph :: Float
    , gust_kph :: Float 
    } deriving (Generic, Show)
instance ToJSON CurrentWeather
instance FromJSON CurrentWeather

