import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import useEcomerce from '~/hooks/useEcomerce'
import { notification } from 'antd'
import ProductItems from '~/components/partials/product/ProductItems'
import Router from 'next/router'

const ModuleDetailActionsMobile = ({
  ecomerce,
  product,
  auth,
  productQuantity,
  setProductQuantity
}) => {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useEcomerce()
  const { cartItems } = ecomerce

  useEffect(() => {
    setQuantity(1)
  }, [ecomerce])

  const modalSuccess = (type, message) => {
    notification[type]({
      message: message
    })
  }

  const modalWarning = (type, message) => {
    notification[type]({
      message: message
    })
  }

  function handleAddItemToCart(e) {
    e.preventDefault()
    const existItem = cartItems.find(item => item.id === product._id)
    if (existItem) {
      let total = existItem.quantity + quantity
      if (total <= product.quantity) {
        addItem(
          {
            id: product._id,
            quantity: quantity,
            name: product.name,
            amount: product.sellingPrice,
            seller: product.seller,
            mainImage: product.mainImage,
            maxQuantity: product.quantity
          },
          cartItems,
          'cart',
          auth
        )
        modalSuccess(
          'success',
          'Item successfully added in the cart.'
        )
      } else {
        modalWarning('warning', 'Item Quantity Exceed')
      }
    } else {
      if (quantity <= product.quantity) {
        addItem(
          {
            id: product._id,
            quantity: quantity,
            name: product.name,
            amount: product.sellingPrice,
            seller: product.seller,
            mainImage: product.mainImage,
            maxQuantity: product.quantity
          },
          cartItems,
          'cart',
          auth
        )
        modalSuccess(
          'success',
          'Item successfully added in the cart.'
        )
      } else {
        modalWarning('warning', 'Item Quantity Exceed')
      }
    }
  }

  function handleBuynow(e) {
    e.preventDefault()
    const existItem = cartItems.find(item => item.id === product._id)
    if (existItem) {
      let total = existItem.quantity + quantity
      if (total <= product.quantity) {
        addItem(
          {
            id: product._id,
            quantity: quantity,
            name: product.name,
            amount: product.sellingPrice,
            seller: product.seller,
            mainImage: product.mainImage,
            maxQuantity: product.quantity
          },
          cartItems,
          'cart',
          auth
        )
        setTimeout(function () {
          Router.push('/account/checkout')
        }, 1000)
      } else {
        modalWarning('warning', 'Item Quantity Exceed')
      }
    } else {
      if (quantity <= product.quantity) {
        addItem(
          {
            id: product._id,
            quantity: quantity,
            name: product.name,
            amount: product.sellingPrice,
            seller: product.seller,
            mainImage: product.mainImage,
            maxQuantity: product.quantity
          },
          cartItems,
          'cart',
          auth
        )
        setTimeout(function () {
          Router.push('/account/checkout')
        }, 1000)
      } else {
        modalWarning('warning', 'Item Quantity Exceed')
      }
    }
  }

  return (
    <div className='ps-product__actions-mobile'>
      <a
        className='ps-btn ps-btn--black'
        href='#'
        onClick={e => handleAddItemToCart(e)}
      >
        Add to cart
      </a>
      <a className='ps-btn' href='#' onClick={e => handleBuynow(e)}>
        Buy Now
      </a>
    </div>
  )
}

export default connect(state => state)(ModuleDetailActionsMobile)
