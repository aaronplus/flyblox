import { Local } from "./Repository"
import { baseURL } from "~/endpoints"
const baseCartUrl = `${baseURL}/api/cart`

class CartRepository {
    constructor(callback) {
        this.callback = callback
    }

    async addItem(payload) {
        const endPoint = `addItem`
        const reponse = await Local.put(`${baseCartUrl}/${endPoint}`, payload)
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

    async removeItem(payload) {
        const endPoint = `removeItem`
        const reponse = await Local.put(`${baseCartUrl}/${endPoint}`, payload)
            .then((response) => {
                if (response.status === 200) {
                    return { status: "Success", message: response.data.message }
                } else {
                    console.log(response)
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

    async removeItemByList(orderItems) {
        const endPoint = `removeItemByList`
        const reponse = await Local.put(`${baseCartUrl}/${endPoint}`, { orderItems: orderItems })
            .then((response) => {
                if (response.status === 200) {
                    return { status: "Success", message: response.data.message, cartItems: response.data.cartItems }
                } else {
                    console.log(response)
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

    async removeItems(payload) {
        const endPoint = `removeItems`
        const reponse = await Local.put(`${baseCartUrl}/${endPoint}`, payload)
            .then((response) => {
                if (response.status === 200) {
                    return { status: "Success", message: response.data.message }
                } else {
                    console.log(response)
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
    async updateQuantity(payload) {
        const endPoint = `updateQuantity`
        const reponse = await Local.put(`${baseCartUrl}/${endPoint}`, payload)
            .then((response) => {
                if (response.status === 200) {
                    return { status: "Success", message: response.data.message }
                } else {
                    console.log(response)
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

    async getCartItems() {
        const endPoint = `getByUser`
        const reponse = await Local.get(`${baseCartUrl}/${endPoint}`)
            .then((response) => {
                if (response.status === 200) {
                    return { status: "Success", message: response.data.message, cartItems: response.data.cartItems }
                } else {
                    console.log(response)
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

    async addCartItems(payload) {
        const endPoint = `addItems`
        const reponse = await Local.put(`${baseCartUrl}/${endPoint}`, payload)
            .then((response) => {
                if (response.status === 200) {
                    return { status: "Success", message: response.data.message, cartItems: response.data.cartItems }
                } else {
                    console.log(response)
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

    async getCartItemsBySellers() {
        const endPoint = `getBySellers`
        const reponse = await Local.get(`${baseCartUrl}/${endPoint}`)
            .then((response) => {
                if (response.status === 200) {
                    return { status: "Success", message: response.data.message, cartItemsBySeller: response.data.cartItemsBySeller,contract:response.data.contract }
                } else {
                    console.log(response)
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

export default new CartRepository()
