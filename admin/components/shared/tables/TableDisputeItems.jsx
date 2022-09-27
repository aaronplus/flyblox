import React, { useEffect, useState } from 'react'
import useUser from '~/hooks/useUser'
import {
  Table,
  Button,
  Dropdown,
  Menu,
  Modal,
  Form,
  Input,
  notification,
} from 'antd'
import useGetOrders from '~/hooks/useOrders'
import OrderRepository from '~/repositories/OrderRepository'

const TableDisputeItems = ({ title_contains }) => {
  const { loading, disputes, getDisputes } = useGetOrders()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [messages, setMessages] = useState()
  const [form] = Form.useForm()

  useEffect(() => {
    getDisputes()
  }, [])

  const Alert = (type, message) => {
    notification[type]({
      message: message,
    })
  }

  const getCommentFormattedDate = (datetime) => {
    datetime = new Date(datetime)
    const date = datetime.getDay()
    const month = datetime.getMonth() + 1
    const year = datetime.getFullYear()
    const hour = datetime.getHours()
    const minute = datetime.getMinutes()
    const seconds = datetime.getSeconds()

    const formattedDate =
      hour + ':' + minute + ' , ' + date + '/' + month + '/' + year
    return formattedDate
  }

  const handleCancelDispute = async (record) => {
    console.log('R', record)
    try {
      const res = await OrderRepository.closeDispute({
        id: record?._id,
        orderId: record?.order?._id,
        orderItemId: record?.order?.orderItems[0]?._id,
      })
      if (res && res.status === 200) {
        getDisputes()
        Alert('success', 'Dispute Closed')
      } else {
        console.log('Dispute not Found')
        Alert('error', 'Dispute not Found')
      }
    } catch (e) {
      console.log('error', e)
      Alert('error', 'An Error Occurred')
    }
  }

  const handleCancelDisputeAndReleasePayment = async (record) => {
    try {
      if (record?.order?.orderNo) {
        const res = await OrderRepository.releasePayment(record?.order?.orderNo)
        if (res) {
          Alert('success', 'Payment has been sent to your account')
          handleCancelDispute(record)
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

  const handleSubmit = async (values) => {
    try {
      const res = await OrderRepository.addDisputeMessage({
        id,
        name,
        text: values.text,
      })
      if (res && res.status === 200) {
        getDisputes()
        Alert('success', 'Reply Sent')
      } else {
        console.log('Dispute not Found')
        Alert('error', 'Dispute not Found')
      }
    } catch (e) {
      console.log('error', e)
      Alert('error', 'An Error Occurred')
    }
    handleCancel()
  }

  const handleCancel = () => {
    setId('')
    setName('')
    form.resetFields()
    setIsModalVisible(false)
  }

  const handleReply = (id, record) => {
    setId(id)
    setName('Admin')
    setMessages(record?.messages)
    setIsModalVisible(true)
  }

  const menu = (id, record) => (
    <Menu>
      <Menu.Item
        key='1'
        onClick={() => {
          handleReply(id, record)
        }}
      >
        Reply
      </Menu.Item>
      <Menu.Item
        key='2'
        onClick={() => alert('Release Payment to Buyer Clicked')}
      >
        Release Payment to Buyer
      </Menu.Item>
      <Menu.Item
        key='3'
        onClick={() => handleCancelDisputeAndReleasePayment(record)}
      >
        Release Payment to Seller
      </Menu.Item>
      <Menu.Item key='4' onClick={() => handleCancelDispute(record)}>
        Cancel
      </Menu.Item>
    </Menu>
  )

  const tableColumn = [
    {
      title: 'Sr No.',
      key: 'key',
      render: (text, record, index) => {
        return index + 1
      },
    },
    {
      title: 'Order',
      dataIndex: 'order',
      key: '_id',
      render: (order) => {
        return order?.orderItems[0].name
      },
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: '_id',
      render: (user, record) => {
        let name =
          record?.user === record?.buyer?._id
            ? `Buyer: ${record?.buyer?.firstName}  ${record?.buyer?.lastName}`
            : `Seller: ${record?.seller?.firstName}  ${record?.seller?.lastName}`
        return name
      },
    },
    {
      title: 'Last Comment',
      dataIndex: 'messages',
      key: '_id',
      render: (messages) => {
        let message =
          messages.length <= 10
            ? (messages[messages.length - 1]?.text).slice(0, 10) + ' ...'
            : messages[messages.length - 1]?.text
        return message
      },
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render: (id, record) => (
        <span
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <Dropdown.Button overlay={() => menu(id, record)}>
            Action
          </Dropdown.Button>
        </span>
      ),
    },
  ]

  return (
    <>
      <div className='table-responsive'>
        <Table columns={tableColumn} dataSource={disputes} />
      </div>
      <Modal
        title={'Dispute Chat'}
        visible={isModalVisible}
        footer={[]}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          // onFinishFailed={onFinishFailed}
        >
          <div className='form-group'>
            {messages ? (
              <>
                {messages.map((item) => (
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
            Submit
          </button>
        </Form>
      </Modal>
    </>
  )
}

export default TableDisputeItems
