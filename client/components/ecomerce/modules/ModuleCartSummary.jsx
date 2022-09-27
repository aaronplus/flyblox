import React from 'react'
import Link from 'next/link'
import { calculateAmount } from '~/utilities/ecomerce-helpers'
import { connect } from 'react-redux'
import { Spin } from 'antd'

const ModuleCartSummary = ({ ecomerce }) => {
  // View
  let productItemsView, amount
  if (ecomerce && ecomerce.cartItems.length > 0) {
    amount = calculateAmount(ecomerce.cartItems)
    productItemsView = ecomerce.cartItems.map(item => {
      return (
        <li key={item.id}>
          <span className='ps-block__estimate'>
            <Link href='/product/[pid]' as={`/product/${item.id}`}>
              <a className='ps-product__title'>
                {item.name}
                <br /> x {item.quantity}
              </a>
            </Link>
          </span>
        </li>
      )
    })
  }

  return (
    <>
      <div className='ps-block--shopping-total'>
        {ecomerce && ecomerce.loading === false ? (
          <>
            <div className='ps-block__header'>
              <p>
                Subtotal <span> ${amount}</span>
              </p>
            </div>
            <div className='ps-block__content'>
              <ul className='ps-block__product'>{productItemsView}</ul>
              <h3>
                Total <span>${amount}</span>
              </h3>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spin />
          </div>
        )}
      </div>
    </>
  )
}

export default connect(state => state)(ModuleCartSummary)
