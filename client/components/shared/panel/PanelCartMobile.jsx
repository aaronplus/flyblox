import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import useEcomerce from '~/hooks/useEcomerce'
import useProduct from '~/hooks/useProduct'
import { calculateAmount } from '~/utilities/ecomerce-helpers'

const PanelCartMobile = ({ onClose, ecomerce, auth }) => {
  const { removeItem } = useEcomerce()
  const { title, thumbnailImage } = useProduct()

  function handleRemoveItem(e, product) {
    e.preventDefault()
    removeItem(product, ecomerce.cartItems, 'cart', auth)
  }

  // useEffect(() => {
  //   if (ecomerce.cartItems) {
  //     getProducts(ecomerce.cartItems)
  //   }
  // }, [ecomerce])
  //view
  let cartItemsView, footerView

  if (ecomerce.cartItems && ecomerce.cartItems.length > 0) {
    console.log('Cart', ecomerce.cartItems)
    const amount = calculateAmount(ecomerce.cartItems)
    const items = ecomerce.cartItems.map(item => (
      <div className='ps-product--cart-mobile' key={item._id}>
        <div className='ps-product__thumbnail'>
          <Link href='/product/[pid]' as={`/product/${item._id}`}>
            <a>{thumbnailImage(item)}</a>
          </Link>
        </div>
        <div className='ps-product__content'>
          <a
            className='ps-product__remove'
            onClick={e => handleRemoveItem(e, item)}
          >
            <i className='icon-cross'></i>
          </a>
          {title(item)}
          <Link href='/product/[pid]' as={`/product/${item._id}`}>
            <a className='ps-product__title'>{item.title}</a>
          </Link>
          <p>
            <strong>Sold by:</strong> {item.vendor}
          </p>
          <small>
            ${item.amount} x {item.quantity}
          </small>
        </div>
      </div>
    ))
    cartItemsView = <div className='ps-cart__items'>{items}</div>
    footerView = (
      <div className='ps-cart__footer'>
        <h3>
          Sub Total:<strong>${amount}</strong>
        </h3>
        <figure>
          <Link href='/account/shopping-cart'>
            <a className='ps-btn' onClick={() => onClose()}>
              View Cart
            </a>
          </Link>
          <Link href='/account/checkout'>
            <a className='ps-btn' onClick={() => onClose()}>
              Checkout
            </a>
          </Link>
        </figure>
      </div>
    )
  } else {
    cartItemsView = <p>Cart empty!</p>
    footerView = (
      <div className='ps-cart__footer'>
        <Link href='/'>
          <a className='ps-btn ps-btn--fullwidth'>Shop now</a>
        </Link>
      </div>
    )
  }
  return (
    <div className='ps-cart--mobile'>
      <div className='ps-cart__content'>
        {cartItemsView}
        {footerView}
      </div>
    </div>
  )
}
export default connect(state => state)(PanelCartMobile)
