import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { notification } from "antd"
import { actionTypes, setToken } from "./action"
import Router from "next/router"
import TokenRepository from "~/repositories/TokenRepository"

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

function* getToken() {
  try {
    const res = yield call(TokenRepository.getTokens)
    if (res) {
      // yield put(setCategory(res));
    } else {
      modalError("Error Occured at Server Side")
    }
  } catch (err) {
    console.log(err)
  }
}

function* addTokenSaga(payload) {
  try {
    const res = yield call(TokenRepository.addToken, payload.payload)

    if (res.status === "Success") {
      modalSuccess("success", "Token Added Successfully")
      const tokens = yield call(TokenRepository.getTokens)
      if (tokens) {
        yield put(setToken(tokens.data.tokens))
      } else {
        modalError("Could not reload tokens")
      }
    } else {
      modalError("Error Occured at Server Side")
    }
  } catch (err) {
    console.log(err)
  }
}

function* removeTokenSaga(payload) {
  try {
    const res = yield call(TokenRepository.removeToken, payload.payload)
    if (res.status === "Success") {
      modalSuccess("success", "Token Deleted Successfully")
      const tokens = yield call(TokenRepository.getTokens)
      if (tokens) {
        yield put(setToken(tokens.data.tokens))
      } else {
        modalError("Could not reload tokens")
      }
    } else {
      modalError("Error Occured at Server Side")
    }
  } catch (err) {
    console.log(err)
  }
}

function* editTokenSaga(payload) {
  try {
    const res = yield call(TokenRepository.editToken, payload.payload)
    if (res.status === "Success") {
      modalSuccess("success", "Token Updated Successfully")
      const tokens = yield call(TokenRepository.getTokens)
      if (tokens) {
        yield put(setToken(tokens.data.tokens))
        Router.push("/tokens")
      } else {
        modalError("Could not reload tokens")
      }
    } else {
      modalError("Error Occured at Server Side")
    }
  } catch (err) {
    console.log(err)
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.GET_TOKEN, getToken)])
  yield all([takeEvery(actionTypes.ADD_TOKEN, addTokenSaga)])
  yield all([takeEvery(actionTypes.EDIT_TOKEN, editTokenSaga)])
  yield all([takeEvery(actionTypes.REMOVE_TOKEN, removeTokenSaga)])
}
