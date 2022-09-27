import React, { useEffect, useState } from 'react'
import { Form, Input, Radio, Select } from 'antd'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import { useDispatch } from 'react-redux'
import { editProduct } from '~/store/product/action'
import ProductRepository from '~/repositories/ProductRepository'
import Countries from '~/utilities/countries.json'

const ProductEditForm = ({ id }) => {
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)

  async function getProduct(pid) {
    setLoading(true)
    const responseData = await ProductRepository.getProductsById(pid)
    if (responseData.product) {
      setProduct(responseData.product)
      setTimeout(
        function () {
          setLoading(false)
        }.bind(this),
        250
      )
    }
  }

  useEffect(() => {
    if (id && id.length > 0) {
      getProduct(id)
    }
  }, [id])

  const handleSubmit = async (values) => {
    values.id = id
    // console.log(values)
    dispatch(editProduct(values))
  }

  return (
    <div>
      {product ? (
        <div>
          <Form className='ps-form--add' onFinish={handleSubmit}>
            <div className='ps-section__header'>
              <h3>Edit Product</h3>
            </div>
            <div className='form-group'>
              <label>Product Name</label>
              <Form.Item
                name='name'
                initialValue={product.name}
                rules={[
                  {
                    required: true,
                    message: 'Please input product name!',
                  },
                ]}
              >
                <Input
                  className='form-control'
                  type='text'
                  placeholder='Product Name'
                />
              </Form.Item>
            </div>
            <div className='form-group'>
              <label>Description</label>
              <Form.Item
                name='description'
                initialValue={product.description}
                rules={[
                  {
                    required: true,
                    message: 'Please input description!',
                  },
                ]}
              >
                <Input.TextArea
                  className='form-control'
                  type='text'
                  placeholder='Description'
                />
              </Form.Item>
            </div>
            <div className='section'>
              <div className='form-group three-item'>
                <label>Domestic Shipinng Charges</label>
                <Form.Item
                  name='shippingCharges'
                  initialValue={product.shippingCharges}
                  rules={[
                    {
                      required: true,
                      message: 'Please input Selling Price!',
                    },
                    {
                      validator(_, value) {
                        if (value && isNaN(value)) {
                          return Promise.reject(
                            new Error(
                              'Please input Shipping Charges in number!'
                            )
                          )
                        }
                        return Promise.resolve()
                      },
                    },
                  ]}
                >
                  <Input
                    className='form-control'
                    type='text'
                    placeholder='Shipinng Charges'
                  />
                </Form.Item>
              </div>
              <div className='three-item free-shipping'>
                <Form.Item
                  name='freeShipping'
                  valuePropName='checked'
                  initialValue={product.freeShipping}
                >
                  <Checkbox defaultChecked={false}>Free Shipping</Checkbox>
                </Form.Item>
              </div>
              <div className='form-group three-item'>
                <label className=''>Shipping Days</label>
                <Form.Item
                  name='shippingDays'
                  initialValue={product.shippingDays}
                  rules={[
                    {
                      required: true,
                      message: 'Please input shipping days!',
                    },
                    {
                      validator(_, value) {
                        if (value && isNaN(value)) {
                          return Promise.reject(
                            new Error('Please input Shipping Days in number!')
                          )
                        }
                        return Promise.resolve()
                      },
                    },
                  ]}
                >
                  <Input
                    className='form-control'
                    type='text'
                    placeholder='Shipping Days'
                  />
                </Form.Item>
              </div>
            </div>
            <div className='section'>
              <div className='form-group two-item'>
                <label>Country of Sale</label>
                <Form.Item
                  name='countryOfSale'
                  initialValue={product.countryOfSale}
                  rules={[
                    {
                      required: true,
                      message: 'Please input Country of Sale!',
                    },
                  ]}
                >
                  {/* <Input
                    className='form-control'
                    type='text'
                    placeholder='Country of Sale'
                  /> */}
                  <Select
                    allowClear
                    showSearch
                    placeholder='Select Country'
                    style={{ width: '100%' }}
                    // onChange={this.handleChange}
                    options={Countries}
                  />
                </Form.Item>
              </div>
              <div className='form-group two-item radio'>
                <label>Ship Internationally</label>
                <Form.Item
                  name='freeInternationally'
                  initialValue={product.freeInternationally}
                >
                  <Radio.Group className='form-group'>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
            <div className='form-group'>
              <label>Sku Code</label>
              <Form.Item name='sku' initialValue={product.sku}>
                <Input
                  className='form-control'
                  type='text'
                  placeholder='Not Required but will improve your search result'
                />
              </Form.Item>
            </div>
            <div className='form-group'>
              <label>Manufacture Part Number</label>
              <Form.Item
                name='manufacturePartNo'
                initialValue={product.manufacturePartNo}
              >
                <Input
                  className='form-control'
                  type='text'
                  placeholder='Not Required but will improve your search result'
                />
              </Form.Item>
            </div>
            <div className='form-group'>
              <label>Product Serial Number</label>
              <Form.Item
                name='productSerialNo'
                initialValue={product.productSerialNo}
              >
                <Input
                  className='form-control'
                  type='text'
                  placeholder='Not Required but will improve your search result'
                />
              </Form.Item>
            </div>
            <div className='form-group'>
              <label>Terms And Conditions</label>
              <Form.Item name='terms' initialValue={product.terms}>
                <Select
                  allowClear
                  showSearch
                  placeholder='Select Terms And Conditions'
                  style={{ width: '100%' }}
                  // onChange={this.handleChange}
                  options={[
                    {
                      value:
                        'Return Accepted, buyer pays return postage in 30 days',
                    },
                    {
                      value:
                        'Return Accepted, buyer pays return postage in 60 days',
                    },
                    {
                      value:
                        'Return Accepted, seller pays return postage in 30 days',
                    },
                    {
                      value:
                        'Return Accepted, seller pays return postage, in 60 days',
                    },
                  ]}
                />
                {/* <Input.TextArea
                  className='form-control'
                  type='text'
                  placeholder='You can get a full refund within 30 days'
                /> */}
              </Form.Item>
            </div>
            <div className='form-group'>
              <label>Product Tags</label>
              <Form.Item name='tags' initialValue={product.tags}>
                <Input
                  className='form-control'
                  type='text'
                  placeholder='Not Required but will improve your search result'
                />
              </Form.Item>
            </div>
            <div className='form-group submit'>
              <button type='submit' className='ps-btn ps-btn--fullwidth'>
                Update
              </button>
            </div>
          </Form>
        </div>
      ) : null}
    </div>
  )
}

export default ProductEditForm
