import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import useEcomerce from '~/hooks/useEcomerce'
import { Result, Spin, notification } from 'antd'
import ProductCart from '~/components/elements/products/ProductCart'
import CartRepository from '~/repositories/CartRepository'
import { useState } from 'react'
import {
  calculateAmount,
  calculateAmountWithShipping,
  calculateShippng,
} from '~/utilities/ecomerce-helpers'
import Modal from 'antd/lib/modal/Modal'

const ModuleEcomerceCartItemsBySeller = ({ token, handleSeller }) => {
  const ecomerce = useSelector((state) => state.ecomerce)

  const [cartItemsBySeller, setCartItemsBySeller] = useState()
  const [contract, setContract] = useState()

  useEffect(async () => {
    setTimeout(async function () {
      const res = await CartRepository.getCartItemsBySellers()
      if (res.status == 'Success') {
        setCartItemsBySeller(res.cartItemsBySeller)
        setContract(res.contract)
      }
    }, 100)
  }, [ecomerce])

  return (
    <>
      {cartItemsBySeller && cartItemsBySeller.length > 0 ? (
        <>
          {cartItemsBySeller.map((item, index) => {
            return (
              <div key={index}>
                <h4>
                  Products from {item?.seller?.firstName}{' '}
                  {item?.seller?.lastName}
                </h4>
                <EcomerceCartItems
                  cartItems={item.cartItems}
                  seller={item.seller}
                  token={token}
                  handleSeller={handleSeller}
                  contract={contract}
                />
              </div>
            )
          })}
        </>
      ) : (
        <>
          {cartItemsBySeller && cartItemsBySeller.length === 0 ? (
            <Result status='warning' title='No product in cart.' />
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Spin />
            </div>
          )}
        </>
      )}
    </>
  )
}

const EcomerceCartItems = ({ cartItems, seller, token, handleSeller, contract }) => {
  const order = useSelector((state) => state.order)

  let cartItemsViews, totalView
  if (cartItems && cartItems.length > 0) {
    let amount = token
      ? calculateAmount(cartItems, token.price)
      : calculateAmount(cartItems)
    let shipping = token 
    ? calculateShippng(cartItems, token.price) 
    : calculateShippng(cartItems)
    let total = token
      ? calculateAmountWithShipping(cartItems, shipping, token.price)
      : calculateAmountWithShipping(cartItems, shipping)

    const items = cartItems.map((item, index) => (
      <tr key={index}>
        <td>
          <ProductCart product={item} />
        </td>
        <td data-label='quanity' className='quanity'>
          {item.quantity}
        </td>
        <td data-label='price' className='price'>
          ${item.amount}
        </td>
        <td data-label='total'>
          <strong>${(item.amount * item.quantity).toFixed(2)}</strong>
        </td>
      </tr>
    ))

    cartItemsViews = (
      <>
        <table className='table  ps-table--shopping-cart ps-table--responsive'>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
      </>
    )

    totalView = (
      <figure className='ps-block__total'>
        <h5>
          Subtotal:{' '}
          {token ? (
            <strong>
              {token?.symbol} {isNaN(amount) ? '0' : amount}
            </strong>
          ) : (
            <strong>${isNaN(amount) ? '0' : amount}</strong>
          )}
        </h5>
        <h5>
          Shipping:{' '}
          {token ? (
            <strong>
              {token?.symbol} {isNaN(shipping) ? '0' : shipping}
            </strong>
          ) : (
            <strong>${isNaN(shipping) ? '0' : shipping}</strong>
          )}
        </h5>
        <h4>
          Total:{' '}
          {token ? (
            <strong>
              {token?.symbol} {isNaN(total) ? '0' : total}
            </strong>
          ) : (
            <strong>${isNaN(total) ? '0' : total}</strong>
          )}
        </h4>
      </figure>
    )
  } else if (cartItems && cartItems.length === 0) {
    cartItemsViews = <Result status='warning' title='No product in cart.' />
  }
  return (
    <div
      style={{
        border: '2px solid #eaeaea',
        paddingBottom: '1rem',
        marginBottom: '1rem',
      }}
    >
      {cartItemsViews}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          borderTop: '1px solid #eaeaea',
          paddingTop: '1rem',
          marginRight: '1rem',
        }}
      >
        {totalView}
        <>
          {order?.loading === true ? (
            // <div className='pay'>
            //   <Result status='success' title='Paid' />
            // </div>
            <>
              {order?.currentlyPaying === seller._id ? (
                <button type='button' className='ps-btn ps-btn--black'>
                  <Spin />
                </button>
              ) : (
                <button
                  type='button'
                  disabled
                  className='ps-btn ps-btn--black'
                  style={{ opacity: '0.5' }}
                >
                  Waiting
                </button>
              )}
            </>
          ) : (
            <button
              className='ps-btn ps-btn--black'
              onClick={() => handleSeller({ cartItems, seller, contract })}
            >
              Pay
            </button>
          )}
        </>
      </div>
    </div>
  )
}

export default ModuleEcomerceCartItemsBySeller
