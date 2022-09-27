import React from 'react'
import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import { useEffect } from 'react'

const ProfitCalculator = () => {
  const [form] = Form.useForm()
  const [soldPrice, setSoldPrice] = useState(0)
  const [shippingCharge, setShippingCharge] = useState(0)
  const [shippingCost, setShippingCost] = useState(0)
  const [itemCost, setItemCost] = useState(0)
  // const [result, setResult] = useState(0)

  // useEffect(() => {
  //   let val = soldPrice + shippingCharge + shippingCost + itemCost
  //   setResult(val)
  // }, [soldPrice, shippingCharge, shippingCost, itemCost])

  const onSoldPriceChange = e => {
    if (!isNaN(e.target.value)) {
      if (e.target.value.length === 0) {
        setSoldPrice(0)
      } else {
        setSoldPrice(e.target.value)
      }
    }
  }
  const onShippingCharge = e => {
    if (!isNaN(e.target.value)) {
      if (e.target.value.length === 0) {
        setShippingCharge(0)
      } else {
        setShippingCharge(e.target.value)
      }
    }
  }
  const onShippingCost = e => {
    if (!isNaN(e.target.value)) {
      if (e.target.value.length === 0) {
        setShippingCost(0)
      } else {
        setShippingCost(e.target.value)
      }
    }
  }
  const onItemCost = e => {
    if (!isNaN(e.target.value)) {
      if (e.target.value.length === 0) {
        setItemCost(0)
      } else {
        setItemCost(e.target.value)
      }
    }
  }

  const getFee = () => {
    return (
      (parseInt(soldPrice) + parseInt(shippingCharge)) /
      100
    ).toFixed(2)
  }

  const getResult = () => {
    return (
      parseInt(soldPrice) -
      parseInt(itemCost) -
      parseInt(shippingCost) -
      getFee()
    ).toFixed(2)
  }

  const onReset = () => {
    form.resetFields()
    setSoldPrice(0)
    setShippingCharge(0)
    setShippingCost(0)
    setItemCost(0)
  }

  return (
    <div className='ps-contact-form'>
      <div className='container'>
        <Form className='ps-form--profit' form={form}>
          <div className='ps-section__header'>
            <h3>Flyblox PROFIT CALCULATOR</h3>
          </div>
          <div className='form-group'>
            <label>Sold Price*</label>
            <Form.Item
              name='soldPrice'
              rules={[
                {
                  validator(_, value) {
                    if (value && isNaN(value)) {
                      return Promise.reject(
                        new Error(
                          'Please input Sold Price in number!'
                        )
                      )
                    }
                    return Promise.resolve()
                  }
                }
              ]}
            >
              <Input
                className='form-control'
                type='number'
                placeholder='sale price not including shipping charge'
                onChange={onSoldPriceChange}
              />
            </Form.Item>
          </div>
          <div className='form-group'>
            <label>Shipping Charge</label>
            <Form.Item
              name='shippingCharge'
              rules={[
                {
                  validator(_, value) {
                    if (value && isNaN(value)) {
                      return Promise.reject(
                        new Error(
                          'Please input Shipping Charge in number!'
                        )
                      )
                    }
                    return Promise.resolve()
                  }
                }
              ]}
            >
              <Input
                className='form-control'
                type='number'
                placeholder='amount charged to buyer'
                onChange={onShippingCharge}
              />
            </Form.Item>
          </div>
          <div className='form-group'>
            <label>Shipping Cost</label>
            <Form.Item
              name='shippingCost'
              rules={[
                {
                  validator(_, value) {
                    if (value && isNaN(value)) {
                      return Promise.reject(
                        new Error(
                          'Please input Shipping Cost in number!'
                        )
                      )
                    }
                    return Promise.resolve()
                  }
                }
              ]}
            >
              <Input
                className='form-control'
                type='number'
                placeholder='price you paid for shipping'
                onChange={onShippingCost}
              />
            </Form.Item>
          </div>
          <div className='form-group'>
            <label>Item Cost</label>
            <Form.Item
              name='itemCost'
              rules={[
                {
                  validator(_, value) {
                    if (value && isNaN(value)) {
                      return Promise.reject(
                        new Error('Please input Item Cost in number!')
                      )
                    }
                    return Promise.resolve()
                  }
                }
              ]}
            >
              <Input
                className='form-control'
                type='number'
                placeholder='price you paid for item'
                onChange={onItemCost}
              />
            </Form.Item>
          </div>
          <div className='form-group'>
            <div
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div>Flyblox Fee: USD ${getFee()}</div>
            </div>
          </div>
          <div className='form-group'>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <h4>TOTAL PROFIT: USD ${getResult()}</h4>
            </div>
          </div>
          <div className='form-group submit'>
            <button
              className='ps-btn ps-btn--fullwidth'
              onClick={onReset}
            >
              Reset
            </button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default ProfitCalculator
