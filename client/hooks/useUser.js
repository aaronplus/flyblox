import { useState } from "react"
import UserRepository from "~/repositories/UserRepository"

export default function useGetUser() {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    return {
        loading,
        user,

        setUser: (payload) => {
            setCategories(payload)
        },

        setLoading: (payload) => {
            setLoading(payload)
        },


        getUser: async (payload) => {
            let responseData
            responseData = await UserRepository.getUser(payload)
            if (responseData && responseData.user) {
                setTimeout(
                    function () {
                        setLoading(false)
                        setUser(responseData.user)
                    }.bind(this),
                    250
                )
            } else {
                setLoading(false)
            }
        },

        updateUser: async (payload) => {
            let responseData
            responseData = await UserRepository.updateUser(payload)
            if (responseData) {
                return responseData
            } else {
                return null
            }
        },
    }
}
