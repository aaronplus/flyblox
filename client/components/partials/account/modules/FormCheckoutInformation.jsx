import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Form, Input, notification, Select, Spin } from 'antd'
import { connect } from 'react-redux'
import { addOrderAddress, submitOrder } from '~/store/order/actions'
import { getTokens } from '~/repositories/TokenRepository'
import UserRepository from '~/repositories/UserRepository'
import { Option } from 'antd/lib/mentions'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import Countries from '~/utilities/countries.json'
import { getBySeller } from '~/utilities/ecomerce-helpers'
import ModuleEcomerceCartItemsBySeller from '~/components/ecomerce/modules/ModuleEcomerceCartItemsBySeller'
import Modal from 'antd/lib/modal/Modal'
class FormCheckoutInformation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      tokens: [],
      itemsBySeller: null,
      buyerId: null,
      allPaid: false,
      userAddresses: [],
      isViewMode: false,
      selectedOrder: null,
      isModalVisible: false,
    }
  }
  formRef = React.createRef()

  handleAddressChange = (address) => {
    this.setState({ address })
  }

  handleSeller = (order) => {
    this.setState({ selectedOrder: order })
  }

  handleSelect = async (address) => {
    const results = await geocodeByAddress(address)
    const first = results[0]

    const streetNumber = first.address_components.find(
      (c) => c.types.indexOf('street_number') >= 0
    )

    const route = first.address_components.find(
      (c) => c.types.indexOf('route') >= 0
    )

    const state = first.address_components.find(
      (c) => c.types.indexOf('administrative_area_level_1') >= 0
    )

    const city = first.address_components.find(
      (c) => c.types.indexOf('locality') >= 0
    )
    const postalcode = first.address_components.find(
      (c) => c.types.indexOf('postal_code') >= 0
    )
    const country = first.address_components.find(
      (c) => c.types.indexOf('country') >= 0
    )
    // console.log(city?.long_name, postalcode?.long_name, country?.long_name)

    this.formRef.current.setFieldsValue({
      address: first?.formatted_address,
      street:
        streetNumber && route
          ? streetNumber?.long_name + ' ' + route?.long_name
          : streetNumber
          ? streetNumber?.long_name
          : route?.long_name,
      state: state?.long_name,
      city: city?.long_name,
      postalCode: postalcode?.long_name,
      country: country?.long_name,
    })
  }

  getTokens = async () => {
    const res = await getTokens()
    if (res) {
      this.setState({ tokens: res.tokens })
    }
  }

  getUserAddresses = async () => {
    const res = await UserRepository.getAddresses()
    if (res.status == 'Success') {
      this.setState({ userAddresses: res.addresses })
      let currentAddress =
        this.state.userAddresses[this.state.userAddresses.length - 1]
      this.formRef.current.setFieldsValue({
        firstName: res?.firstName,
        lastName: res?.lastName,
      })
      if (currentAddress){
        this.setState({ isViewMode: true })
        this.formRef.current.setFieldsValue({
          address: currentAddress?.address,
          street: currentAddress?.street,
          state: currentAddress?.state,
          city: currentAddress?.city,
          postalCode: currentAddress?.postalCode,
          country: currentAddress?.country,
        })
      }
    }
  }
  getCartItemsBySeller = async () => {
    const res = await getBySeller(this.props.ecomerce.cartItems)
    if (res) {
      this.setState({ itemsBySeller: res })
      // this.setState({ cartItems: Object.values(res)[0] })
    }
  }

  getBuyerId = async () => {
    const res = await UserRepository.getUser()
    if (res.status == 'Success') {
      this.setState({ buyerId: res.user._id })
    }
  }

  componentDidMount() {
    this.getTokens()
    this.getUserAddresses()
    this.getCartItemsBySeller()
    this.getBuyerId()
    // console.log(getBySeller(this.props.ecomerce.cartItems))
  }

  handleChange = (value) => {
    this.props.handleTokenChange(this.state.tokens[value])
  }

  handleUserAddressChange = (value) => {
    let currentAddress = this.state.userAddresses[value]
    if (currentAddress) {
      this.setState({ isViewMode: true })
      this.formRef.current.setFieldsValue({
        address: currentAddress.address,
        street: currentAddress.street,
        state: currentAddress.state,
        city: currentAddress.city,
        postalCode: currentAddress.postalCode,
        country: currentAddress.country,
      })
    } else {
      this.setState({ isViewMode: false })
      this.formRef.current.setFieldsValue({
        address: null,
        street: null,
        state: null,
        city: null,
        postalCode: null,
        country: null,
      })
    }
  }

  handleLoginSubmit = (data) => {
    if (!this.state.isViewMode) {
      this.props.addOrderAddress(data)
    }
    const Alert = (type, message) => {
      notification[type]({
        message: message,
      })
    }
    const selectedOrder = this.state.selectedOrder
    const cartItems = selectedOrder?.cartItems
    // const cartItems = this.props.ecomerce.cartItems

    const {
      firstName,
      lastName,
      address,
      street,
      postalCode,
      city,
      state,
      country,
    } = data
    var shippingAddress = {
      firstName,
      lastName,
      address,
      street,
      postalCode,
      state,
      city,
      country,
    }
    let payload
    if (this.props.token) {
      payload = {
        shippingAddress,
        orderItems: cartItems,
        token: this.props.token,
        seller: selectedOrder?.seller,
        contract: selectedOrder?.contract
      }
    } else {
      payload = {
        shippingAddress,
        orderItems: cartItems,
        seller: selectedOrder?.seller,
        contract: selectedOrder?.contract
      }
    }

    if (
      cartItems.length > 0 &&
      this.state.buyerId &&
      this.state.buyerId !== selectedOrder?.seller._id
    ) {
      this.props.submitOrder(payload)
    } else {
      if (cartItems.length > 0) {
        if (this.state.buyerId) {
          Alert('error', 'You cannot purchase your own products')
        } else {
          Alert('error', 'Could not get Buyer Id from sever')
        }
      } else {
        Alert('error', 'No item in the cart.')
      }
    }

    // console.log(this.state.selectedOrder.seller)
    // this.setState({ isModalVisible: false })
    // Router.push('/account/shipping');
    // console.log(localStorage.getItem("access_token"),"asdfa")
  }

  render() {
    // console.log(this.state.tokens)
    return (
      <Form
        ref={this.formRef}
        className='ps-checkbox--sumbit'
        // onFinish={() => this.setState({ isModalVisible: true })}
        onFinish={this.handleLoginSubmit}
        // onFinishFailed={() => this.formRef.current.setFocus('name')}
        onFinishFailed={() => window.scrollTo(0, 300)}
      >
        {/* <h3 className='ps-form__heading'>Contact information</h3>
        <div className='form-group'>
          <Form.Item
            name='name'
            rules={[
              {
                required: true,
                message: 'Enter an email or mobile phone number!'
              },
              {
                validator(_, value) {
                  const emailRegex =
                    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
                  const phoneRegex = /^(\+91-|\+91|0)?\d{10}$/
                  if (
                    value &&
                    !(emailRegex.test(value) || phoneRegex.test(value))
                  ) {
                    return Promise.reject(
                      new Error('Enter a valid email or mobile phone number!')
                    )
                  }
                  return Promise.resolve()
                }
              }
            ]}
          >
            <Input
              className='form-control'
              type='text'
              placeholder='Email or phone number'
            />
          </Form.Item>
        </div>
        <div className='form-group'>
          <div className='ps-checkbox'>
            <input className='form-control' type='checkbox' id='keep-update' />
            <label htmlFor='keep-update'>
              Keep me up to date on news and exclusive offers?
            </label>
          </div>
        </div> */}
        <h3 className='ps-form__heading'>Shipping address</h3>
        <div className='row'>
          <div className='col-sm-6'>
            <div className='form-group'>
              <Form.Item
                name='firstName'
                initialValue={'hello'}
                rules={[
                  {
                    required: true,
                    message: 'Enter your first name!',
                  },
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
              <Form.Item
                name='lastName'
                rules={[
                  {
                    required: true,
                    message: 'Enter your last name!',
                  },
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
        </div>
        <div className='form-group'>
          {this.state.userAddresses && this.state.userAddresses.length > 0 ? (
            <Select
              allowClear
              defaultValue={
                this.state.userAddresses[this.state.userAddresses.length - 1]
                  .address
              }
              placeholder='Create New Address or Select Address'
              style={{ width: '100%' }}
              notFoundContent='No Address Found.'
              onChange={this.handleUserAddressChange}
            >
              {this.state.userAddresses.map((item, index) => (
                <Select.Option key={index}>{item.address}</Select.Option>
              ))}
            </Select>
          ) : null}
        </div>
        <div className='form-group'>
          <Form.Item
            name='address'
            rules={[
              {
                required: true,
                message: 'Enter an address!',
              },
            ]}
          >
            <PlacesAutocomplete
              value={this.state?.address ? this.state.address : ''}
              onChange={this.handleAddressChange}
              onSelect={this.handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <Input
                    {...getInputProps({
                      placeholder: 'Address',
                      className: 'form-control',
                    })}
                    disabled={this.state.isViewMode}
                  />
                  {this.state.isViewMode == false ? (
                    <div
                      className='autocomplete-dropdown-container'
                      style={{
                        marginTop: '1rem',
                        paddingLeft: '2rem',
                      }}
                    >
                      {loading && (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          <Spin />
                        </div>
                      )}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item'
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? {
                              backgroundColor: '#fafafa',
                              cursor: 'pointer',
                            }
                          : {
                              backgroundColor: '#ffffff',
                              cursor: 'pointer',
                            }
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        )
                      })}
                    </div>
                  ) : null}
                </div>
              )}
            </PlacesAutocomplete>
          </Form.Item>
        </div>
        <div className='row'>
          <div className='col-sm-6'>
            <div className='form-group'>
              <Form.Item
                name='street'
                rules={[
                  {
                    required: false,
                    message: 'Enter an Apartment!',
                  },
                ]}
              >
                <Input
                  disabled={this.state.isViewMode}
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
                rules={[
                  {
                    required: true,
                    message: 'Enter a city!',
                  },
                ]}
              >
                <Input
                  disabled={this.state.isViewMode}
                  className='form-control'
                  type='city'
                  placeholder='City'
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-4'>
            <div className='form-group'>
              <Form.Item
                name='state'
                rules={[
                  {
                    required: true,
                    message: 'Enter a state name!',
                  },
                ]}
              >
                <Input
                  disabled={this.state.isViewMode}
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
                rules={[
                  {
                    required: true,
                    message: 'Enter a postcode/zip!',
                  },
                ]}
              >
                <Input
                  disabled={this.state.isViewMode}
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
                rules={[
                  {
                    required: true,
                    message: 'Enter a country name!',
                  },
                ]}
              >
                <Select
                  disabled={this.state.isViewMode}
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
          <div className='col-sm-12'>
            <h3 className='ps-form__heading'>Payment Method</h3>
            <div className='form-group'>
              {this.state.tokens?.length > 1 ? (
                <Form.Item
                  name='token'
                  rules={[
                    {
                      required: true,
                      message: 'Select a token!',
                    },
                  ]}
                >
                  <Select
                    allowClear
                    placeholder='Select Token'
                    style={{ width: '100%' }}
                    onChange={this.handleChange}
                  >
                    {this.state.tokens.map((item, index) => (
                      <Select.Option key={index}>{item.name}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              ) : null}
            </div>
          </div>
          <div className='col-sm-12'>
            <h3 className='ps-form__heading'>Order Detials</h3>
            <ModuleEcomerceCartItemsBySeller
              token={this.props.token}
              handleSeller={this.handleSeller}
            />
            {/* <Modal
              title={'Confirmation Alert'}
              visible={this.state.isModalVisible}
              onOk={this.handleLoginSubmit}
              onCancel={() => this.setState({ isModalVisible: false })}
              okText='Yes'
              cancelText='No'
            >
              <p>Are you sure?</p>
            </Modal> */}
          </div>
        </div>
        {/* <div className='form-group'>
          <div className='ps-checkbox'>
            <input
              className='form-control'
              type='checkbox'
              id='save-information'
            />
            <label htmlFor='save-information'>
              Save this information for next time
            </label>
          </div>
        </div> */}
        <div className='ps-form__submit'>
          <Link href='/account/shopping-cart'>
            <a>
              <i className='icon-arrow-left mr-2'></i>
              Return to shopping cart
            </a>
          </Link>
          {/* <div className='ps-block__footer'>
            <button type='submit' className='ps-btn'>
              Submit Order
            </button>
          </div> */}
        </div>
      </Form>
    )
  }
}
export default connect((state) => state, {
  addOrderAddress,
  submitOrder,
})(FormCheckoutInformation)
