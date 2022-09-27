import React from 'react'
import { connect } from 'react-redux'
import useEcomerce from '~/hooks/useEcomerce'
import { Result, Spin, notification } from 'antd'
import ProductCart from '~/components/elements/products/ProductCart'

const ModuleEcomerceCartItems = ({ ecomerce, auth }) => {
  const { cartItems } = ecomerce
  const { increaseQty, decreaseQty, removeItem } = useEcomerce()

  function handleRemoveItem(e, product) {
    e.preventDefault()
    removeItem(product, ecomerce.cartItems, 'cart', auth)
  }

  function handleIncreaseItemQty(e, product) {
    e.preventDefault()

    const modalWarning = (type, message) => {
      notification[type]({
        message: message
      })
    }
    const existItem = cartItems.find(item => item.id === product.id)
    if (existItem) {
      let total = existItem.quantity + 1
      if (total <= product.maxQuantity) {
        increaseQty(product, ecomerce.cartItems, auth)
      } else {
        modalWarning('warning', 'Item Quantity Exceed')
      }
    }
  }

  function handleDecreaseItemQty(e, product) {
    e.preventDefault()
    decreaseQty(product, ecomerce.cartItems, auth)
  }
  // View
  let cartItemsViews
  if (ecomerce.cartItems && ecomerce.cartItems.length > 0) {
    const items = ecomerce.cartItems.map((item, index) => (
      <tr key={index}>
        <td>
          <ProductCart product={item} />
        </td>
        <td data-label='price' className='price'>
          ${item.amount}
        </td>
        <td data-label='quantity'>
          <div className='form-group--number'>
            <button
              className='up'
              onClick={e => handleIncreaseItemQty(e, item)}
            >
              +
            </button>
            <button
              className='down'
              onClick={e => handleDecreaseItemQty(e, item)}
            >
              -
            </button>
            <input
              className='form-control'
              type='text'
              placeholder={item.quantity}
              disabled={true}
            />
          </div>
        </td>
        <td data-label='total'>
          <strong>${(item.amount * item.quantity).toFixed(2)}</strong>
        </td>
        <td>
          <a href='#' onClick={e => handleRemoveItem(e, item)}>
            <i className='icon-cross'></i>
          </a>
        </td>
      </tr>
    ))

    cartItemsViews = (
      <>
        <table className='table  ps-table--shopping-cart ps-table--responsive'>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
      </>
    )
  } else if (ecomerce.cartItems && ecomerce.cartItems.length === 0) {
    cartItemsViews = (
      <Result status='warning' title='No product in cart.' />
    )
  } else {
    cartItemsViews = (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Spin />
      </div>
    )
  }
  return <>{cartItemsViews}</>
}

export default connect(state => state)(ModuleEcomerceCartItems)
