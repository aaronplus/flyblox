import React, { useEffect } from 'react'
import { Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { editToken } from '~/store/token/action'
import useTokens from '~/hooks/useToken'
import { useRouter } from 'next/router'

const FormEditToken = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const router = useRouter()
  const { pid } = router.query

  const { loading, token, getToken } = useTokens()

  useEffect(() => {
    getToken(pid)
  }, [])

  const handleSubmit = async values => {
    values.id = pid
    dispatch(editToken(values))
    form.resetFields()
  }

  return (
    <>
      {loading == false && token ? (
        <Form form={form} className='ps-form--add' onFinish={handleSubmit}>
          <div className='form-group'>
            <label>Name</label>
            <Form.Item
              name='name'
              initialValue={token?.name}
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
            <Form.Item name='symbol' initialValue={token?.symbol}>
              <Input
                className='form-control'
                type='text'
                placeholder='Token Symbol'
              />
            </Form.Item>
          </div>
          <div className='form-group'>
            <label>Price</label>
            <Form.Item name='price' initialValue={token?.price}>
              <Input
                className='form-control'
                type='text'
                placeholder='Token Price'
              />
            </Form.Item>
          </div>
          <div className='form-group submit'>
            <button type='submit' className='ps-btn ps-btn--fullwidth'>
              Update
            </button>
          </div>
        </Form>
      ) : null}
    </>
  )
}

export default FormEditToken
