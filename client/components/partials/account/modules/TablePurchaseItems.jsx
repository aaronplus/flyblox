import React, { useState, useEffect } from 'react'
import { Table, Menu, Dropdown } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import useGetOrders from '~/hooks/useGetOrders'
import { getFormattedDate } from '~/utilities/date-helpers'
import FeedBackModal from './FeedBackModal'
import { useRouter } from 'next/router'
import OrderRepository from '~/repositories/OrderRepository'
import DisputeModal from './DisputeModal'

const TablePurchaseItems = () => {
  const router = useRouter()

  const {
    loading,
    buyerOrders,
    getUserOrders,
    changeOrderStatus,
    addOrderFeedBack,
    addOrderDispute,
  } = useGetOrders()
  useEffect(() => {
    getUserOrders()
  }, [])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isFeedBackModalVisible, setIsFeedBackModal] = useState(false)
  const [productId, setProductId] = useState('')
  const [orderItemId, setOrderItemId] = useState('')
  const [order, setOrder] = useState()
  const [orderNo, setOrderNo] = useState()
  const [action, setAction] = useState('')
  const [filterItems, setfilterItems] = useState()
  const [isDisputeModalVisible, setIsDisputeModal] = useState(false)

  useEffect(() => {
    if (buyerOrders) {
      setfilterItems(buyerOrders)
    }
  }, [buyerOrders])
  const handleOk = async () => {
    try {
      if (orderNo) {
        const res = await OrderRepository.releasePayment(orderNo)
        if (res) {
          await changeOrderStatus({ productId, orderItemId, action })
          getUserOrders()
        }
      } else {
        console.log('No order Number Found')
      }
    } catch (e) {
      console.log('error', e)
    }
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setProductId('')
    setAction('')
    setOrderItemId('')
    setIsModalVisible(false)
    setOrder(null)
  }

  const handleAction = (productId, orderItemId, action, selectedOrderNo) => {
    setAction(action)
    setProductId(productId)
    setOrderItemId(orderItemId)
    setOrderNo(selectedOrderNo)
    setIsModalVisible(true)
  }

  const handleFeedBackOk = async (values) => {
    await addOrderFeedBack({
      orderId: order?._id,
      buyerId: order?.buyer,
      productId: order?.orderItems?.product,
      description: values?.description,
      time: values?.time,
      communication: values?.communication,
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

  const handleDisputeOk = async (values) => {
    let buyerName = order?.buyer?.firstName + ' ' + order?.buyer?.lastName
    let sellerName = order?.seller?.firstName + ' ' + order?.seller?.lastName
    await addOrderDispute({
      orderId: order?._id,
      orderItemId: order?.orderItems?._id,
      productId: order?.orderItems?.product,
      details: values?.details,
      buyerName,
      sellerName,
      sellerEmail: order?.seller?.email,
    })
    getUserOrders()
    setIsDisputeModal(false)
  }
  const handleDisputeCancel = () => {
    setOrder(null)
    setIsDisputeModal(false)
  }

  const handleDisputeAction = (order) => {
    setOrder(order)
    setIsDisputeModal(true)
  }

  const tableColumn = [
    {
      title: 'Sr No.',
      key: 'key',
      render: (text, record, index) => {
        return index + 1
      },
      responsive: ['sm'],
    },
    {
      title: 'Item',
      dataIndex: 'product',
      key: '_id',
      render: (val) => {
        return val.name ? val.name : '-'
      },
    },
    {
      title: 'Seller',
      dataIndex: 'seller',
      key: '_id',
      render: (val) => {
        return val.firstName ? val?.firstName + ' ' + val?.lastName : '-'
      },
    },
    {
      title: 'Date Purchased',
      dataIndex: 'createdAt',
      key: '_id',
      render: (date) => {
        return date ? getFormattedDate(new Date(date)) : '-'
      },
    },
    {
      title: 'Price',
      dataIndex: 'orderItems',
      key: '_id',
      render: (val) => {
        return val.amount ? val.amount : '-'
      },
    },
    {
      title: 'Shipping Date',
      dataIndex: 'shippingDate',
      key: '_id',
      render: (date) => {
        return date ? getFormattedDate(new Date(date)) : '-'
      },
    },
    {
      title: 'Status',
      dataIndex: 'orderItems',
      key: '_id',
      render: (val) => {
        return val.status ? 'Order ' + val.status : '-'
      },
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render: (orderId, record) => {
        const { getOrderFeedBack } = useGetOrders()
        const [isFeedBack, setIsFeedBack] = useState(false)

        useEffect(async () => {
          const res = await getOrderFeedBack({
            orderId: orderId,
            productId: record.orderItems?.product,
          })
          if (res && res.feedbackText) {
            setIsFeedBack(true)
          }
        }, [])

        const menu = (orderId, record, isFeedBack) => (
          <>
            {record.orderItems.status !== 'Received' ? (
              <Menu>
                {record.orderItems.status !== 'On Hold' ? (
                  <Menu.Item
                    key='1'
                    onClick={(e) => {
                      handleAction(
                        orderId,
                        record.orderItems._id,
                        'Product Received',
                        record.orderNo
                      )
                    }}
                  >
                    Received
                  </Menu.Item>
                ) : null}
                {isFeedBack == false ? (
                  <Menu.Item
                    key='2'
                    onClick={() => {
                      handleFeedBackAction(record)
                    }}
                  >
                    Feedback
                  </Menu.Item>
                ) : null}
                <Menu.Item
                  key='3'
                  onClick={() =>
                    router.push(`mailto:${record.seller[0].email}`)
                  }
                >
                  Contact Seller
                </Menu.Item>
                <Menu.Item
                  key='4'
                  onClick={() => {
                    handleDisputeAction(record)
                  }}
                >
                  Dispute
                </Menu.Item>
              </Menu>
            ) : (
              <Menu>
                <Menu.Item key='1'>No Action Available</Menu.Item>
              </Menu>
            )}
          </>
        )

        return (
          <span
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <Dropdown.Button overlay={() => menu(orderId, record, isFeedBack)}>
              Action
            </Dropdown.Button>
          </span>
          // <>
          //   {record.orderItems.status !== 'Received' ? (
          //     <div>
          //       <button
          //         data-order={record.orderNo}
          //         className='ps-btn ps-btn--gray ps-btn--sm mb-2'
          //         onClick={e => {
          //           e.stopPropagation()
          //           handleAction(
          //             orderId,
          //             record.orderItems._id,
          //             'Product Received',
          //             record.orderNo
          //           )
          //         }}
          //       >
          //         Received
          //       </button>
          //       {isFeedBack == false ? (
          //         <button
          //           className='ps-btn ps-btn--sm mb-2'
          //           onClick={e => {
          //             e.stopPropagation()
          //             handleFeedBackAction(record)
          //           }}
          //         >
          //           Feedback
          //         </button>
          //       ) : null}
          //     </div>
          //   ) : null}
          // </>
        )
      },
    },
  ]

  const handleSearch = (e) => {
    if (e.target.value === '') {
      setfilterItems(buyerOrders)
    } else {
      const results = buyerOrders.filter(
        (item) =>
          (item.seller &&
            item.seller.firstName
              .toLowerCase()
              .includes(e.target.value.toLowerCase())) ||
          (item.seller &&
            item.seller.lastName
              .toLowerCase()
              .includes(e.target.value.toLowerCase())) ||
          (item.product &&
            item.product.name
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
            placeholder='Search By Product Name, Seller Name'
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
        onOk={handleOk}
        onCancel={handleCancel}
        okText='Yes'
        cancelText='No'
      >
        <p>
          Clicking on Yes will release the funds to the seller. Are you sure you
          want to update the status?
        </p>
      </Modal>
      <FeedBackModal
        handleFeedBackOk={handleFeedBackOk}
        handleFeedBackCancel={handleFeedBackCancel}
        isFeedBackModalVisible={isFeedBackModalVisible}
        order={order}
        filter='Buyer'
      />
      <DisputeModal
        isDisputeModalVisible={isDisputeModalVisible}
        handleDisputeOk={handleDisputeOk}
        handleDisputeCancel={handleDisputeCancel}
        getUserOrders={getUserOrders}
        order={order}
      />
    </>
  )
}

export default TablePurchaseItems
