import { actionTypes } from "./actions"

export const initState = {
  loading: false,
  currentlyPaying: ''
}

function reducer(state = initState, actions) {
  switch (actions.type) {
    case actionTypes.SUBMIT_ORDER:
      return {
        ...state,
        ...{ orderSuccess: true },
      }
    case actionTypes.SELLER_ORDERS:
      return {
        ...state,
        sellerOrders: actions.payload,
      }
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: actions.payload.loading,
        currentlyPaying: actions.payload.seller
      }
    default:
      return state
  }
}

export default reducer
