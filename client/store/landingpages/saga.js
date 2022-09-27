import { all, put, call, takeEvery } from 'redux-saga/effects'
import { actionTypes, setLandingPageAccToSlug } from './action'
import { notification } from 'antd'
import { getLandingPageBySlug } from '~/repositories/landingPagesRepository'
import Router from 'next/router'
const modalSuccess = (type, message) => {
    notification[type]({
        message: message
    })
}

const modalError = (type, message) => {
    notification[type]({
        message: message
    })
}

function* getlandingPageBySlugSaga({ payload }) {
    try {
        const res = yield call(getLandingPageBySlug, payload)
        if (res.status == "Failed") {
            Router.push("/account/register")
            yield put(setLandingPageAccToSlug([]))
            modalError("error", "Slug not found")
        }
        if (res) {

            yield put(setLandingPageAccToSlug(res?.data?.result))

        } else {
            yield put(setLandingPageAccToSlug([]))
            modalError("Error Occured at Server Side")
        }
    } catch (err) {
        yield put(setLandingPageAccToSlug([]))
        console.log(err)
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_LANDING_PAGE_ACC_TO_SLUG, getlandingPageBySlugSaga)])
}