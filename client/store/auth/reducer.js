import { actionTypes } from "./action"

export const initState = {
  isLoggedIn: false,
}

function reducer(state = initState, actions) {
  switch (actions.type) {
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        ...{ registerSuccess: true },
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...{ isLoggedIn: true },
      }
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        ...{ isLoggedIn: false },
      }

      case actionTypes.AUTO_LOGIN:
      return {
        ...state,
        ...{ isLoggedIn: actions.payload },
      }
    default:
      return state
    // return {
    //   ...state,
    //   ...{ isLoggedIn: token ? true : false, }
    // }
  }
}

export default reducer
