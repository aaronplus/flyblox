import { Button, Input, Rate, Form } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useEffect, useState } from 'react'
import useGetOrders from '~/hooks/useGetOrders'

const FeedBackModal = ({
  isFeedBackModalVisible,
  handleFeedBackOk,
  handleFeedBackCancel,
  order,
  filter,
}) => {
  const [form] = Form.useForm()
  const { getOrderFeedBack } = useGetOrders()

  useEffect(async () => {
    if (order) {
      const res = await getOrderFeedBack(
        {
          orderId: order._id,
          productId: order.orderItems?.product
        },
        filter
      )
      if (res) {
        if (filter == "Seller"){
          form.setFieldsValue({ rating: res.stars })
        }else{
          form.setFieldsValue({ description: res.description })
          form.setFieldsValue({ time: res.time })
          form.setFieldsValue({ communication: res.communication })
        }
        form.setFieldsValue({ feedbackText: res.feedbackText })
      }
    }
  }, [order])

  const handleSubmit = values => {
    form.resetFields()
    handleFeedBackOk(values)
  }

  const handleCancel = () => {
    form.resetFields()
    handleFeedBackCancel()
  }

  const onFinishFailed = errorInfo => {}
  return (
    <Modal
      title='FeedBack'
      visible={isFeedBackModalVisible}
      footer={[]}
      onCancel={handleCancel}
    >
      <div className='form--feedback'>
        <Form
          form={form}
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
        >
        {
          filter == "Seller"?
          <div className='form-group two-item'>
            <label>Rating</label>
            <Form.Item
              name='rating'
              rules={[
                {
                  required: true,
                  message: 'Please give a rating'
                }
              ]}
            >
              <Rate />
            </Form.Item>
          </div> 
          :
          <div className='form-group three-item'>
            <div className="after-line">
              <label>Description</label>
              <Form.Item
                name='description'
                rules={[
                  {
                    required: true,
                    message: 'Please give a rating'
                  }
                ]}
              >
                <Rate />
              </Form.Item>
            </div>
            <div className="after-line">
              <label>Postage Time</label>
              <Form.Item
                name='time'
                rules={[
                  {
                    required: true,
                    message: 'Please give a rating'
                  }
                ]}
              >
                <Rate />
              </Form.Item>
            </div>
            <div >
              <label>Communication</label>
              <Form.Item
                name='communication'
                rules={[
                  {
                    required: true,
                    message: 'Please give a rating'
                  }
                ]}
              >
                <Rate />
              </Form.Item>
            </div>
          </div>
        }
          <div className='form-group'>
            <label>FeedBack</label>
            <Form.Item
              name='feedbackText'
              rules={[
                {
                  required: true,
                  message: 'Please give some feedback'
                }
              ]}
            >
              <Input.TextArea
                rows={7}
                className='form-control'
                type='text'
                placeholder='FeedBack'
              />
            </Form.Item>
          </div>
          <button type='submit' className='ps-btn ps-btn--fullwidth'>
            Submit
          </button>
        </Form>
      </div>
    </Modal>
  )
}

export default FeedBackModal
