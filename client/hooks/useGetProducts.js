import { useState } from 'react'
import {
  getProductsByCategoriesHelper,
  getProductsByCollectionHelper
} from '~/utilities/strapi-fetch-data-helpers'
import ProductRepository from '~/repositories/ProductRepository'

export default function useGetProducts() {
  const [loading, setLoading] = useState(false)
  const [productItems, setProductItems] = useState(null)
  const [product, setProduct] = useState(null)
  const [oneproduct, setOneProduct] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [rating, setRating] = useState(null)
  return {
    loading,
    productItems,
    product,
    oneproduct,
    reviews,
    rating,
    setProductItems: payload => {
      setProductItems(payload)
    },

    setLoading: payload => {
      setLoading(payload)
    },

    getProductsByCollection: async payload => {
      setLoading(true)
      const responseData = await ProductRepository.getProducts(
        payload
      )
      // const responseData = await getProductsByCollectionHelper(payload);
      if (responseData) {
        setProductItems(responseData)
        setTimeout(
          function () {
            setLoading(false)
          }.bind(this),
          250
        )
      }
    },

    getProductsByCategory: async payload => {
      setLoading(true)
      const responseData =
        await ProductRepository.getProductsByCategory(payload)
      if (responseData) {
        setProductItems(responseData)
        setTimeout(
          function () {
            setLoading(false)
          }.bind(this),
          250
        )
      } else {
        setProductItems(null)
        setLoading(false)
      }
    },

    getProducts: async payload => {
      setLoading(true)
      let responseData
      if (payload) {
        responseData = await ProductRepository.getProducts(payload)
      } else {
        const queries = {
          _limit: 12
        }
        responseData = await ProductRepository.getProducts(queries)
      }
      if (responseData) {
        setProductItems(responseData)
        setTimeout(
          function () {
            setLoading(false)
          }.bind(this),
          250
        )
      }
    },

    getProductsByPagination: async payload => {
      setLoading(true)
      let responseData =
        await ProductRepository.getProductsByPagination(payload)
      if (responseData) {
        setProductItems(responseData)
        setTimeout(
          function () {
            setLoading(false)
          }.bind(this),
          250
        )
      }
    },

    getProductById: async payload => {
      setLoading(true)
      const responseData = await ProductRepository.getProductsById(
        payload
      )
      if (responseData.product) {
        setProduct(responseData.product)
        setTimeout(
          function () {
            setLoading(false)
          }.bind(this),
          250
        )
      }
    },

    getOneProduct: async payload => {
      setLoading(true)
      const responseData = await ProductRepository.getOneProducts(
        payload
      )
      if (responseData) {
        setOneProduct(responseData)
        setTimeout(
          function () {
            setLoading(false)
          }.bind(this),
          250
        )
      }
    },
    getProductBySeller: async () => {
      setLoading(true)
      const responseData =
        await ProductRepository.getProductsBySeller()
      if (responseData) {
        setProductItems(responseData)
        setTimeout(
          function () {
            setLoading(false)
          }.bind(this),
          250
        )
      }
    },

    statusChanged: async payload => {
      const responseData = await ProductRepository.statusChange(
        payload
      )
      if (responseData) {
        return responseData
      } else {
        return null
      }
    },

    updateImages: async (id, payload) => {
      const responseData = await ProductRepository.updateImages(
        id,
        payload
      )
      if (responseData.status === 'Success') {
        return responseData
      } else {
        return null
      }
    },

    getProductReviews: async payload => {
      setLoading(true)
      const responseData = await ProductRepository.getProductReviews(
        payload
      )
      if (responseData && responseData?.reviews) {
        setReviews(responseData.reviews)
        setTimeout(
          function () {
            setLoading(false)
          }.bind(this),
          250
        )
      } else {
        setReviews(null)
        setLoading(false)
      }
    },

    getProductRating: async payload => {
      setLoading(true)
      const responseData = await ProductRepository.getProductRating(
        payload
      )
      if (responseData && responseData?.rating) {
        setRating(responseData.rating)
        setTimeout(
          function () {
            setLoading(false)
          }.bind(this),
          250
        )
      } else {
        setRating(null)
        setLoading(false)
      }
    }
  }

}
