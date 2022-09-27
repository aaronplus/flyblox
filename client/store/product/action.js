export const actionTypes = {
  ADD_PRODUCT: "ADD_PRODUCT",
  EDIT_PRODUCT: "EDIT_PRODUCT",
};

export function addProduct(payload) {
  return { type: actionTypes.ADD_PRODUCT, payload: payload };
}

export function editProduct(payload) {
  return { type: actionTypes.EDIT_PRODUCT, payload: payload };
}
