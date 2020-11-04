module Main where

import Server
import ParamTypes

main :: IO ()
main = startW2WApp $ ServerParams 
        { weatherAPIComKey = "55df345ff41e49caaf6215911201810" 
        , port = 8080
        }
