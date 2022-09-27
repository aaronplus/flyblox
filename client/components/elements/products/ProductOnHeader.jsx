import React from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import useProduct from '~/hooks/useProduct'
import useEcomerce from '~/hooks/useEcomerce'
import { notification } from 'antd'

const ProductOnHeader = ({ ecomerce, product, auth }) => {
  const { thumbnailImage, price, title } = useProduct()
  const { cartItems } = ecomerce
  const { addItem } = useEcomerce()

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
      let total = existItem.quantity + 1
      if (total <= product.quantity) {
        addItem(
          {
            id: product._id,
            quantity: 1,
            name: product.name,
            amount: product.sellingPrice,
            seller: product.seller,
            mainImage: product.mainImage,
            maxQuantity: product.quantity,
            attributes: selectedAttributes
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
        modalWarning('warning', 'Product is out of stock')
      }
    } else {
      if (1 <= product.quantity) {
        addItem(
          {
            id: product._id,
            quantity: 1,
            name: product.name,
            amount: product.sellingPrice,
            seller: product.seller,
            mainImage: product.mainImage,
            maxQuantity: product.quantity,
            attributes: selectedAttributes
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
        modalWarning('warning', 'Product is out of stock')
      }
    }
  }

  // function handleAddItemToCart(e) {
  //   e.preventDefault()
  //   const modalSuccess = (type, message) => {
  //     notification[type]({
  //       message: message
  //     })
  //   }
  //   addItem(
  //     {
  //       id: product._id,
  //       quantity: 1,
  //       name: product.name,
  //       amount: product.sellingPrice,
  //       seller: product.seller,
  //       mainImage: product.mainImage
  //     },
  //     ecomerce.cartItems,
  //     'cart',
  //     auth
  //   )
  //   modalSuccess('success', 'Item successfully added in the cart.')
  // }

  return (
    <div className='ps-product--header-sticky'>
      <div className='ps-product__thumbnail'>
        <Link href='/product/[pid]' as={`/product/${product.id}`}>
          <a>{thumbnailImage(product)}</a>
        </Link>
      </div>
      <div className='ps-product__wrapper'>
        <div className='ps-product__content'>{title(product)}</div>
        <div className='ps-product__shopping'>
          {price(product)}
          <a
            className='ps-btn'
            href='#'
            onClick={e => handleAddItemToCart(e)}
          >
            Add to Cart
          </a>
        </div>
      </div>
    </div>
  )
}

export default connect(state => state)(ProductOnHeader)
