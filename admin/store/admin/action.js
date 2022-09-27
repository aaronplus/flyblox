export const actionTypes = {
  GET_USERS: "GET_USERS",
};

export function getUsers(payload) {
  return { type: actionTypes.GET_USERS, payload: payload };
}
