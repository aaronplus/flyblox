export const actionTypes = {
  GET_TOKEN: "GET_TOKEN",
  ADD_TOKEN: "ADD_TOKEN",
  EDIT_TOKEN: "EDIT_TOKEN",
  REMOVE_TOKEN: "REMOVE_TOKEN",
}

export function addToken(payload) {
  return { type: actionTypes.ADD_TOKEN, payload }
}

export function setToken(payload) {
  return { type: actionTypes.GET_TOKEN, payload }
}

export function editToken(payload) {
  return { type: actionTypes.EDIT_TOKEN, payload }
}

export function removeToken(payload) {
  return { type: actionTypes.REMOVE_TOKEN, payload }
}
