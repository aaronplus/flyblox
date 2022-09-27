import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import ProductOnCart from '~/components/elements/products/ProductOnCart'
import useEcomerce from '~/hooks/useEcomerce'
import { calculateAmount } from '~/utilities/ecomerce-helpers'
// import Cart from 'public/static/img/icons/cart.jpg'

const MiniCart = ({ ecomerce, auth }) => {
  const { products, removeItem, removeItems, getQty, getProducts } =
    useEcomerce()

  function handleRemoveItem(e, product) {
    e.preventDefault()
    removeItem(product, ecomerce.cartItems, 'cart', auth)
  }

  // useEffect(() => {
  //   getProducts(ecomerce.cartItems, 'cart')
  // }, [ecomerce])

  let cartItemsView
  if (ecomerce && ecomerce.cartItems.length > 0) {
    const amount = calculateAmount(ecomerce.cartItems)
    const productItems = ecomerce.cartItems.map(item => {
      // const qty = getQty(item._id, ecomerce.cartItems)
      return (
        // <ProductOnCart product={item} key={item._id} quantity={qty}>
        <ProductOnCart product={item} key={item.id}>
          <a
            className='ps-product__remove'
            onClick={e => handleRemoveItem(e, item)}
          >
            <i className='icon-cross'></i>
          </a>
        </ProductOnCart>
      )
    })
    cartItemsView = (
      <div className='ps-cart__content'>
        <div className='ps-cart__items'>{productItems}</div>
        <div className='ps-cart__footer'>
          <h3>
            Sub Total:
            <strong>${amount ? amount : 0}</strong>
          </h3>
          <figure>
            <Link href='/account/shopping-cart'>
              <a className='ps-btn'>View Cart</a>
            </Link>
            <Link href='/account/checkout'>
              <a className='ps-btn'>Checkout</a>
            </Link>
          </figure>
        </div>
      </div>
    )
  } else {
    cartItemsView = (
      <div className='ps-cart__content'>
        <div className='ps-cart__noitems'>
          <div className='message'>
            <span>No products in cart</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='ps-cart--mini'>
      <a className='header__extra' href='#'>
        <i className='icon-cart'></i>
        {/* <img src={Cart} /> */}
        {ecomerce && ecomerce.loading === false ? (
          <span>
            <i>{ecomerce ? ecomerce.cartItems.length : 0}</i>
          </span>
        ) : null}
      </a>
      {cartItemsView}
    </div>
  )
}

export default connect(state => state)(MiniCart)
