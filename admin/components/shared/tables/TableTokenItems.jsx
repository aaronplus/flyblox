import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import TokenRepository from '~/repositories/TokenRepository'
import { removeToken, setToken } from '~/store/token/action'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'antd/lib/modal/Modal'
import { useRouter } from 'next/router'

const TableCustomerItems = ({ title_contains }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(async () => {
    const res = await TokenRepository.getTokens({ title_contains })
    if (res) {
      dispatch(setToken(res.data.tokens))
    }
  }, [title_contains])

  const tokens = useSelector(state => state.token.tokens)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [deleteTokenId, setdeleteTokenId] = useState('')

  const handleOk = async () => {
    dispatch(removeToken(deleteTokenId))
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setdeleteTokenId('')
    setIsModalVisible(false)
  }
  const tableColumn = [
    {
      title: 'Sr No.',
      key: '_id',
      render: (text, record, index) => {
        return <p>{index + 1}</p>
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: value => {
        return <p>{value}</p>
      }
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      render: value => {
        return <p>{value ? value : '-'}</p>
      }
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: value => {
        return <p>{value}</p>
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: value => {
        return <p>{value}</p>
      }
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: '_id',
      render: id => {
        return (
          <div className='table-btn-wd'>
            <button
              className='ps-btn ps-btn--reverse ps-btn--sm mb-2'
              onClick={e => {
                e.stopPropagation()
                router.push(`/tokens/${id}`)
              }}
            >
              Edit
            </button>
            <button
              className='ps-btn ps-btn--sm mb-2'
              onClick={e => {
                e.stopPropagation()
                setIsModalVisible(true)
                setdeleteTokenId(id)
              }}
            >
              Delete
            </button>
          </div>
        )
      }
    }
  ]

  return (
    <div className='table-responsive'>
      <Table columns={tableColumn} dataSource={tokens ? tokens : []} />
      <Modal
        title={'RemoveToken'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='Yes'
        cancelText='No'
      >
        <p>Are you sure to Delete Token?</p>
      </Modal>
    </div>
  )
}

export default TableCustomerItems
