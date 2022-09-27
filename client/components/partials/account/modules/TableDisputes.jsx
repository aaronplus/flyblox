import React, { useState, useEffect } from 'react'
import { Table, Menu, Dropdown, notification, Form, Input } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import useGetOrders from '~/hooks/useGetOrders'
import OrderRepository from '~/repositories/OrderRepository'
import { getCommentFormattedDate } from '~/utilities/date-helpers'

const TableDisputes = () => {
  const { loading, disputes, getDisputes } = useGetOrders()

  useEffect(() => {
    getDisputes()
  }, [])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [messages, setMessages] = useState()
  const [filterItems, setfilterItems] = useState(disputes)
  const [form] = Form.useForm()

  useEffect(() => {
    if (disputes) {
      setfilterItems(disputes)
    }
  }, [disputes])

  const Alert = (type, message) => {
    notification[type]({
      message: message,
    })
  }

  // const handleClaim = async (productId, orderItemId, action, orderNo) => {
  //   try {
  //     if (orderNo) {
  //       console.log('OrderNo', orderNo)
  //       const res = await OrderRepository.releasePayment(orderNo)
  //       if (res) {
  //         await changeOrderStatus({ productId, orderItemId, action })
  //         getSellerOrders()
  //         Alert('success', 'Payment has been sent to your account')
  //       }
  //     } else {
  //       console.log('No order Number Found')
  //       Alert('error', 'No order Number Found')
  //     }
  //   } catch (e) {
  //     console.log('error', e)
  //     Alert('error', 'An Error Occurred')
  //   }
  // }

  const handleCancelDispute = async (record) => {
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
          handleCancelDispute(record)
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
    let tempName =
      record?.user === record?.buyer?._id
        ? `${record?.buyer?.firstName}  ${record?.buyer?.lastName}`
        : `${record?.seller?.firstName}  ${record?.seller?.lastName}`
    setName(tempName)
    setMessages(record?.messages)
    setIsModalVisible(true)
  }

  const menu = (id, record) => (
    <Menu>
      <Menu.Item
        key='1'
        onClick={() => {
          getDisputes()
          handleReply(id, record)
        }}
      >
        Reply
      </Menu.Item>
      {record?.user === record?.seller?._id ? (
        <Menu.Item key='2' onClick={() => alert('Refund Button Clicked')}>
          Refund Payment
        </Menu.Item>
      ) : null}
      {record?.user === record?.buyer?._id ? (
        <>
          <Menu.Item key='3' onClick={() => handleCancelDispute(record)}>
            Cancel Dispute
          </Menu.Item>
          <Menu.Item
            key='4'
            onClick={() => handleCancelDisputeAndReleasePayment(record)}
          >
            Cancel And Release Payment
          </Menu.Item>
        </>
      ) : null}
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

  // const handleSearch = (e) => {
  //   if (e.target.value === '') {
  //     setfilterItems(sellerOrders)
  //   } else {
  //     const results = sellerOrders.filter(
  //       (item) =>
  //         (item.buyer &&
  //           item.buyer[0].firstName
  //             .toLowerCase()
  //             .includes(e.target.value.toLowerCase())) ||
  //         (item.buyer &&
  //           item.buyer[0].lastName
  //             .toLowerCase()
  //             .includes(e.target.value.toLowerCase())) ||
  //         (item.orderItems &&
  //           item.orderItems.name
  //             .toLowerCase()
  //             .includes(e.target.value.toLowerCase()))
  //     )
  //     setfilterItems(results)
  //   }
  // }

  return (
    <>
      {/* <div className='row'>
        <div className='col-xl-5 col-lg-12 col-md-12 col-sm-12 col-12 '>
          <div className='ps-form__left'>
            <p>Search List</p>
          </div>
        </div>
        <div className='col-12 '>
          <input
            className='form-control'
            type='text'
            placeholder='Search By Product Name, Buyer Name'
            onChange={(e) => handleSearch(e)}
          />
        </div>
      </div> */}

      <Table
        columns={tableColumn}
        dataSource={filterItems}
        // onRow={(record, rowIndex) => {
        //   return {
        //     onClick: () => {
        //       router.push(`/product/${record.orderItems.product}`)
        //     }, // click row
        //   }
        // }}
      />
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

export default TableDisputes
