import { useState } from 'react'
import LazyLoad from 'react-lazyload'

import LandingPageRepository from '~/repositories/LandingPageRepository'

export default function useGetLandingPage() {
    const [loading, setLoading] = useState(false)
    const [landingPages, setLandingPages] = useState(null)
    const [landingPage, setLandingPage] = useState(null)
    return {
        loading,
        landingPages,
        landingPage,

        setLandingPages: payload => {
            setLandingPages(payload)
        },

        setLandingPage: payload => {
            setLandingPage(payload)
        },

        setLoading: payload => {
            setLoading(payload)
        },

        thumbnailImage: payload => {
            if (payload) {
                return (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '90px'
                        }}
                    >
                        <LazyLoad>
                            <img
                                style={{
                                    maxWidth: '90px'
                                    // minHeight: "90px",
                                    // maxHeight: "90px",
                                }}
                                className='ps-product__thumbnail'
                                src={`${process.env.baseURL}/${payload}`}
                                alt='image'
                            />
                        </LazyLoad>
                    </div>
                )
            }
        },

        getLandingPages: async () => {
            let responseData
            setLoading(true)
            responseData = await LandingPageRepository.getLandingPages()
            if (responseData) {
                setTimeout(
                    function () {
                        setLandingPages(responseData)
                        setLoading(false)
                    }.bind(this),
                    250
                )
            } else {
                setLoading(false)
            }
        },

        getLandingPage : async payload => {
            let responseData
            responseData = await LandingPageRepository.getLandingPage(payload)
            if (responseData) {
                setTimeout(
                    function () {
                        setLandingPage(responseData)
                    }.bind(this),
                    250
                )
            } else {
                setLoading(false)
            }
        },

        removeLandingPage : async payload => {
            setLoading(true)
            let responseData
            responseData = await LandingPageRepository.removeLandingPage(payload)
            if (responseData) {
                console.log('responsedas', responseData)
                setTimeout(
                    function () {
                        setLoading(false)
                    }.bind(this),
                    250
                )
            } else {
                setLoading(false)
            }
        }
    }
}