import React, { useEffect, useState } from 'react'
import { Table, Menu, Dropdown, notification } from 'antd'
import useGetProducts from '~/hooks/useGetProducts'
import { useRouter } from 'next/router'

const TableItems = () => {
  const router = useRouter()
  const { productItems, loading, getProductBySeller, statusChanged } =
    useGetProducts()
  const [filterItems, setfilterItems] = useState()

  useEffect(() => {
    getProductBySeller()
  }, [])
  useEffect(() => {
    if (productItems) {
      setfilterItems(productItems)
    }
  }, [productItems])
  const Alert = (type, message) => {
    notification[type]({
      message: message
    })
  }

  const handleStatusChange = async (id, activated) => {
    const res = await statusChanged({ id: id, status: !activated })
    if (res) {
      getProductBySeller()
      Alert('success', 'Status Changed Successfully')
    } else {
      Alert('error', 'Error Occurred at sever side')
    }
  }

  const menu = (id, activated) => (
    <Menu>
      <Menu.Item
        key='1'
        onClick={() => router.push(`/account/edit-item/${id}`)}
      >
        Edit Product
      </Menu.Item>
      <Menu.Item
        key='2'
        onClick={() =>
          router.push(`/account/edit-item-variants/${id}`)
        }
      >
        Edit Images
      </Menu.Item>
      <Menu.Item
        key='3'
        onClick={() => handleStatusChange(id, activated)}
      >
        {activated == false
          ? 'Activate Product'
          : 'Deactivate Product'}
      </Menu.Item>
      <Menu.Item
        key='4'
        onClick={() => router.push(`/product/${id}`)}
      >
        View Product Details
      </Menu.Item>
    </Menu>
  )

  const tableColumn = [
    // {
    //   title: 'Date Create',
    //   dataIndex: 'dateCreate',
    //   key: 'dateCreate',
    //   render: text => <a>{text}</a>,
    //   width: '100px'
    // },
    {
      title: 'Sr No.',
      key: '_id',
      render: (text, record, index) => {
        return index + 1
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Sku',
      dataIndex: 'sku',
      key: 'sku',
      render: val => {
        return val ? val : '-'
      }
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: val => {
        return val ? val.name : '-'
      }
    },
    {
      title: 'Serial No',
      dataIndex: 'productSerialNo',
      key: 'productSerialNo',
      render: val => {
        return val ? val : '-'
      }
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: 'actions',
      width: '200px',
      render: (id, product) => (
        <span
          onClick={e => {
            e.stopPropagation()
          }}
        >
          <Dropdown.Button
            overlay={() => menu(id, product.activated)}
          >
            {product.activated == true ? 'Activated' : 'Deactivated'}
          </Dropdown.Button>
        </span>
      )
    }
  ]

  const handleSearch = e => {
    if (e.target.value === '') {
      setfilterItems(productItems)
    } else {
      const results = productItems.filter(
        item =>
          (item.description &&
            item.description
              .toLowerCase()
              .includes(e.target.value.toLowerCase())) ||
          (item.sku &&
            item.sku
              .toLowerCase()
              .includes(e.target.value.toLowerCase())) ||
          (item.name &&
            item.name
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
            placeholder='Search By Product Name, Description and SKU'
            onChange={e => handleSearch(e)}
          />
        </div>
      </div>
      <Table
        columns={tableColumn}
        dataSource={filterItems}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              router.push(`/product/${record._id}`)
            }
          }
        }}
      />
    </>
  )
}

export default TableItems
