module What2Wear.ParamTypes where

data ServerParams = ServerParams
  { weatherAPIComKey :: String
  , port :: Int
  } deriving (Show)


data WeatherAPIComContext = WeatherAPIComContext
  { apiKey :: String
  }
