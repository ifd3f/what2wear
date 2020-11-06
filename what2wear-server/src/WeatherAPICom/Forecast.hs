{-# LANGUAGE DeriveGeneric #-}

module WeatherAPICom.Forecast where 
import Data.Aeson
import GHC.Generics

data Forecast = Forecast 
    { time_epoch :: Int
    , time :: String
    , is_day :: Bool
    , windchill_c :: Float
    , windchill_f :: Float
    , heatindex_c :: Float
    , heatindex_f :: Float
    , dewpoint_c :: Float
    , dewpoint_f :: Float
    , will_it_rain :: Bool
    , chance_of_rain :: Float
    , will_it_snow :: Bool
    , chance_of_snow :: Float
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
instance ToJSON Forecast
instance FromJSON Forecast
