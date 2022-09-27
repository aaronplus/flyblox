export const actionTypes = {
    SET_PRICES_ACC_TO_TOKENS: "SET_PRICES_ACC_TO_TOKENS",
    GET_PRICES_ACC_TO_TOKENS: "GET_PRICES_ACC_TO_TOKENS",
  };
  
  export function setPricesAccToTokens(payload) {
    return { type: actionTypes.SET_PRICES_ACC_TO_TOKENS, payload: payload };
  }