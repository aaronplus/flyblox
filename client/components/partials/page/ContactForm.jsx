import { Select } from 'antd'
import { Option } from 'antd/lib/mentions'
import React from 'react'

const ContactForm = () => (
  <div className='ps-contact-form'>
    <div className='container'>
      <form className='ps-form--contact-us' action='/' method='get'>
        <h3>Get In Touch</h3>
        <div className='row'>
          <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 '>
            <div className='form-group'>
              <input
                className='form-control'
                type='text'
                placeholder='Name *'
              />
            </div>
          </div>
          <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 '>
            <div className='form-group'>
              <input
                className='form-control'
                type='text'
                placeholder='Email *'
              />
            </div>
          </div>
          <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 '>
            <div className='form-group'>
              {/* <input
                                className="form-control"
                                type="text"
                                placeholder="Subject *"
                            /> */}
              <Select placeholder='Subject' style={{ width: '100%' }}>
                <Option key={1}>What's this about?</Option>
                <Option key={2}>Report Spam Item</Option>
                <Option key={3}>Bug bounty</Option>
                <Option key={4}>Report product</Option>
                <Option key={5}>Complaints</Option>
                <Option key={6}>Product not received</Option>
                <Option key={7}>Report user</Option>
              </Select>
            </div>
          </div>
          <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 '>
            <div className='form-group'>
              <textarea
                className='form-control'
                rows='5'
                placeholder='Message'
              ></textarea>
            </div>
          </div>
        </div>
        <div className='form-group submit'>
          <button className='ps-btn'>Send message</button>
        </div>
      </form>
    </div>
  </div>
)

export default ContactForm
