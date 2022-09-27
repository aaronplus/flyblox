import { all } from "redux-saga/effects"
import AppSaga from "./app/saga"
import AuthSaga from "./auth/saga"
import AdminSaga from "./admin/saga"
import CategorySaga from "./category/saga"
import TokenSaga from "./token/saga"
import LandingPageSaga from "./landingPages/saga"

export default function* rootSaga() {
  yield all([AppSaga(), AuthSaga(), AdminSaga(), CategorySaga(), TokenSaga(), LandingPageSaga()])
}
