import React, { Component } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'

import { notification } from 'antd'
import Menu from '../../elements/menu/Menu'
import MetaMask from '~/components/shared/headers/modules/MetaMask'
import menuData from '../../../public/static/data/menu'
import CurrencyDropdown from '../headers/modules/CurrencyDropdown'
import LanguageSwicher from '../headers/modules/LanguageSwicher'
import MenuCategoriesDropdown from '~/components/shared/menus/MenuCategoriesDropdown'

class NavigationDefault extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false
    }
  }
  componentDidMount() {
    this.setState({ isLoggedIn: this.props.isLoggedIn })
  }
  componentDidUpdate(previousProps, previousState) {
    if (this.state.isLoggedIn == false && this.props.isLoggedIn == true) {
      this.setState({ isLoggedIn: this.props.isLoggedIn })
    }
    // this.setState({ isLoggedIn: this.props.isLoggedIn/ });
  }
  handleFeatureWillUpdate(e) {
    e.preventDefault()
    notification.open({
      message: 'Opp! Something went wrong.',
      description: 'This feature has been updated later!',
      duration: 500
    })
  }

  render() {
    return (
      <nav className='navigation'>
        <div className='ps-container'>
          <div className='navigation__left'>
            <MenuCategoriesDropdown />
          </div>
          <div className='navigation__right'>
            {/* <Menu source={menuData.menuPrimary.menu_1} className='menu' /> */}
            {/* <ul className='menu--dropdown'>
              <li>
                <Link href='/'>
                  <a>Home</a>
                </Link>
              </li>
            </ul> */}
            <ul className='navigation__extra'>
              <li>
                <Link href='/page/about-us'>
                  <a>About Us</a>
                </Link>
              </li>
              <li>
                <Link href='/page/contact-us'>
                  <a>Contact Us</a>
                </Link>
              </li>
              <li>
                <Link href='/page/profit-calculator'>
                  <a>Profit Calculator</a>
                </Link>
              </li>
              <li>
                <Link href='/account/sell-item'>
                  <a>List your items for sale</a>
                </Link>
              </li>
              {this.state.isLoggedIn ? (
                <li>
                  <MetaMask />
                </li>
              ) : (
                ''
              )}

              {/* <li>
                <Link href='/account/order-tracking'>
                  <a>Tract your order</a>
                </Link>
              </li>
              {*
              <li>
                <CurrencyDropdown />
              </li>
              <li>
                <LanguageSwicher />
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

// export default
const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
})
export default connect(mapStateToProps, null)(NavigationDefault)
