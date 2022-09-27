import { useState } from 'react'
import {
  getProductsByCategoriesHelper,
  getProductsByCollectionHelper,
} from '~/utilities/strapi-fetch-data-helpers'
import OrderRepository from '~/repositories/OrderRepository'

export default function useGetOrders() {
  const [loading, setLoading] = useState(false)
  const [buyerOrders, setBuyerOrders] = useState(null)
  const [sellerOrders, setSellerOrders] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [dispute, setDispute] = useState(null)
  const [disputes, setDisputes] = useState(null)
  return {
    loading,
    buyerOrders,
    sellerOrders,
    feedback,
    dispute,
    disputes,

    setBuyerOrders: (payload) => {
      setBuyerOrders(payload)
    },

    setLoading: (payload) => {
      setLoading(payload)
    },

    getSellerOrders: async () => {
      setLoading(true)
      const responseData = await OrderRepository.getSellerOrders()
      if (responseData) {
        setSellerOrders(responseData.orders)
        setTimeout(
          function () {
            setLoading(false)
          }.bind(this),
          250
        )
      }
    },

    getUserOrders: async (payload) => {
      setLoading(true)
      const responseData = await OrderRepository.getUserOrders(payload)
      if (responseData) {
        setBuyerOrders(responseData.orders)
        setTimeout(
          function () {
            setLoading(false)
          }.bind(this),
          250
        )
      }
    },

    changeOrderStatus: async (payload) => {
      setLoading(true)
      const responseData = await OrderRepository.changeOrderStatus(payload)
      if (responseData) {
        setTimeout(
          function () {
            setLoading(false)
          }.bind(this),
          250
        )
      }
    },

    getOrderFeedBack: async (payload, filter) => {
      // setLoading(true)
      const responseData = await OrderRepository.getOrderFeedBack(
        payload,
        filter
      )
      if (responseData) {
        // console.log(responseData.orderFeedback)
        return responseData.orderFeedback
        // setTimeout(
        //   function () {
        //     setFeedback(responseData.orderFeedback)
        //     setLoading(false)
        //   }.bind(this),
        //   250
        // )
      }
      return null
    },

    addOrderFeedBack: async (payload) => {
      setLoading(true)
      const responseData = await OrderRepository.addOrderFeedBack(payload)
      if (responseData) {
        setTimeout(
          function () {
            setLoading(false)
          }.bind(this),
          250
        )
      }
    },

    addOrderDispute: async (payload) => {
      setLoading(true)
      const responseData = await OrderRepository.addOrderDispute(payload)
      if (responseData) {
        setTimeout(
          function () {
            setLoading(false)
          }.bind(this),
          250
        )
      }
    },

    getDispute: async (payload) => {
      setLoading(true)
      const responseData = await OrderRepository.getDispute(payload)
      if (responseData) {
        setDispute(responseData.orderDispute)
        setTimeout(
          function () {
            setLoading(false)
          }.bind(this),
          250
        )
      }
    },

    getDisputes: async () => {
      setLoading(true)
      const responseData = await OrderRepository.getDisputes()
      if (responseData) {
        setDisputes(responseData.orderDisputes)
        setTimeout(
          function () {
            setLoading(false)
          }.bind(this),
          250
        )
      }
    },
  }
}
