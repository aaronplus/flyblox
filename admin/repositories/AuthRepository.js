import Repository, { Local } from "./Repository"
const baseURL = `${process.env.baseURL}`;
const baseAuthUrl = `${baseURL}/api/admin`

class AuthRepository {
    constructor(callback) {
        this.callback = callback
    }

    async register(payload) {
        const endPoint = `register`
        const reponse = await Local.post(`${baseAuthUrl}/${endPoint}`, payload)
            .then((response) => {
                if (response.status === 201) {
                    return { status: "Success", message: response.data.message, token: response.data.token }
                } else if (response.status > 399 && response.status > 499) {
                    return { status: "Failed", message: response.data.error }
                } else {
                    return { status: "Failed", message: "An error occured at server side" }
                }
            })
            .catch((error) => {
                console.log(error)
                if (error.response) {
                    return { status: "Failed", message: error.response.data.error }
                }
                else return { status: "Failed", message: "An error occured" }
            })
        return reponse
    }

    async login(payload) {
        const endPoint = `login`
        const reponse = await Local.post(`${baseAuthUrl}/${endPoint}`, payload)
            .then((response) => {
                if (response.status === 200) {
                    return { status: "success", message: response.data.message, token: response.data.token }
                } else {
                    return null
                }
            })
            .catch((error) => {
                if (error.response) {
                    return { status: "Failed", message: error.response.data.error }
                }
                return { status: "Failed", message: "An error occurred" }
            })
        return reponse
    }

    async forgotPassword(payload) {

        const endPoint = `forgotPassword/${payload}`
        const reponse = await Local.post(`${baseAuthUrl}/${endPoint}`)
            .then((response) => {
                if (response.status === 200) {
                    return { status: "Success", message: response.data.message }
                } else {
                    return null
                }
            })
            .catch((error) => {
                if (error.response) {
                    return { status: "Failed", message: error.response.data.error }
                }
                return { status: "Failed", message: "An error occurred" }
            })
        return reponse
    }

}

export default new AuthRepository()