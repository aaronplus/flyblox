import { useState } from 'react'
import { useDispatch } from 'react-redux'
import LazyLoad from 'react-lazyload'

import { baseUrl } from '~/repositories/Repository'
import CategoryRepository from '~/repositories/CategoryRepository'

export default function useGetCategories() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState(null)
  const [category, setCategory] = useState(null)
  return {
    loading,
    categories,
    category,

    setCategories: payload => {
      setCategories(payload)
    },

    setCategory: payload => {
      setCategory(payload)
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

    getCategories: async () => {
      let responseData
      setLoading(true)
      console.log('getcategories')
      responseData = await CategoryRepository.getCategories()
      if (responseData) {
        setTimeout(
          function () {
            setCategories(responseData)
            setLoading(false)
          }.bind(this),
          250
        )
      } else {
        setLoading(false)
      }
    },

    getCategory: async payload => {
      let responseData
      responseData = await CategoryRepository.getCategory(payload)
      if (responseData) {
        console.log('responseDataresponseData', responseData)
        setTimeout(
          function () {
            setCategory(responseData)
          }.bind(this),
          250
        )
      } else {
        setLoading(false)
      }
    },

    removeCategory: async payload => {
      setLoading(true)
      let responseData
      responseData = await CategoryRepository.removeCategory(payload)
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
