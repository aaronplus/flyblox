import { actionTypes } from "./action";

export const initState = {
};

function reducer(state = initState, actions) {
  switch (actions.type) {
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        ...{ registerSuccess: true },
      };
    default:
      return state;
  }
}

export default reducer;
