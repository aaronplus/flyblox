import React from 'react'
import { Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { addToken } from '~/store/token/action'

const FormCreateToken = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const handleSubmit = async values => {
    dispatch(addToken(values))
    form.resetFields()
  }

  return (
    <Form form={form} className='ps-form--add' onFinish={handleSubmit}>
      <div className='form-group'>
        <label>Name</label>
        <Form.Item
          name='name'
          rules={[
            {
              required: true,
              message: 'Please input Token name!'
            }
          ]}
        >
          <Input
            className='form-control'
            type='text'
            placeholder='Token Name'
          />
        </Form.Item>
      </div>
      <div className='form-group'>
        <label>Symbol</label>
        <Form.Item name='symbol'>
          <Input
            className='form-control'
            type='text'
            placeholder='Token Symbol'
          />
        </Form.Item>
      </div>
      <div className='form-group'>
        <label>Price</label>
        <Form.Item name='price'>
          <Input
            className='form-control'
            type='text'
            placeholder='Token Price'
          />
        </Form.Item>
      </div>
      <div className='form-group submit'>
        <button type='submit' className='ps-btn ps-btn--fullwidth'>
          Add
        </button>
      </div>
    </Form>
  )
}

export default FormCreateToken
