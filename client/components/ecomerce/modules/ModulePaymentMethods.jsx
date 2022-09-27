import React, { useState, useEffect } from 'react'
import { Radio } from 'antd'
import { useRouter } from 'next/router'
import { connect, useDispatch } from 'react-redux'
import useEcomerce from '~/hooks/useEcomerce'
import { submitOrder } from '~/store/order/actions'
const ModulePaymentMethods = ({ ecomerce, shipping, submitOrder }) => {
  const Router = useRouter()
  const [method, setMethod] = useState(1)

  const { products, getProducts } = useEcomerce()
  const dispatch = useDispatch()
  useEffect(() => {
    if (ecomerce.cartItems) {
      getProducts(ecomerce.cartItems, 'cart')
    }
  }, [ecomerce])

  function handleChangeMethod(e) {
    setMethod(e.target.value) //e.target.value
  }

  function handleSubmit(e) {
    e.preventDefault()
    submitOrder(ecomerce.cartItems)
    // Router.push('/account/payment-success')
  }

  return (
    <>
      <h4>Payment Methods</h4>
      <div className='ps-block--payment-method'>
        <div className='ps-block__header'>
          <Radio.Group onChange={e => handleChangeMethod(e)} value={method}>
            <Radio value={1}>Visa / Master Card</Radio>
            <Radio value={2}>Paypal</Radio>
          </Radio.Group>
        </div>
        <div className='ps-block__content'>
          {method === 1 ? (
            <div className='ps-block__tab'>
              <div className='form-group'>
                <label>Card Number</label>
                <input type='text' className='form-control' />
              </div>
              <div className='form-group'>
                <label>Card Holders</label>
                <input type='text' className='form-control' />
              </div>
              <div className='row'>
                <div className='col-sm-4 col-4'>
                  <div className='form-group'>
                    <label>Expiration Date (MM/YY)</label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='01/21'
                    />
                  </div>
                </div>
                <div className=' col-sm-4 col-4'>
                  <div className='form-group'>
                    <label>CVV</label>
                    <input type='text' className='form-control' />
                  </div>
                </div>
              </div>
              <div className='form-group'>
                <button
                  className='ps-btn ps-btn--fullwidth'
                  onClick={e => handleSubmit(e)}
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <div className='ps-block__tab'>
              <a
                className='ps-btn'
                href='https://www.paypal.com/'
                target='_blank'
              >
                Process with Paypal
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default connect(state => state, { submitOrder })(ModulePaymentMethods)
