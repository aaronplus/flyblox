import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { login } from '../../store/auth/action'

import { Form, Input, notification } from 'antd'
import { connect } from 'react-redux'
import Checkbox from 'antd/lib/checkbox/Checkbox'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static getDerivedStateFromProps(props) {
        if (props.isLoggedIn === true) {
            Router.push('/')
        }
        return false
    }

    handleFeatureWillUpdate(e) {
        e.preventDefault()
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500
        })
    }

    handleLoginSubmit = values => {
        this.props.dispatch(login(values))
        // Router.push('/');
    }

    render() {
        return (
            <div className='ps-my-account'>
                <div className='container'>
                    <Form
                        className='ps-form--account'
                        onFinish={this.handleLoginSubmit.bind(this)}
                    >
                        <div
                            className='ps-tab active'
                            id='sign-in'
                            style={{ paddingBottom: '2px' }}
                        >
                            <div className='ps-form__content'>
                                <h5 style={{ textAlign: "center" }}>Log In To Your Account</h5>
                                <div className='form-group'>
                                    <Form.Item
                                        name='identifier'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your email!'
                                            }
                                        ]}
                                    >
                                        <Input
                                            className='form-control'
                                            type='text'
                                            placeholder='Username or email address'
                                        />
                                    </Form.Item>
                                </div>
                                <div className='form-group form-forgot'>
                                    <Form.Item
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
                                    {/* <Form.Item>
                                        <Form.Item name='remember' valuePropName='checked' noStyle>
                                            <Checkbox>Remember me</Checkbox>
                                        </Form.Item>

                                        <a
                                            className='login-form-forgot'
                                            style={{ float: 'right' }}
                                            href='/account/forgot-password'
                                        >
                                            Forgot password
                                        </a>
                                    </Form.Item> */}
                                </div>

                                <div className='form-group submit'>
                                    <button type='submit' className='ps-btn ps-btn--fullwidth'
                                        style={{
                                            backgroundColor: `linear-gradient(180deg, rgba(249, 184, 18, 1) 35%,
            rgba(250, 111, 6, 1) 100%) !important ` }}
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                            {/* 
                                style={{ backgroundColor: "#fff !important" }}
                            background-color: linear-gradient(180deg, rgba(249, 184, 18, 1) 35%,
            rgba(250, 111, 6, 1) 100%) !important; */}
                            {/* <div className="ps-form__footer">
                <p>Connect with:</p>
                <ul className="ps-list--social">
                  <li>
                    <a
                      className="facebook"
                      href="#"
                      onClick={(e) => this.handleFeatureWillUpdate(e)}
                    >
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="google"
                      href="#"
                      onClick={(e) => this.handleFeatureWillUpdate(e)}
                    >
                      <i className="fa fa-google-plus"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="twitter"
                      href="#"
                      onClick={(e) => this.handleFeatureWillUpdate(e)}
                    >
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      className="instagram"
                      href="#"
                      onClick={(e) => this.handleFeatureWillUpdate(e)}
                    >
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
export default connect(mapStateToProps)(Login)