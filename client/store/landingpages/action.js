export const actionTypes = {
    SET_LANDING_PAGE_ACC_TO_SLUG: "SET_LANDING_PAGE_ACC_TO_SLUG",
    GET_LANDING_PAGE_ACC_TO_SLUG: "GET_LANDING_PAGE_ACC_TO_SLUG",
};

export function setLandingPageAccToSlug(payload) {
    return { type: actionTypes.SET_LANDING_PAGE_ACC_TO_SLUG, payload };
}

// export function getLandingPageAccToSlug(payload) {
//     return { type: actionTypes.GET_LANDING_PAGE_ACC_TO_SLUG, payload };
// }