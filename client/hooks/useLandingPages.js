import { useState } from 'react'

import { getLandingPageBySlug }from '~/repositories/landingPagesRepository'

export default function useGetLandingPage() {
    const [loading, setLoading] = useState(false)
    const [landingPage, setLandingPage] = useState(null)
    return {
        loading,
        landingPage,

        setLandingPage: payload => {
            setLandingPage(payload)
        },

        setLoading: payload => {
            setLoading(payload)
        },


        getLandingPage : async payload => {
            console.log("payload", payload)

            let responseData
            responseData = await getLandingPageBySlug(payload)
            if (responseData) {
                console.log("Landing page", responseData)
                setTimeout(
                    function () {
                        setLandingPage(responseData.data.result)
                    }.bind(this),
                    250
                )
            } else {
                setLoading(false)
            }
        },

    }
}