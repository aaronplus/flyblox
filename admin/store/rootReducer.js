import { combineReducers } from "redux"

import auth from "./auth/reducer"
import app from "./app/reducer"
import admin from "./admin/reducer"
import categoryList from "./category/reducer"
import token from "./token/reducer"
import landingPage from "./landingPages/reducer"
export default combineReducers({
  auth,
  app,
  admin,
  categoryList,
  token,
  landingPage,
})
