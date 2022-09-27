import { actionTypes } from "./action"

export const initState = {
    landingPageAccToSlug: {}
}

function reducer(state = initState, actions) {
    switch (actions.type) {

        case actionTypes.SET_LANDING_PAGE_ACC_TO_SLUG:
            return {
                ...state,
                landingPageAccToSlug: actions?.payload
            };

        default:
            return state
    }
}

export default reducer