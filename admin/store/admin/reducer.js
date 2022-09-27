import { actionTypes } from "./action";

export const initState = {};

function reducer(state = initState, actions) {
  switch (actions.type) {
    case actionTypes.GET_USERS:
      return {
        ...state,
        ...{ users: actions.payload },
      };
    default:
      return state;
  }
}

export default reducer;
