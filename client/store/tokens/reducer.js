import { actionTypes } from "./action";

export const initState = {
  pricesAccToTokens: []
};

function reducer(state = initState, actions) {
  switch (actions.type) {
   

    case actionTypes.SET_PRICES_ACC_TO_TOKENS:
      return {
        ...state,
        pricesAccToTokens: actions?.payload
      };

    default:
      return state;
  }
}

export default reducer;
