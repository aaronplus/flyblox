const baseURL = `${process.env.baseURL}`;
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { register } from '../../../store/auth/action'
import Image from 'next/image'
import { Form, Input } from 'antd'
import { connect, useDispatch } from 'react-redux'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import { useRef } from 'react';
const RegisterPanel = ({
    landingpage,
    slug
}) => {

    const ref = useRef(null);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: 'GET_LANDING_PAGE_ACC_TO_SLUG',
            payload: { slug: slug }
        })
    }, []);

    const handleSubmit = async values => {
        dispatch(register(values))
    }

    const handleClick = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='ps-my-account ps-register-panel'>
            <div>
                {landingpage?.panel_images != undefined && (
                    <div>
                        {landingpage?.panel_images.map((img, i) =>
                            <Image
                                className='panel-image'
                                key={i}
                                // src={`http://localhost:4000/${img}`}
                                 src={`${baseURL}/${img}`}
                                onClick={handleClick}
                                alt="alt"
                                layout="responsive"
                                width={1500}
                                height={350}
                            />
                        )}
                    </div>
                )}
            </div>
            <div className='container background-container' 
            style={{
                paddingBottom: '2px',
                backgroundImage: `url('${baseURL}/${landingpage?.register_panel_background}')`,
                // backgroundImage: `url('http://localhost:4000/${landingpage?.register_panel_background}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
             ref={ref}>
                <Form
                    className={`register-panel-form--account  
                    ${landingpage?.register_form_location == "left" ? "register-panel-left"
                            : landingpage?.register_form_location == "right" ? "register-panel-right"
                                : "register-panel-center"}`}
                    onFinish={handleSubmit}
                    layout="vertical"

                >
                    <ul className='ps-tab-list'>
                        <li className='active'>
                            {/* <Link href='/register'> */}
                                <a>Register</a>
                            {/* </Link> */}
                        </li>
                    </ul>
                    <div
                        className='ps-tab active register-tab'
                        id='register'
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
                                        <a>I accept terms and conditions</a>
                                    </Checkbox>
                                </Form.Item>
                            </div>
                            <div className='form-group submit'>
                                <button type='submit' className='ps-register-btn ps-btn--fullwidth'
                                    style={{ backgroundColor: `${landingpage?.register_button_colour}` }}
                                >
                                    {landingpage?.register_button_label}
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    landingpage: state.landingpages.landingPageAccToSlug
})
export default connect(mapStateToProps)(RegisterPanel)
