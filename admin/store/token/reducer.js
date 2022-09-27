import { actionTypes } from "./action"

export const initState = {
  tokens: []
}

function reducer(state = initState, actions) {
  switch (actions.type) {
    case actionTypes.GET_TOKEN:
      return {
        ...state,
        tokens: actions.payload,
      }
    default:
      return state
  }
}

export default reducer
