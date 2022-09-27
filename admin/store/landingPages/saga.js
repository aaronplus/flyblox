import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { notification } from "antd"
import { actionTypes, setLandingPage } from "./action"
import Router from "next/router"
import LandingPageRepository from "~/repositories/LandingPageRepository"

const modalSuccess = (type, message) => {
    notification[type]({
        message: message,
    })
}

const modalError = (type, message) => {
    notification[type]({
        message: message,
    })
}

function* getLandingPage() {
    try {
        const res = yield call(LandingPageRepository.getLandingPages)
        if (res) {
            // yield put(setCategory(res));
        } else {
            modalError("error", "Error Occured at Server Side")
        }
    } catch (err) {
        console.log(err)
    }
}

function* addLandingPageSaga(payload) {
    try {
        const res = yield call(LandingPageRepository.addLandingPage, payload.payload)

        if (res.status === "Failed") {
            console.log("res111", res);
            modalError("error", "Name and Slug already exists")
        }
        if (res.status === "Success") {
            modalSuccess("success", "Landing Page Added Successfully")
            const landingpages = yield call(LandingPageRepository.getLandingPages)
            if (landingpages) {
                yield put(setLandingPage(landingpages.data.data))
            }
            else {
                modalError("error", "Could not reload Landing Page")
            }
        }
        else {
            modalError("error", "Error Occured at Server Side")
        }
    } catch (err) {
        console.log(err)
    }
}

function* removeLandingPageSaga(payload) {
    try {
        const res = yield call(LandingPageRepository.removeLandingPage, payload.payload)
        if (res.status === "Success") {
            modalSuccess("success", "Landing Page Deleted Successfully")
            const landingpages = yield call(LandingPageRepository.getLandingPages)
            if (landingpages) {
                yield put(setLandingPage(landingpages.data.data))
            } else {
                modalError("Could not reload landing pages")
            }
        } else {
            modalError("Error Occured at Server Side")
        }
    } catch (err) {
        console.log(err)
    }
}

function* editLandingPageSaga(payload) {
    try {
        const res = yield call(LandingPageRepository.editLandingPage, payload.payload)
        if (res.status === "Success") {
            modalSuccess("success", "Landing Page Updated Successfully")
            const landingpages = yield call(LandingPageRepository.getLandingPages)
            if (landingpages) {
                yield put(setLandingPage(landingpages.data.data))
                Router.push("/landingpages")
            } else {
                modalError("Could not reload landing pages")
            }
        } else {
            modalError("Error Occured at Server Side")
        }
    } catch (err) {
        console.log(err)
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_LANDING_PAGE, getLandingPage)])
    yield all([takeEvery(actionTypes.ADD_LANDING_PAGE, addLandingPageSaga)])
    yield all([takeEvery(actionTypes.EDIT_LANDING_PAGE, editLandingPageSaga)])
    yield all([takeEvery(actionTypes.REMOVE_LANDING_PAGE, removeLandingPageSaga)])
}
