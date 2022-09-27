import React, { Component } from 'react'
import CurrencyDropdown from './modules/CurrencyDropdown'
import Link from 'next/link'
import LanguageSwicher from './modules/LanguageSwicher'
import MobileHeaderActions from './modules/MobileHeaderActions'
import Router from 'next/router'

class HeaderMobile extends Component {
  constructor({ props }) {
    super(props)
    this.state = {
      keyword: ''
    }
  }

  handleChange(event) {
    this.setState({ keyword: event.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.keyword != '') {
      this.setState({ keyword: '' })
      Router.push(
        `/search?keyword=${this.state.keyword}&category=all`
      )
    }
  }

  render() {
    return (
      <header className='header header--mobile'>
        <div className='header__top'>
          <div className='header__left'>
            <p>Welcome to Martfury Online Shopping Store !</p>
          </div>
          {/* <div className='header__right'>
            <ul className='navigation__extra'>
              <li>
                <Link href='/vendor/become-a-vendor'>
                  <a>Sell on Martfury</a>
                </Link>
              </li>
              <li>
                <Link href='/account/order-tracking'>
                  <a>Tract your order</a>
                </Link>
              </li>
              <li>
                <CurrencyDropdown />
              </li>
              <li>
                <LanguageSwicher />
              </li>
            </ul>
          </div> */}
        </div>
        <div className='navigation--mobile'>
          <div className='navigation__left'>
            <Link href='/'>
              <a className='ps-logo'>
                <img
                  src='/static/img/logo-bitlyra.png'
                  alt='bitlyra'
                  style={{ objectFit: 'contain', width: '185px' }}
                />
              </a>
            </Link>
          </div>
          <MobileHeaderActions />
        </div>
        <div className='ps-search--mobile'>
          <form
            className='ps-form--search-mobile'
            action='/'
            method='get'
          >
            <div className='form-group--nest'>
              <input
                className='form-control'
                type='text'
                placeholder='Search something...'
                value={this.state.keyword}
                onChange={e => this.handleChange(e)}
              />
              <button onClick={this.handleSubmit}>
                <i className='icon-magnifier'></i>
              </button>
            </div>
          </form>
        </div>
      </header>
    )
  }
}

export default HeaderMobile
