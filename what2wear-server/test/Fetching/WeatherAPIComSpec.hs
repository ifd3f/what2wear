{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE OverloadedStrings #-}
module Fetching.WeatherAPIComSpec (spec) where

import What2Wear.Server (w2wApp)
import WeatherAPICom
import What2Wear.ParamTypes
import Test.Hspec
import Test.Hspec.Wai
import Test.Hspec.Wai.JSON

ctx :: WeatherAPIComContext
ctx = WeatherAPIComContext { apiKey = "55df345ff41e49caaf6215911201810" }

spec :: Spec
spec = do
    describe "Fetch current weather conditions" $ do
        it "works" $ do
            response <- fetchCurrentWeather ctx "London"
            return ()
