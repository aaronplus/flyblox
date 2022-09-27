import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { notification } from "antd";

import { actionTypes } from "./action";
import Router from "next/router";
import UserRepository from "~/repositories/UserRepository";

const modalSuccess = (type, message) => {
  notification[type]({
    message: message,
  });
};

const modalError = (type) => {
  notification[type]({
    message: "An Error Occured",
  });
};

function* getUsers(payload) {
  try {
    const res = yield call(UserRepository.getUsers, payload.payload);
    if (res.status === "Success") {
      modalSuccess("success", "Product Added Successfully");
      // Router.push("/shop/shop-sidebar-without-banner");
    } else {
      modalError("Error Occured at Server Side");
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.GET_USERS, getUsers)]);
}
