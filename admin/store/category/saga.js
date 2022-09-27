import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { notification } from "antd"

import { actionTypes } from "./action"
import Router from "next/router"
import CategoryRepository from "~/repositories/CategoryRepository"
import { setCategory } from "./action"
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

function* getCategories() {
  try {
    const res = yield call(CategoryRepository.getCategories)
    if (res) {
      // yield put(setCategory(res));
    } else {
      modalError("Error Occured at Server Side")
    }
  } catch (err) {
    console.log(err)
  }
}

function* addCategorySaga(payload) {
  try {
    const res = yield call(CategoryRepository.addCategory, payload.payload)
    if (res.status === "Success") {
      modalSuccess("success", "Product Added Successfully")
      const categories = yield call(CategoryRepository.getCategories)
      if (categories) {
        console.log(categories)
        yield put(setCategory(categories))
      } else {
        modalError("Could not reload categories")
      }
    } else {
      modalError("Error Occured at Server Side")
    }
  } catch (err) {
    console.log(err)
  }
}

function* editCategorySaga(payload) {
  try {
    console.log("editsaa")
    const res = yield call(CategoryRepository.editCategory, payload.payload)
    if (res.status === "Success") {
      modalSuccess("success", "Category Successfully Edited")
      Router.push("/categories")
    } else {
      modalError("Error Occured at Server Side")
    }
  } catch (err) {
    console.log(err)
  }
}
export default function* rootSaga() {
  yield all([takeEvery(actionTypes.GET_CATEGORY, getCategories)])
  yield all([takeEvery(actionTypes.ADD_CATEGORY, addCategorySaga)])
  yield all([takeEvery(actionTypes.EDIT_CATEGORY, editCategorySaga)])
}
