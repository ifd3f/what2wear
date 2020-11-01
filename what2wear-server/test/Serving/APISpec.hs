{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE OverloadedStrings #-}
module Serving.APISpec (spec) where

import Lib (w2wApp)
import Test.Hspec
import Test.Hspec.Wai
import Test.Hspec.Wai.JSON

spec :: Spec
spec = with (return w2wApp) $ do
    describe "GET /users" $ do
        it "responds with 200" $ do
            get "/users" `shouldRespondWith` 200
        it "responds with [User]" $ do
            let users = "[{\"userId\":1,\"userFirstName\":\"Isaac\",\"userLastName\":\"Newton\"},{\"userId\":2,\"userFirstName\":\"Albert\",\"userLastName\":\"Einstein\"}]"
            get "/users" `shouldRespondWith` users
