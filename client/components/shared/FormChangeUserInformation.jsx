import React, { useEffect, useState } from 'react'
import { DatePicker, Form, Input, notification, Radio , Select} from 'antd'
import useUser from '~/hooks/useUser'
import UserRepository from '~/repositories/UserRepository'
import moment from 'moment'
import Countries from '~/utilities/countries.json'

const FormChangeUserInformation = () => {
  const { user, loading, getUser, updateUser } = useUser()
  const [isViewMode, setIsViewMode] = useState(true)
  // const [date, setDate] = useState()

  useEffect(() => {
    getUser()
  }, [])

  const modalSuccess = (type, message) => {
    notification[type]({
      message: message
    })
  }

  // const handleChange = async dob => {
  //   if (dob) {
  //     setDate(dob.toISOString())
  //   }
  // }

  const handleSubmit =async values => {
    // console.log(values)
    // console.log(date)

    
    const {
      firstName,
      lastName,
      phone,
      email,
      address,
      street,
      postalCode,
      city,
      state,
      country
    } = values

    var info = {
      firstName,
      lastName,
      phone,
      email
    }

    const addresses = user.addresses
    addresses[0]["address"] = address;
    addresses[0]["street"] = street;
    addresses[0]["postalCode"] = postalCode;
    addresses[0]["city"] = city;
    addresses[0]["state"] = state;
    addresses[0]["country"] = country;

    console.log(addresses)

    let data = new FormData()
    for (var key in info) {
      if (info[key]) {
        data.append(key, info[key])
      }
    }
    data.append("addresses", JSON.stringify(addresses))

    // if (date) {
    //   data.append('dob', date)
    // }

    const response = await updateUser(data)
    if (response.status === 'Success') {
      modalSuccess('success', 'User updated Successfully')
    } else {
      modalSuccess('error', response.message)
    }
  }

  return (
    <>
      {user ? (
        <Form className='ps-form--account-setting' onFinish={handleSubmit}>
          <div className='ps-form__header'>
            <h3>Account Information</h3>
          </div>
          <div className='ps-form__content'>
            <div className='row'>
              <div className='col-sm-6'>
                <div className='form-group'>
                  <label>First Name</label>
                  <Form.Item
                    name='firstName'
                    initialValue={user.firstName}
                    rules={[
                      {
                        required: true,
                        message: 'Please input product name!'
                      }
                    ]}
                  >
                    <Input
                      className='form-control'
                      type='text'
                      placeholder='First Name'
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='form-group'>
                  <label>Last Name</label>
                  <Form.Item
                    name='lastName'
                    initialValue={user.lastName}
                    rules={[
                      {
                        required: true,
                        message: 'Please input last name!'
                      }
                    ]}
                  >
                    <Input
                      className='form-control'
                      type='text'
                      placeholder='Last Name'
                    />
                  </Form.Item>
                </div>
              </div>

              <div className='col-sm-6'>
                <div className='form-group'>
                  <label>Phone Number</label>
                  <Form.Item
                    name='phone'
                    initialValue={user.phone ? user.phone : ''}
                    rules={[
                      {
                        required: false
                      }
                    ]}
                  >
                    <Input
                      className='form-control'
                      type='text'
                      placeholder='Phone Number'
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='form-group'>
                  <label>Email</label>
                  <Form.Item
                    name='email'
                    initialValue={user.email}
                    rules={[
                      {
                        required: true,
                        message: 'Please input email!'
                      },
                      {
                        type: 'email',
                        message: 'Please input valid email!'
                      }
                    ]}
                  >
                    <Input
                      className='form-control'
                      type='text'
                      placeholder='Email'
                    />
                  </Form.Item>
                </div>
              </div>
              {/* <div className='col-sm-6'>
                <div className='form-group'>
                  <label>Gender</label>
                  <Form.Item name='gender' initialValue={user.gender}>
                    <Radio.Group className='form-group'>
                      <Radio value={'Male'}>Male</Radio>
                      <Radio value={'Female'}>Female</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </div>
              <div className='col-sm-6'>
                <div className='form-group'>
                  <label>Dob</label>
                  <DatePicker
                    defaultValue={
                      user.dob ? moment(user.dob, 'YYYY-MM-DD') : null
                    }
                    className='form-control'
                    onChange={handleChange}
                  />
                </div>
              </div> */}
              { user.addresses.length>0 ?
              <>
              <div className='col-sm-12'>
              <label>Permanent Address</label>
              <div className='form-group'>
                <Form.Item
                  name='address'
                  initialValue={user.addresses[0].address}
                  rules={[
                    {
                      required: true,
                      message: 'Enter an address!'
                    }
                  ]}
                >
                  <Input
                          // disabled={isViewMode}
                          className='form-control'
                          type='text'
                          placeholder='Address'
                        />
                </Form.Item>
              </div>
              </div>
                <div className='col-sm-6'>
                  <div className='form-group'>
                    <Form.Item
                      name='street'
                      initialValue={user.addresses[0].street}
                      rules={[
                        {
                          required: false,
                          message: 'Enter an Apartment!'
                        }
                      ]}
                    >
                      <Input
                        // disabled={isViewMode}
                        className='form-control'
                        type='text'
                        placeholder='Street'
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className='col-sm-6'>
                  <div className='form-group'>
                    <Form.Item
                      name='city'
                      initialValue={user.addresses[0].city}
                      rules={[
                        {
                          required: true,
                          message: 'Enter a city!'
                        }
                      ]}
                    >
                      <Input
                        // disabled={isViewMode}
                        className='form-control'
                        type='city'
                        placeholder='City'
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className='col-sm-4'>
                  <div className='form-group'>
                    <Form.Item
                      name='state'
                      initialValue={user.addresses[0].state}
                      rules={[
                        {
                          required: true,
                          message: 'Enter a state name!'
                        }
                      ]}
                    >
                      <Input
                        // disabled={isViewMode}
                        className='form-control'
                        placeholder='State'
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className='col-sm-4'>
                  <div className='form-group'>
                    <Form.Item
                      name='postalCode'
                      initialValue={user.addresses[0].postalCode}
                      rules={[
                        {
                          required: true,
                          message: 'Enter a postcode/zip!'
                        }
                      ]}
                    >
                      <Input
                        // disabled={isViewMode}
                        className='form-control'
                        type='number'
                        placeholder='Postcode/Zip'
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className='col-sm-4'>
                  <div className='form-group'>
                    <Form.Item
                      name='country'
                      initialValue={user.addresses[0].country}
                      rules={[
                        {
                          required: true,
                          message: 'Enter a country name!'
                        }
                      ]}
                    >
                      <Select
                        // disabled={isViewMode}
                        allowClear
                        showSearch
                        placeholder='Select Country'
                        style={{ width: '100%' }}
                        // onChange={this.handleChange}
                        options={Countries}
                      />
                    </Form.Item>
                  </div>
                </div>
              </>:null}

            <div className='form-group submit'>
              <button className='ps-btn'>Update profile</button>
            </div>
          </div>
          </div>
        </Form>
      ) : (
        <div>loading...</div>
      )}
    </>
  )
}

export default FormChangeUserInformation
