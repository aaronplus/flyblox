import { Local, baseUrl } from "./Repository"
const baseProductUrl = `${baseUrl}/api/landingpages`


export const getLandingPageBySlug = async (payload) => {
    const endPoint = payload.slug
    const reponse = await Local.get(`${baseProductUrl}/getBySlug/${endPoint}`)
        .then((response) => {
            if (response.status === 200) {
                return response
            } else {
                return response
            }
        })
        .catch((error) => {
            console.log(error)
            if (error.response) {
                return { status: "Failed", message: error.response.data.error }
            }
            return { status: "Failed", message: "An error occurred" }
        })
    return reponse
}
