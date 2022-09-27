import React, { useEffect, useState } from 'react'
import useCategory from '~/hooks/useCategories'
import { Table, Button } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { setCategory } from '~/store/category/action'
import { useSelector, useDispatch } from 'react-redux'
import CategoryRepository from '~/repositories/CategoryRepository'
import Router from 'next/router'

const TableCategoryItems = ({ title_contains }) => {
  const dispatch = useDispatch()

  useEffect(async () => {
    const res = await CategoryRepository.getCategories({ title_contains })
    if (res) {
      dispatch(setCategory(res))
    }
  }, [title_contains])

  const { removeCategory, thumbnailImage } = useCategory()
  const categories = useSelector(state => state.categoryList.categories)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [deleteCategoryId, setdeleteCategoryId] = useState('')

  const handleOk = async () => {
    await removeCategory(deleteCategoryId)
    const res = await CategoryRepository.getCategories()
    if (res) {
      dispatch(setCategory(res))
    }
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setdeleteCategoryId('')
    setIsModalVisible(false)
  }

  const tableColumn = [
    {
      title: 'Sr No.',
      key: 'value',
      render: (text, record, index) => {
        return <p>{index + 1}</p>
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: name => {
        return <p>{name}</p>
      }
    },
    {
      title: 'Image',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: thumbnail => {
        return <div>{thumbnail?thumbnailImage(thumbnail):'No Thumbnail'}</div>
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
                Router.push(`/categories/${id}`)
              }}
            >
              Edit
            </button>
            <button
              className='ps-btn ps-btn--sm mb-2'
              onClick={e => {
                e.stopPropagation()
                setIsModalVisible(true)
                setdeleteCategoryId(id)
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
      <Table columns={tableColumn} dataSource={categories ? categories : []} />
      <Modal
        title={'RemoveCategory'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='Yes'
        cancelText='No'
      >
        <p>Are you sure to Delete Category?</p>
      </Modal>
    </div>
  )
}

export default TableCategoryItems
