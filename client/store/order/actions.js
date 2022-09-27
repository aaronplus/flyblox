export const actionTypes = {
  SUBMIT_ORDER: "SUBMIT_ORDER",
  EDIT_PRODUCT: "EDIT_PRODUCT",
  SELLER_ORDERS: "SELLER_ORDERS",
  BUYER_ORDERS: "BUYER_ORDERS",
  CHANGE_STATUS: "CHANGE_STATUS",
  ADD_ADDRESS: "ADD_ADDRESS",
  SET_LOADING: 'SET_LOADING',
}

export function submitOrder(payload) {
  return { type: actionTypes.SUBMIT_ORDER, payload: payload }
}

export function editProduct(payload) {
  return { type: actionTypes.EDIT_PRODUCT, payload: payload }
}

export function getSellerOrders(payload) {
  return { type: actionTypes.SELLER_ORDERS, payload: payload }
}

export function getUserOrders(payload) {
  return { type: actionTypes.BUYER_ORDERS, payload: payload }
}

export function changeOrderStatus(payload) {
  return { type: actionTypes.CHANGE_STATUS, payload: payload }
}

export function addOrderAddress(payload) {
  return { type: actionTypes.ADD_ADDRESS, payload: payload }
}

export function setLoading(payload) {
  return { type: actionTypes.SET_LOADING, payload }
}