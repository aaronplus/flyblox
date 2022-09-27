import {
  all,
  call,
  put,
  takeEvery,
  takeLatest
} from 'redux-saga/effects'
import { notification } from 'antd'

import { actionTypes, setLoading } from './actions'
import Router from 'next/router'
import OrderRepository from '~/repositories/OrderRepository'
import UserRepository from '~/repositories/UserRepository'
import CartRepository from '~/repositories/CartRepository'
import { setCartItems } from '../ecomerce/action'
import { calculateAmountWithShipping } from '~/utilities/ecomerce-helpers'

const modalSuccess = (type, message) => {
  notification[type]({
    message: message
  })
}

const modalError = type => {
  notification[type]({
    message: 'An Error Occured'
  })
}

function* submitOrderSaga({ payload }) {
  try {
    if (typeof window.ethereum == 'undefined') {
      notification['error']({
        message: 'Metamask is not installed,Please install it'
      })
    } else {
      yield put(
        setLoading({ loading: true, seller: payload.seller?._id })
      )

      const vhash = yield call(OrderRepository.Verify, payload)

      console.log('verify hash', vhash)
      const hash = yield call(OrderRepository.Payment, payload)

      console.log('hash in payment', hash)

      let MaxShippingDays = Math.max.apply(
        Math,
        payload.orderItems.map(function (item) {
          return item.product.shippingDays
        })
      )
      MaxShippingDays = MaxShippingDays + 1
      let date = new Date()
      date.setMinutes(date.getMinutes() + 10)
      date.setDate(date.getDate() + MaxShippingDays)

      let shipping = Math.max.apply(
        Math,
        payload.orderItems.map(function (item) {
          return item.product.shippingCharges
        })
      )

      let amount = calculateAmountWithShipping(payload.orderItems,shipping)

      if (hash?.events['OrderCreated']?.returnValues['orderId']) {
        const res = yield call(OrderRepository.submitOrder, {
          ...payload,
          shippingDate: date,
          total:amount,
          shippingCharges: shipping,
          orderNo:
            hash?.events['OrderCreated']?.returnValues['orderId']
        })
        if (res.statusText === 'OK') {
          yield put(setLoading({ loading: false, seller: '' }))
          const res2 = yield call(
            CartRepository.removeItemByList,
            payload.orderItems
          )
          if (res2.status === 'Success') {
            modalSuccess('success', 'Order placed Successfully')
            console.log('cartItems>>>>>>>>>>', res2.cartItems)
            if (res2.cartItems?.length > 0) {
              yield put(setCartItems(res2.cartItems))
            } else {
              yield put(setCartItems([]))
              Router.push(`/account/payment-success`)
            }
          } else {
            modalError('error')
          }
        } else {
          modalError('error')
        }
      } else {
        modalError('Error in transaction')
      }
    }
  } catch (err) {
    yield put(setLoading({ loading: false, seller: '' }))
    console.log('erro is ', err)
    notification['error']({
      message: err.message
    })
  }
}

function* editProductSaga(payload) {
  try {
    const res = yield call(
      ProductRepository.editProduct,
      payload.payload
    )
    if (res.status === 'Success') {
      modalSuccess('success', 'Product Updated Successfully')
      Router.push('/shop/shop-sidebar-without-banner')
    } else {
      modalError('error')
    }
  } catch (err) {
    console.log(err)
  }
}

function* getSellerOrderSaga({ payload }) {
  try {
    const res = yield call(OrderRepository.getSellerOrders, payload)

    if (res.statusText === 'OK') {
      console.log(res.data.orderNo)
      // modalSuccess("success", "Order placed Successfully")
    } else {
      modalError('error')
    }
  } catch (err) {
    console.log(err)
  }
}

function* getUserOrdersSaga({ payload }) {
  try {
    const res = yield call(OrderRepository.getUserOrders, payload)
    if (res.statusText === 'OK') {
      // modalSuccess("success", "Order placed Successfully")
      // Router.push(`/account/payment-success?orderNo=${res.data.orderNo}`)
    } else {
      modalError('error')
    }
  } catch (err) {
    console.log(err)
  }
}

function* changeOrderStatus({ payload }) {
  try {
    const res = yield call(OrderRepository.changeOrderStatus, payload)
    if (res.statusText === 'OK') {
      console.log(res.data.orderNo)
      // modalSuccess("success", "Order placed Successfully")
    } else {
      modalError('error')
    }
  } catch (err) {
    console.log(err)
  }
}

function* addOrderAddressSaga({ payload }) {
  try {
    const res = yield call(UserRepository.addAddress, payload)
    console.log('asdssdas>>>>', res)
    if (res.status === 'Success') {
      modalSuccess('success', 'New address added successfully')
    } else {
      modalError('error')
    }
  } catch (err) {
    console.log(err)
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.SUBMIT_ORDER, submitOrderSaga)])
  yield all([takeEvery(actionTypes.EDIT_PRODUCT, editProductSaga)])
  yield all([
    takeEvery(actionTypes.SELLER_ORDERS, getSellerOrderSaga)
  ])
  yield all([takeEvery(actionTypes.BUYER_ORDERS, getUserOrdersSaga)])
  yield all([takeEvery(actionTypes.CHANGE_STATUS, changeOrderStatus)])
  yield all([takeEvery(actionTypes.ADD_ADDRESS, addOrderAddressSaga)])
}
