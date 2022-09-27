import React, { useEffect } from 'react'
import useUser from '~/hooks/useUser'
import { Table, Button } from 'antd'

const TableCustomerItems = ({ title_contains }) => {
  const { users, loading, getUsers, updateUser } = useUser()

  useEffect(() => {
    getUsers(title_contains)
  }, [title_contains])

  const tableColumn = [
    {
      title: 'Sr No.',
      key: '_id',
      render: (text, record, index) => {
        return <p>{index + 1}</p>
      }
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: firstName => {
        return <p>{firstName}</p>
      }
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      render: lastName => {
        return <p>{lastName}</p>
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: email => {
        return <p>{email}</p>
      }
    },
    {
      title: 'Active',
      dataIndex: 'activated',
      key: 'activated',
      render: activated => {
        return (
          <Button
            type={activated === false ? 'primary' : 'danger'}
            disabled={activated}
          >
            Acitve
          </Button>
        )
      }
    }
  ]

  return (
    <div className='table-responsive'>
      <Table columns={tableColumn} dataSource={users} />
    </div>
  )
}

export default TableCustomerItems
