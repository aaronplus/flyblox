export const actionTypes = {
  REGISTER: "REGISTER",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT: "LOGOUT",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS",
  CHECK_AUTHORIZATION: "CHECK_AUTHORIZATION",
  AUTO_LOGIN: "AUTO_LOGIN"
}

export function register(payload) {
  return { type: actionTypes.REGISTER, payload: payload }
}
export function registerSuccess() {
  return { type: actionTypes.REGISTER_SUCCESS }
}

export function login(payload) {
  return { type: actionTypes.LOGIN_REQUEST, payload: payload }
}

export function loginSuccess() {
  return { type: actionTypes.LOGIN_SUCCESS }
}

export function autoLogin(payload) {
  return { type: actionTypes.AUTO_LOGIN, payload }
}

export function logOut() {
  return { type: actionTypes.LOGOUT }
}

export function logOutSuccess() {
  return { type: actionTypes.LOGOUT_SUCCESS }
}

export function forgotPassword(payload) {
  return { type: actionTypes.FORGOT_PASSWORD, payload: payload }
}

export function forgotPasswordSuccess() {
  return { type: actionTypes.FORGOT_PASSWORD_SUCCESS }
}
