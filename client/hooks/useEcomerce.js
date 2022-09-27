import React, { useState } from 'react'
import ProductRepository from '~/repositories/ProductRepository'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import {
  setCompareItems,
  setWishlistTtems,
  setCartItems
} from '~/store/ecomerce/action'
import CartRepository from '~/repositories/CartRepository'
import { isItemExist } from '~/utilities/ecomerce-helpers'

export default function useEcomerce() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [cartItemsOnCookie] = useState(null)
  const [cookies, setCookie] = useCookies(['cart'])
  const [products, setProducts] = useState(null)
  return {
    loading,
    cartItemsOnCookie,
    products,
    getProducts: async (payload, group = '') => {
      setLoading(true)
      if (payload && payload.length > 0) {
        // let ids = []
        // payload.forEach(item => {ids.push(item.id)})
        const responseData = await ProductRepository.getProductsByIds(
          { payload }
        )
        if (responseData && responseData.length > 0) {
          if (group === 'cart') {
            let cartItems = responseData
            payload.forEach(item => {
              let existItem = cartItems.find(
                val => val.id === item.id
              )
              if (existItem) {
                existItem.quantity = item.quantity
              }
            })
            setProducts(cartItems)
          } else {
            setProducts(responseData)
          }
          setTimeout(
            function () {
              setLoading(false)
            }.bind(this),
            250
          )
        }
      } else {
        setLoading(false)
        setProducts([])
      }
    },

    getQty: (selectedItem, cart) => {
      if (cart) {
        // const existItem = cart.find(item => item.id === selectedItem)
        const existItem = isItemExist(selectedItem, cart)
        if (existItem) {
          return existItem.quantity
        }
      }
      return null
    },

    increaseQty: (payload, currentCart, auth) => {
      let cart = []
      if (currentCart) {
        cart = currentCart
        // const existItem = cart.find(item => item.id === payload.id)
        const existItem = isItemExist(payload, cart)
        if (existItem) {
          existItem.quantity = existItem.quantity + 1
        }
        if (auth && auth.isLoggedIn === true) {
          CartRepository.updateQuantity({
            cartItem: payload,
            action: 'increase'
          })
        }
        setCookie('cart', cart, { path: '/' })
        dispatch(setCartItems(cart))
      }
      return cart
    },

    decreaseQty: (payload, currentCart, auth) => {
      let cart = []
      if (currentCart) {
        cart = currentCart
        // const existItem = cart.find(item => item.id === payload.id)
        const existItem = isItemExist(payload, cart)
        if (existItem) {
          if (existItem.quantity > 1) {
            existItem.quantity = existItem.quantity - 1
          }
        }
        if (auth && auth.isLoggedIn === true) {
          CartRepository.updateQuantity({
            cartItem: payload,
            action: 'decrease'
          })
        }
        setCookie('cart', cart, { path: '/' })
        dispatch(setCartItems(cart))
      }
      return cart
    },

    addItem: (newItem, items, group, auth) => {
      let newItems = []
      if (items) {
        newItems = items
        const existItem = isItemExist(newItem, items)
        if (existItem) {
          if (group === 'cart') {
            existItem.quantity += newItem.quantity
          }
        } else {
          newItems.push(newItem)
        }
      } else {
        newItems.push(newItem)
      }
      if (group === 'cart') {
        if (auth && auth.isLoggedIn === true) {
          CartRepository.addItem({ cartItem: newItem })
        }
        setCookie('cart', newItems, { path: '/' })
        dispatch(setCartItems(newItems))
      }
      if (group === 'wishlist') {
        setCookie('wishlist', newItems, { path: '/' })

        dispatch(setWishlistTtems(newItems))
      }

      if (group === 'compare') {
        setCookie('compare', newItems, { path: '/' })
        dispatch(setCompareItems(newItems))
      }
      return newItems
    },

    removeItem: (selectedItem, items, group, auth) => {
      let currentItems = items
      if (currentItems.length > 0) {
        const index = currentItems.findIndex(item => {
          if (item.id === selectedItem.id) {
            if (selectedItem.attributes) {
              if (
                JSON.stringify(item.attributes) ===
                JSON.stringify(selectedItem.attributes)
              ) {
                return
              }
            } else {
              return
            }
          }
        })
        currentItems.splice(index, 1)
      }
      if (group === 'cart') {
        setCookie('cart', currentItems, { path: '/' })
        if (auth && auth.isLoggedIn === true) {
          CartRepository.removeItem({ cartItem: selectedItem })
        }
        dispatch(setCartItems(currentItems))
      }

      if (group === 'wishlist') {
        setCookie('wishlist', currentItems, { path: '/' })
        dispatch(setWishlistTtems(currentItems))
      }

      if (group === 'compare') {
        setCookie('compare', currentItems, { path: '/' })
      }
    },

    removeItems: group => {
      if (group === 'wishlist') {
        setCookie('wishlist', [], { path: '/' })
        dispatch(setWishlistTtems([]))
      }
      if (group === 'compare') {
        setCookie('compare', [], { path: '/' })
        dispatch(setCompareItems([]))
      }
      if (group === 'cart') {
        CartRepository.removeItems()
        setCookie('cart', [], { path: '/' })
        dispatch(setCartItems([]))
      }
    }
  }
}
