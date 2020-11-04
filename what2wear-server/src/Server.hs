{-# LANGUAGE DataKinds       #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeOperators   #-}
module Server
    ( startW2WApp
    , w2wApp
    ) where

import Network.Wai
import Network.Wai.Handler.Warp
import Servant
import Weather (weatherAPI, WeatherAPI)
import ParamTypes

type API = "weather" :> WeatherAPI

startW2WApp :: ServerParams -> IO ()
startW2WApp params = run (port params) (w2wApp params)

w2wApp :: ServerParams -> Application
w2wApp params = serve api (server params)

api :: Proxy API
api = Proxy

server :: ServerParams -> Server API
server params = weatherAPI params
