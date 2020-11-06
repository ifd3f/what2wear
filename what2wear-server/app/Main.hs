module Main where

import What2Wear.Server
import What2Wear.ParamTypes


params = ServerParams 
    { weatherAPIComKey = "55df345ff41e49caaf6215911201810" 
    , port = 8080
    }

main :: IO ()
main = do
    putStrLn ("Starting on port " ++ (show $ port params))
    startW2WApp $ params
