export const actionTypes = {
    GET_LANDING_PAGE: "GET_LANDING_PAGE",
    ADD_LANDING_PAGE: "ADD_LANDING_PAGE",
    EDIT_LANDING_PAGE: "EDIT_LANDING_PAGE",
    REMOVE_LANDING_PAGE: "REMOVE_LANDING_PAGE",
}

export function addLandingPage(payload) {
    return { type: actionTypes.ADD_LANDING_PAGE, payload }
}

export function setLandingPage(payload) {
    return { type: actionTypes.GET_LANDING_PAGE, payload }
}

export function editLandingPage(payload) {
    return { type: actionTypes.EDIT_LANDING_PAGE, payload }
}

export function removeLandingPage(payload) {
    return { type: actionTypes.REMOVE_LANDING_PAGE, payload }
}
