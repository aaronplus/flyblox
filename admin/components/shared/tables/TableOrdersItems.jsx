import React, { useEffect } from 'react'
import useOrder from '~/hooks/useOrders'
import { notification, Table } from 'antd'
import OrderRepository from '~/repositories/OrderRepository'

const TableCustomerItems = ({ filter }) => {
  const { orders, loading, getOrders } = useOrder()

  useEffect(() => {
    if (filter === 'latest') {
      getOrders({ limit: 5, filter })
    } else {
      getOrders({ filter })
    }
  }, [])
  const Alert = (type, message) => {
    notification[type]({
      message: message
    })
  }

  const handleClaim = async (orderNo, walletAddress, productId, orderItemId, action) => {
    try {
      if (typeof window.ethereum == 'undefined'){
        Alert('error', 'Metamask is not installed')
      }else{
        if (orderNo && walletAddress) {
          const res = await OrderRepository.claimPayment(orderNo, walletAddress)
          if (res) {
            await OrderRepository.changeOrderStatus({ productId, orderItemId, action })
            Alert('success', 'Payment has been sent to Seller account')
          }
        } else {
          if (orderNo){
            Alert('error', 'No order Number Found')
          }else{
            Alert('error', 'Seller Wallet Address not found')
          }
        }
      }
    } catch (e) {
      console.log('error', e)
      Alert('error', e.message)
    }
  }

  const handleRelease = async (orderNo, walletAddress, productId, orderItemId, action) => {
    try {
      if (typeof window.ethereum == 'undefined'){
        Alert('error', 'Metamask is not installed')
      }else{
        if (orderNo && walletAddress) {
          const res = await OrderRepository.releasePayment(orderNo, walletAddress)
          if (res) {
            await OrderRepository.changeOrderStatus({ productId, orderItemId, action })
            Alert('success', 'Payment has been released')
          }
        } else {
          if (orderNo){
            Alert('error', 'No order Number Found')
          }else{
            Alert('error', 'Buyer Wallet Address not found')
          }
        }
      }
    } catch (e) {
      console.log('error', e)
      Alert('error', e.message)
    }
  }

  const tableColumn = [
    {
      title: 'Order Id',
      dataIndex: '_id',
      key: '_id',
      render: id => {
        return <p>{id}</p>
      }
    },
    {
      title: 'Fullfilment',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        switch (status) {
          case 'on the way':
            return <span className='ps-fullfillment warning'>On The Way</span>
            break
          case 'Cancel':
            return <span className='ps-fullfillment danger'>Cancel</span>
            break
          default:
            return <span className='ps-fullfillment success'>Delivered</span>
            break
        }
      }
    },
    {
      title: 'Price',
      dataIndex: 'total',
      key: 'total',
      render: total => {
        return <strong>{total}</strong>
      }
    },
    {
      title: 'Date',
      dataIndex: 'shippingDate',
      key: 'shippingDate',
      render: shippingDate => {
        return <strong>{shippingDate.substring(0, 10)}</strong>
      }
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render: (id,record) => {
        return (
          <div className='table-btn-wd'>
          {record.orderItems.status !== 'Claimed' ? 
            <button
              style={{width:'18rem'}}
              className='ps-btn ps-btn--reverse ps-btn--sm mb-2'
              onClick={e => {
                e.stopPropagation()
                handleClaim(
                  record.orderNo,
                  record.seller?.walletAddress,
                  id,
                  record.orderItems._id,
                  'Product Claimed',)
              }}
            >
              Release to Seller
            </button>
            :null}
            {record.orderItems.status !== 'Received' ? 
            <button
              style={{width:'18rem'}}
              className='ps-btn ps-btn--sm mb-2 px-4'
              onClick={e => {
                e.stopPropagation()
                handleRelease(
                  record.orderNo,
                  record.buyer?.walletAddress,
                  id,
                  record.orderItems._id,
                  'Product Received',)
              }}
            >
              Release to Buyer
            </button>:null}
          </div>
        )
      }
    }
  ]

  return (
    <div className='table-responsive'>
      <Table columns={tableColumn} dataSource={orders} />
    </div>
  )
}

export default TableCustomerItems
