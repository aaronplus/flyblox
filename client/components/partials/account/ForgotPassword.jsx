import React, { Component } from 'react'
import Router from 'next/router'

import { Form, Input } from 'antd'
import { connect } from 'react-redux'
import { forgotPassword } from '~/store/auth/action'
class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleLoginSubmit = values => {
    this.props.dispatch(forgotPassword(values.email))
  }

  render() {
    return (
      <div className='ps-my-account'>
        <div className='container'>
          <Form
            className='ps-form--account'
            onFinish={this.handleLoginSubmit.bind(this)}
          >
            <ul className='ps-tab-list'>
              <li className='active'>
                <a>Forgot Password</a>
              </li>
            </ul>
            <div
              className='ps-tab active'
              id='sign-in'
              style={{ paddingBottom: '2px' }}
            >
              <div className='ps-form__content'>
                <h5>Please enter your email address.</h5>
                <div className='form-group'>
                  <Form.Item
                    name='email'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email!'
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

                <div className='form-group submit'>
                  <button type='submit' className='ps-btn ps-btn--fullwidth'>
                    Sumbit
                  </button>
                </div>
              </div>
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
export default connect(mapStateToProps)(ForgotPassword)
