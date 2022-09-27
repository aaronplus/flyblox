import React, { useState, useEffect } from 'react'
import { Table, Menu, Dropdown, notification, Form, Input } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import useGetOrders from '~/hooks/useGetOrders'
import FeedBackModal from './FeedBackModal'
import { useRouter } from 'next/router'
import OrderRepository from '~/repositories/OrderRepository'

const TableSoldItems = () => {
  const router = useRouter()

  const {
    loading,
    sellerOrders,
    getSellerOrders,
    changeOrderStatus,
    addOrderFeedBack,
  } = useGetOrders()

  useEffect(() => {
    getSellerOrders()
  }, [])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isFeedBackModalVisible, setIsFeedBackModal] = useState(false)
  const [productId, setProductId] = useState('')
  const [orderItemId, setOrderItemId] = useState('')
  const [order, setOrder] = useState()
  const [action, setAction] = useState('')
  const [filterItems, setfilterItems] = useState(sellerOrders)
  const [form] = Form.useForm()

  useEffect(() => {
    if (sellerOrders) {
      setfilterItems(sellerOrders)
    }
  }, [sellerOrders])

  const Alert = (type, message) => {
    notification[type]({
      message: message,
    })
  }

  const handleClaim = async (productId, orderItemId, action, orderNo) => {
    try {
      if (orderNo) {
        console.log('OrderNo', orderNo)
        const res = await OrderRepository.releasePayment(orderNo)
        if (res) {
          await changeOrderStatus({ productId, orderItemId, action })
          getSellerOrders()
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

  const handleOk = async () => {
    await changeOrderStatus({ productId, orderItemId, action })
    getSellerOrders()
    form.resetFields()
    setIsModalVisible(false)
  }

  const handleSubmit = async (values) => {
    try {
      const res = await OrderRepository.addTrackingNumber({
        orderId: productId,
        trackingNumber: values.trackingNumber,
      })
      if (res) {
        handleOk()
        Alert('success', 'Tracking number added and Status Changed')
      } else {
        console.log('No order Number Found')
        Alert('error', 'No order Number Found')
      }
    } catch (e) {
      console.log('error', e)
      Alert('error', 'An Error Occurred')
    }
  }

  const handleCancel = () => {
    setProductId('')
    setAction('')
    setOrderItemId('')
    setIsModalVisible(false)
  }

  const handleAction = (productId, orderItemId, action) => {
    setAction(action)
    setProductId(productId)
    setOrderItemId(orderItemId)
    setIsModalVisible(true)
  }

  const handleFeedBackOk = async (values) => {
    await addOrderFeedBack({
      orderId: order?._id,
      sellerId: order?.orderItems?.seller,
      productId: order?.orderItems?.product,
      stars: values?.rating,
      feedbackText: values?.feedbackText,
    })
    setIsFeedBackModal(false)
  }
  const handleFeedBackCancel = () => {
    setOrder(null)
    setIsFeedBackModal(false)
  }

  const handleFeedBackAction = (order) => {
    setOrder(order)
    setIsFeedBackModal(true)
  }

  const menu = (orderId, record) => (
    <Menu>
      {record?.orderItems?.status ? null : (
        <Menu.Item
          key='1'
          onClick={() => {
            handleAction(orderId, record.orderItems._id, 'Product Sent')
          }}
        >
          Product Sent
        </Menu.Item>
      )}
      {record.shippingDate < new Date().toISOString() &&
      record.orderItems.status !== 'Claimed' &&
      record.orderItems.status !== 'On Hold' ? (
        <Menu.Item
          key='2'
          onClick={() => {
            handleClaim(
              orderId,
              record.orderItems._id,
              'Product Claimed',
              record.orderNo
            )
          }}
        >
          Claim Payment
        </Menu.Item>
      ) : null}
      <Menu.Item
        key='3'
        onClick={() => {
          handleFeedBackAction(record)
        }}
      >
        Feedback
      </Menu.Item>
      <Menu.Item
        key='4'
        onClick={() => router.push(`mailto:${record.buyer[0].email}`)}
      >
        Contact Buyer
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
      title: 'Item',
      dataIndex: 'orderItems',
      key: 'orderItems.id',
      render: (orderItem) => {
        return orderItem.name
      },
    },
    {
      title: 'Price',
      dataIndex: 'orderItems',
      key: 'orderItems',
      render: (orderItem) => {
        return orderItem.amount
      },
    },
    {
      title: 'Buyer',
      dataIndex: 'buyer',
      key: 'buyer',
      render: (buyer) => {
        return buyer[0].firstName
      },
    },
    {
      title: 'Sold Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => {
        return date ? date.substring(0, 10) : '-'
      },
    },
    {
      title: 'Shipping Date',
      dataIndex: 'shippingDate',
      key: 'shippingDate',
      render: (date) => {
        return date ? date.substring(0, 10) : '-'
      },
    },
    {
      title: 'Status',
      dataIndex: 'orderItems',
      key: 'status',
      render: (val) => {
        return val.status ? val.status : 'Shipment Pending'
      },
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render: (orderId, record) => (
        <span
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <Dropdown.Button overlay={() => menu(orderId, record)}>
            Action
          </Dropdown.Button>
        </span>
        // <div className='table-btn-wd'>
        //   <button
        //     className='ps-btn ps-btn--reverse ps-btn--sm mb-2'
        //     onClick={e => {
        //       e.stopPropagation()
        //       handleAction(
        //         orderId,
        //         record.orderItems._id,
        //         'Product Sent'
        //       )
        //     }}
        //   >
        //     Product Sent
        //   </button>
        //   {record.shippingDate < new Date().toISOString() && record.orderItems.status !== 'Claimed'? (
        //     <button
        //       className='ps-btn ps-btn--gray ps-btn--sm mb-2'
        //       onClick={e => {
        //         e.stopPropagation()
        //         handleClaim(
        //           orderId,
        //           record.orderItems._id,
        //           'Product Claimed',
        //           record.orderNo
        //         )
        //       }}
        //     >
        //       Claim Payment
        //     </button>
        //   ) : null}
        //   <button
        //     className='ps-btn ps-btn--sm mb-2'
        //     onClick={e => {
        //       e.stopPropagation()
        //       handleFeedBackAction(record)
        //     }}
        //   >
        //     Feedback
        //   </button>
        // </div>
      ),
    },
  ]

  const handleSearch = (e) => {
    if (e.target.value === '') {
      setfilterItems(sellerOrders)
    } else {
      const results = sellerOrders.filter(
        (item) =>
          (item.buyer &&
            item.buyer[0].firstName
              .toLowerCase()
              .includes(e.target.value.toLowerCase())) ||
          (item.buyer &&
            item.buyer[0].lastName
              .toLowerCase()
              .includes(e.target.value.toLowerCase())) ||
          (item.orderItems &&
            item.orderItems.name
              .toLowerCase()
              .includes(e.target.value.toLowerCase()))
      )
      setfilterItems(results)
    }
  }

  return (
    <>
      <div className='row'>
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
      </div>

      <Table
        columns={tableColumn}
        dataSource={filterItems}
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              router.push(`/product/${record.orderItems.product}`)
            }, // click row
          }
        }}
      />
      <Modal
        title={action}
        visible={isModalVisible}
        footer={[]}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleSubmit}>
          <div className='form-group'>
            <label>Tracking Number</label>
            <Form.Item
              name='trackingNumber'
              rules={[
                {
                  required: true,
                  message: 'Please input tracking name!',
                },
              ]}
            >
              <Input
                className='form-control'
                type='text'
                placeholder='Tracking Number'
              />
            </Form.Item>
          </div>

          <button type='submit' className='ps-btn ps-btn--fullwidth'>
            Submit
          </button>
        </Form>
      </Modal>
      <FeedBackModal
        handleFeedBackOk={handleFeedBackOk}
        handleFeedBackCancel={handleFeedBackCancel}
        isFeedBackModalVisible={isFeedBackModalVisible}
        order={order}
        filter='Seller'
      />
    </>
  )
}

export default TableSoldItems
