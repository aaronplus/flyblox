import React, { Component } from 'react'
import Link from 'next/link'
import { register } from '../../../store/auth/action'
import { Form, Input } from 'antd'
import { connect } from 'react-redux'
import Checkbox from 'antd/lib/checkbox/Checkbox'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleSubmit = async values => {
    this.props.dispatch(register(values))
  }

  render() {
    return (
      <div className='ps-my-account'>
        <div className='container'>
          <Form className='ps-form--account' onFinish={this.handleSubmit} layout="vertical">
            <ul className='ps-tab-list'>
              <li>
                <Link href='/account/login'>
                  <a>Login</a>
                </Link>
              </li>
              <li className='active'>
                <Link href='/account/register'>
                  <a>Register</a>
                </Link>
              </li>
            </ul>
            <div
              className='ps-tab active register-tab'
              id='register'
              style={{ paddingBottom: '2px' }}
            >
              <div className='ps-form__content'>
                <h5>Create An Account</h5>
                <div className='form-group'>
                  <Form.Item
                    label="Name"
                    name='firstName'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your name!'
                      }
                    ]}
                  >
                    <Input
                      className='form-control'
                      type='text'
                      placeholder='Name'
                    />
                  </Form.Item>
                </div>
                {/* <div className='form-group'>
                  <Form.Item
                    name='lastName'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your last name!'
                      }
                    ]}
                  >
                    <Input
                      className='form-control'
                      type='text'
                      placeholder='Last Name'
                    />
                  </Form.Item>
                </div> */}
                <div className='form-group'>
                  <Form.Item
                    name='username'
                    label="Username"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!'
                      }
                    ]}
                  >
                    <Input
                      className='form-control'
                      type='text'
                      placeholder='Username'
                    />
                  </Form.Item>
                </div>
                <div className='form-group'>
                  <Form.Item
                    name='email'
                    label="Email"
                    rules={[
                      {
                        required: true,
                        type: 'email',
                        message: 'Please input a valid email!'
                      }
                    ]}
                  >
                    <Input
                      className='form-control'
                      type='email'
                      placeholder='Email address'
                    />
                  </Form.Item>
                </div>
                <div className='form-group form-forgot'>
                  <Form.Item
                    label='Password'
                    name='password'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!'
                      },
                      {
                        validator(_, value) {
                          if (!value || value.length > 5) {
                            return Promise.resolve()
                          }

                          return Promise.reject(
                            new Error(
                              'Password length must be greater than 6 characters!'
                            )
                          )
                        }
                      }
                    ]}
                  >
                    <Input
                      className='form-control'
                      type='password'
                      placeholder='Password...'
                    />
                  </Form.Item>
                  <Form.Item
                    name='accept'
                    valuePropName='checked'
                    rules={[
                      {
                        validator(_, value) {
                          if (value === true) {
                            return Promise.resolve()
                          }

                          return Promise.reject(
                            new Error('Please accept terms and conditions')
                          )
                        }
                      }
                    ]}
                  >
                    <Checkbox>
                      {/* <Link href='/page/terms-and-conditions'> */}
                        {/* <a target='_blank'>I accept terms and conditions</a> */}
                      <a>I accept terms and conditions</a>

                      {/* </Link> */}
                    </Checkbox>
                  </Form.Item>
                </div>
                <div className='form-group submit'>
                  <button type='submit' className='ps-btn ps-btn--fullwidth ps-btn--registerbtn'>
                    Get Started Now
                  </button>
                </div>
              </div>
              {/* <div className="ps-form__footer">
                <p>Connect with:</p>
                <ul className="ps-list--social">
                  <li>
                    <a className="facebook" href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a className="google" href="#">
                      <i className="fa fa-google-plus"></i>
                    </a>
                  </li>
                  <li>
                    <a className="twitter" href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a className="instagram" href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state.auth
}
export default connect(mapStateToProps)(Register)
