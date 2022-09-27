import { all, call, put, takeEvery } from "redux-saga/effects";
import { notification } from "antd";
import Router from "next/router"
import { actionTypes, loginSuccess, logOutSuccess } from "./action";
import AuthRepository from "~/repositories/AuthRepository"

const modalSuccess = (type) => {
  notification[type]({
    message: "Welcome back",
    description: "You are login successful!",
  });
};

const modalWarning = (type) => {
  notification[type]({
    message: "Good bye!",
    description: "Your account has been logged out!",
  });
};

const modalError = (type) => {
  notification[type]({
    message: 'Invalid Email or Password',
  });
};

function* loginSaga(payload) {
  try {
    // yield put(loginSuccess());
    // modalSuccess("success");
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
    console.log(err);
  }
}

function* logOutSaga() {
  try {
    Router.push("/login")
    localStorage.removeItem("access_token")
    localStorage.setItem('logout', true)
    yield put(logOutSuccess());
    modalWarning("warning");
  } catch (err) {
    console.log(err);
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)]);
  yield all([takeEvery(actionTypes.LOGOUT, logOutSaga)]);
}
