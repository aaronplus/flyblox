import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { notification } from "antd"

import { actionTypes } from "./action"
import Router from "next/router"
import ProductRepository from "~/repositories/ProductRepository"

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

function* addProductSaga(payload) {
  try {
    const res = yield call(ProductRepository.addProduct, payload.payload)
    if (res.status === "Success") {
      modalSuccess("success", "Product Added Successfully")
      Router.push("/")
    } else {
      modalError("error")
    }
  } catch (err) {
    console.log(err)
  }
}

function* editProductSaga(payload) {
  try {
    const res = yield call(ProductRepository.editProduct, payload.payload)
    if (res.status === "Success") {
      modalSuccess("success", "Product Updated Successfully")
      Router.push("/account/active-items")
    } else {
      modalError("error")
    }
  } catch (err) {
    console.log(err)
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.ADD_PRODUCT, addProductSaga)])
  yield all([takeEvery(actionTypes.EDIT_PRODUCT, editProductSaga)])
}
