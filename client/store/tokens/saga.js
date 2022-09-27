import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { notification } from "antd"

import { actionTypes, setPricesAccToTokens } from "./action"
import { getProductPriceAccToTokens } from "~/repositories/TokenRepository"

const modalSuccess = (type, message) => {
  notification[type]({
    message: message,
  })
}

const modalError = (type) => {
  notification[type]({
    message: "An Error Occured",
  })
}



function* getProductPriceAccToTokensSaga({payload}) {
  try {
    const res = yield call(getProductPriceAccToTokens, payload)
   
    yield put(setPricesAccToTokens(res?.message?.amount))
  } catch (err) {
    yield put(setPricesAccToTokens([]))

    console.log(err)
  }
}



export default function* rootSaga() {

  yield all([takeEvery(actionTypes.GET_PRICES_ACC_TO_TOKENS, getProductPriceAccToTokensSaga)])
}
