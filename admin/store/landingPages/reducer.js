import { actionTypes } from "./action"

export const initState = {
    landingPage: []
}

function reducer(state = initState, actions) {
    switch (actions.type) {
        case actionTypes.GET_LANDING_PAGE:
            return {
                ...state,
                landingPage: actions.payload,
            }
        default:
            return state
    }
}

export default reducer