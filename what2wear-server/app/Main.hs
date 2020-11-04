module Main where

import What2Wear.Server
import What2Wear.ParamTypes

main :: IO ()
main = startW2WApp $ ServerParams 
        { weatherAPIComKey = "55df345ff41e49caaf6215911201810" 
        , port = 8080
        }
