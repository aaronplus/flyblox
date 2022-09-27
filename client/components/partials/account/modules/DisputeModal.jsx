import { Input, Form, notification } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { useEffect } from 'react'
import useGetOrders from '~/hooks/useGetOrders'
import OrderRepository from '~/repositories/OrderRepository'
import { getCommentFormattedDate } from '~/utilities/date-helpers'

const DisputeModal = ({
  isDisputeModalVisible,
  handleDisputeOk,
  handleDisputeCancel,
  getUserOrders,
  order,
}) => {
  const [form] = Form.useForm()
  const [formReply] = Form.useForm()
  const { loading, dispute, getDispute } = useGetOrders()

  useEffect(async () => {
    if (order) {
      getDispute({
        orderId: order._id,
        productId: order.orderItems?.product,
      })
    }
  }, [order])

  const Alert = (type, message) => {
    notification[type]({
      message: message,
    })
  }

  const handleSubmit = (values) => {
    form.resetFields()
    handleDisputeOk(values)
  }

  const handleCancel = () => {
    form.resetFields()
    handleDisputeCancel()
  }

  const onFinishFailed = (errorInfo) => {}

  const handleReply = async (values) => {
    let id = dispute._id
    let name = `${dispute?.buyer?.firstName}  ${dispute?.buyer?.lastName}`
    try {
      const res = await OrderRepository.addDisputeMessage({
        id,
        name,
        text: values.text,
      })
      if (res && res.status === 200) {
        Alert('success', 'Reply Sent')
      } else {
        console.log('Dispute not Found')
        Alert('error', 'Dispute not Found')
      }
    } catch (e) {
      console.log('error', e)
      Alert('error', 'An Error Occurred')
    }
    formReply.resetFields()
    handleDisputeCancel()
  }

  const handleCancelDispute = async () => {
    let id = dispute._id
    let orderId = dispute?.order?._id
    let orderItemId = dispute?.order?.orderItems[0]?._id
    try {
      const res = await OrderRepository.closeDispute({
        id,
        orderId,
        orderItemId,
      })
      if (res && res.status === 200) {
        Alert('success', 'Dispute Closed')
      } else {
        console.log('Dispute not Found')
        Alert('error', 'Dispute not Found')
      }
    } catch (e) {
      console.log('error', e)
      Alert('error', 'An Error Occurred')
    }
    getUserOrders()
    handleCancel()
  }

  const handleCancelDisputeAndReleasePayment = async () => {
    try {
      if (dispute?.order?.orderNo) {
        const res = await OrderRepository.releasePayment(
          dispute?.order?.orderNo
        )
        if (res) {
          handleCancelDispute()
          Alert('success', 'Payment has been sent to your account')
        }
      } else {
        console.log('No order Number Found')
        Alert('error', 'No order Number Found')
      }
    } catch (e) {
      console.log('error', e)
      Alert('error', 'An Error Occurred')
    }
  }

  return (
    <>
      {loading === false ? (
        <Modal
          title='Dispute'
          visible={isDisputeModalVisible}
          footer={[]}
          onCancel={() => {
            formReply.resetFields()
            handleCancel()
          }}
        >
          <div className='form--feedback'>
            {console.log('Dispute', dispute)}
            {dispute ? (
              // <div style={{ padding: '24px' }}>
              //   <p>
              //     <b>Status: </b>
              //     {dispute.status}
              //   </p>
              //   <p>
              //     <b>Created Date: </b>
              //     {dispute.createdAt.slice(0, 10)}
              //   </p>
              //   <p>
              //     <b>Comment: </b>
              //     {dispute.details}
              //   </p>
              //   <button className='ps-btn ps-btn--fullwidth'>
              //     Cancel Dispute
              //   </button>
              //   <button className='ps-btn ps-btn--fullwidth'>
              //     Cancel Dispute And Release Payment
              //   </button>
              // </div>
              <div className='form-group'>
                <Form
                  form={formReply}
                  onFinish={handleReply}
                  // onFinishFailed={onFinishFailed}
                >
                  <div>
                    {dispute.messages ? (
                      <>
                        {dispute.messages.map((item) => (
                          <div>
                            <h5>{item.name}:</h5>
                            <p style={{ padding: '0rem 1rem' }}>
                              <b>{item.text}</b> (
                              {getCommentFormattedDate(item.createdAt)})
                            </p>
                          </div>
                        ))}
                      </>
                    ) : null}
                    <label>Reply</label>
                    <Form.Item
                      name='text'
                      rules={[
                        {
                          required: true,
                          message: 'Please write text for reply',
                        },
                      ]}
                    >
                      <Input.TextArea
                        rows={7}
                        className='form-control'
                        type='text'
                        placeholder='Details'
                      />
                    </Form.Item>
                  </div>
                  <button type='submit' className='ps-btn ps-btn--fullwidth'>
                    Reply
                  </button>
                </Form>
                <button
                  onClick={() => handleCancelDispute()}
                  className='ps-btn ps-btn--fullwidth'
                >
                  Cancel Dispute
                </button>
                <button
                  onClick={() => handleCancelDisputeAndReleasePayment()}
                  className='ps-btn ps-btn--fullwidth'
                >
                  Cancel Dispute And Release Payment
                </button>
              </div>
            ) : (
              <Form
                form={form}
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
              >
                <div className='form-group'>
                  <label>Details</label>
                  <Form.Item
                    name='details'
                    rules={[
                      {
                        required: true,
                        message: 'Please give some details',
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={7}
                      className='form-control'
                      type='text'
                      placeholder='Details'
                    />
                  </Form.Item>
                </div>
                <button type='submit' className='ps-btn ps-btn--fullwidth'>
                  Submit
                </button>
              </Form>
            )}
          </div>
        </Modal>
      ) : null}
    </>
  )
}

export default DisputeModal
