import { useState } from "react"
import TokenRepository from "~/repositories/TokenRepository"

export default function useTokens() {
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState(null)
    const [tokens, setTokens] = useState(null)
    return {
        loading,
        token,
        tokens,

        setTokens: (payload) => {
            setTokens(payload)
        },

        setLoading: (payload) => {
            setLoading(payload)
        },

        getToken: async (payload) => {
            setLoading(true)
            let responseData
            responseData = await TokenRepository.getToken(payload)
            if (responseData) {
                setTimeout(
                    function () {
                        setLoading(false)
                        setToken(responseData)
                    }.bind(this),
                    250
                )
            } else {
                setLoading(false)
            }
        },

        getTokens: async () => {
            setLoading(true)
            let responseData
            responseData = await TokenRepository.getTokens()
            if (responseData && responseData.data) {
                setTimeout(
                    function () {
                        setLoading(false)
                        setTokens(responseData.data.tokens)
                    }.bind(this),
                    250
                )
            } else {
                setLoading(false)
            }
        },
    }
}
