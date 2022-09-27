import { all } from "redux-saga/effects"
import SettingSaga from "./setting/saga"
import AuthSaga from "./auth/saga"
import App from "./app/saga"
import Ecomerce from "./ecomerce/saga"
import Product from "./product/saga"
import Order from "./order/saga"
import Token from './tokens/saga'
import LandingPage from "./landingpages/saga"

export default function* rootSaga() {
  yield all([AuthSaga(), SettingSaga(), App(), Ecomerce(), Product(), Order(), Token(), LandingPage()])
}
