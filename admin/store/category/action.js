export const actionTypes = {
  GET_CATEGORY: "GET_CATEGORY",
  ADD_CATEGORY: "ADD_CATEGORY",
  EDIT_CATEGORY: "EDIT_CATEGORY",
};

export function addCategory(payload) {
  return { type: actionTypes.ADD_CATEGORY, payload };
}

export function setCategory(payload) {
  return { type: actionTypes.GET_CATEGORY, payload };
}

export function editCategory(payload) {
  console.log("Adsd", payload);
  return { type: actionTypes.EDIT_CATEGORY, payload };
}
