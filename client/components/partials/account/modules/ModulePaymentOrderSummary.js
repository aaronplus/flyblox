import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import useEcomerce from '~/hooks/useEcomerce'
import {
  calculateAmount,
  calculateAmountWithShipping,
} from '~/utilities/ecomerce-helpers'
import { Spin } from 'antd'

const ModulePaymentOrderSummary = ({ ecomerce, token }) => {
  const { loading, products, getQty, getProducts } = useEcomerce()

  useEffect(() => {
    if (ecomerce.cartItems) {
      getProducts(ecomerce.cartItems, 'cart')
    }
  }, [ecomerce])

  // view
  let listItemsView, shippingView, totalView
  let amount, subtotal, shipping
  if (products && products.length > 0) {
    shipping = Math.max.apply(
      Math,
      products.map(function (item) {
        return item.shippingCharges
      })
    )

    subtotal = token
      ? calculateAmount(ecomerce.cartItems, token.price)
      : calculateAmount(ecomerce.cartItems)

    amount = token
      ? calculateAmountWithShipping(ecomerce.cartItems, shipping, token.price)
      : calculateAmountWithShipping(ecomerce.cartItems, shipping)

    listItemsView = products.map((item) => {
      let quantity = getQty(item, ecomerce.cartItems)
      return (
        <Link href='/' key={item._id}>
          <a>
            <strong>
              {item.name}
              <span>x{quantity}</span>
              <>
                {item.attributes ? (
                  <span>
                    {Object.keys(item.attributes).map((key) => {
                      return (
                        <div>
                          {key}: {item.attributes[key]}
                        </div>
                      )
                    })}
                  </span>
                ) : null}
              </>
            </strong>
            {token ? (
              <small>
                {token.symbol}{' '}
                {((quantity * item.sellingPrice) / token.price).toFixed(2)}
              </small>
            ) : (
              <small>${quantity * item.sellingPrice}</small>
            )}
          </a>
        </Link>
      )
    })
  } else if (products && products.length === 0) {
    listItemsView = <p>No Product.</p>
  } else {
    listItemsView = (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Spin size='small' />
      </div>
    )
  }
  if (shipping) {
    shippingView = (
      <figure>
        <figcaption>
          <strong>Shipping Fee</strong>
          {token ? (
            <small>
              {token?.symbol} {shipping / token.price}
            </small>
          ) : (
            <small>${shipping}</small>
          )}
        </figcaption>
      </figure>
    )
    totalView = (
      <figure className='ps-block__total'>
        <h3>
          Total
          {token ? (
            <strong>
              {token?.symbol} {isNaN(amount) ? '0' : amount}
            </strong>
          ) : (
            <strong>${isNaN(amount) ? '0' : amount}</strong>
          )}
        </h3>
        {/* <h3>
          Total
          <strong>${parseInt(amount) + shipping}.00</strong>
        </h3> */}
      </figure>
    )
  } else {
    totalView = (
      <figure className='ps-block__total'>
        <h3>
          Total
          {token ? (
            <strong>
              {token?.symbol} {isNaN(amount) ? '0' : amount}
            </strong>
          ) : (
            <strong>${isNaN(amount) ? '0' : amount}</strong>
          )}
        </h3>
      </figure>
    )
  }
  return (
    <div className='ps-block--checkout-order'>
      <div className='ps-block__content'>
        {loading == false ? (
          <>
            <figure>
              <figcaption>
                <strong>Product</strong>
                <strong>total</strong>
              </figcaption>
            </figure>
            <figure className='ps-block__items'>{listItemsView}</figure>
            <figure>
              <figcaption>
                <strong>Subtotal</strong>
                {token ? (
                  <small>
                    {token?.symbol} {subtotal}
                  </small>
                ) : (
                  <small>${subtotal}</small>
                )}
              </figcaption>
            </figure>
            {shippingView}
            {totalView}
          </>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spin />
          </div>
        )}
      </div>
    </div>
  )
}
export default connect((state) => state)(ModulePaymentOrderSummary)
