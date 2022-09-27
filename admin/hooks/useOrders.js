import { useState } from 'react'
import OrderRepository from '~/repositories/OrderRepository'

export default function useGetOrders() {
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState(null)
  const [sales, setSales] = useState(null)
  const [disputes, setDisputes] = useState(null)

  return {
    loading,
    orders,
    sales,
    disputes,

    setOrders: (payload) => {
      setOrders(payload)
    },

    setSales: (payload) => {
      setSales(payload)
    },

    setLoading: (payload) => {
      setLoading(payload)
    },

    getOrders: async (payload) => {
      let responseData
      responseData = await OrderRepository.getOrders(payload)
      if (responseData && responseData.data) {
        setTimeout(
          function () {
            setLoading(false)
            setOrders(responseData.data.orders)
          }.bind(this),
          250
        )
      } else {
        setLoading(false)
      }
    },

    getSales: async () => {
      let responseData = await OrderRepository.getSales()     
      if (responseData && responseData.data) {
        setTimeout(
          function () {
            setLoading(false)
            setSales(responseData.data.sales)
          }.bind(this),
          250
        )
      } else {
        setLoading(false)
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
