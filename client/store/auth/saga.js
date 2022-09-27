import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { notification } from "antd"

import { actionTypes, register, loginSuccess, logOutSuccess } from "./action"
import { setCartItems } from "../ecomerce/action"
import Router from "next/router"
import AuthRepository from "~/repositories/AuthRepository"
// import CartRepository from "~/repositories/CartRepository"

const modalSuccess = (type, message) => {
  notification[type]({
    message: message,
  })
}

const modalError = (type, message) => {
  notification[type]({
    message: message
  })
}

function* registerSaga(payload) {
  try {
    const res = yield call(AuthRepository.register, payload.payload)
    if (res?.status === "Success") {
      localStorage.setItem('access_token', res.token)
      modalSuccess("success", "Registration Successful")
      yield put(loginSuccess())
      Router.push("/account/dashboard")
    } else {
      modalError("error", res.message)
    }
  } catch (err) {
    console.log(err)
  }
}

function* loginSaga(payload) {
  try {
    const res = yield call(AuthRepository.login, payload.payload)
    if (res.status === "success") {
      localStorage.setItem('first_time', true)
      localStorage.setItem('access_token', res.token)
      modalSuccess(res.status, res.message)
      yield put(loginSuccess())
      // const res2 = yield call(CartRepository.getCartItems(), {})
      // if (res2.cartItems) {
      //   yield put(setCartItems(), res.cartItems)
      // }
    } else {
      modalError("error", res.message)
    }
  } catch (err) {
    console.log(err)
  }
}

function* logOutSaga(payload) {
  try {
    localStorage.removeItem("access_token")
    localStorage.setItem('logout', true)
    // document.cookie = "cart= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    Router.push("/account/login")
    yield put(setCartItems([]))
    yield put(logOutSuccess())
    // modalEr("warning")
  } catch (err) {
    console.log(err)
  }
}

function* forgotPassword(payload) {
  try {
    const res = yield call(AuthRepository.forgotPassword, payload.payload)
    if (res.status === "Success") {
      modalSuccess("success", res.message)
      Router.push("/account/login")
    } else {
      modalError("error", res.message)
    }
  } catch (err) {
    modalError("error", err)
    console.log(err)
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actionTypes.REGISTER, registerSaga)])
  yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)])
  yield all([takeEvery(actionTypes.LOGOUT, logOutSaga)])
  yield all([takeLatest(actionTypes.FORGOT_PASSWORD, forgotPassword)])
}
