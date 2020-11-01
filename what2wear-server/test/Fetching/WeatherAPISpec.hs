{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE OverloadedStrings #-}
module Fetching.WeatherAPISpec (spec) where

import Lib (w2wApp)
import FetchWeatherAPI
import Test.Hspec
import Test.Hspec.Wai
import Test.Hspec.Wai.JSON

ctx :: APIContext
ctx = APIContext { apiKey = "55df345ff41e49caaf6215911201810" }

spec :: Spec
spec = do
    describe "Fetch current weather conditions" $ do
        it "works" $ do
            response <- fetchCurrentWeather ctx "London"
            return ()
