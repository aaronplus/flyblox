import Repository, {
    Local,
    basePostUrl,
    serializeQuery,
    baseUrl,
} from "./Repository"

class TokenRepository {
    constructor(callback) {
        this.callback = callback
    }

    async getTokens(title_contains) {
        let endPoint = "tokens"
        if (title_contains) {
            endPoint = `tokens?${serializeQuery(title_contains)}`
        }
        const reponse = await Local.get(baseUrl + endPoint)
            .then((response) => {
                return response
            })
            .catch((error) => ({ error: JSON.stringify(error) }))
        return reponse
    }

    async getToken(payload) {
        const endPoint = `tokens/${payload}`
        const reponse = await Local.get(baseUrl + endPoint)
            .then((response) => {
                return response.data.token
            })
            .catch((error) => ({ error: JSON.stringify(error) }))
        return reponse
    }

    async addToken(payload) {
        const reponse = await Local.post(`${baseUrl}tokens/add`, payload)
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

    async editToken(payload) {
        const reponse = await Local.patch(`${baseUrl}tokens/edit/${payload.id}`, payload)
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

    async removeToken(payload) {
        const reponse = await Local.delete(`${baseUrl}tokens/delete/${payload}`)
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

export default new TokenRepository()
