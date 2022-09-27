import React from 'react'
import { connect, useDispatch } from 'react-redux'
import Link from 'next/link'
import { logOut } from '~/store/auth/action'
import getToken from '~/utilities/GetToken'

const AccountQuickLinks = (props) => {
  const { isLoggedIn } = props
  const dispatch = useDispatch()
  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logOut())
  }
  const accountLinks = [
    {
      text: 'Dashboard',
      url: '/account/dashboard',
    },
    {
      text: 'Account Information',
      url: '/account/user-information',
    },
    {
      text: 'Active Items',
      url: '/account/active-items',
    },
    {
      text: 'Sell Item',
      url: '/account/sell-item',
    },
    {
      text: 'Sold Items',
      url: '/account/sold-items',
    },
    {
      text: 'Purchased Items',
      url: '/account/purchased-items',
    },
    {
      text: 'Disputes',
      url: '/account/disputes',
    },
    // {
    //   text: 'Address',
    //   url: '/account/addresses'
    // },
    // {
    //   text: 'Recent Viewed Product',
    //   url: '/account/recent-viewed-product'
    // },
    // {
    //   text: 'Wishlist',
    //   url: '/account/wishlist'
    // }
  ]

  // View
  const linksView = accountLinks.map((item) => (
    <li key={item.text}>
      <Link href={item.url}>
        <a>{item.text}</a>
      </Link>
    </li>
  ))

  if (isLoggedIn) {
    return (
      <div className='ps-block--user-account'>
        <i className='icon-user'></i>
        <div className='ps-block__content'>
          <ul className='ps-list--arrow'>
            {linksView}
            <li className='ps-block__footer'>
              <a onClick={(e) => handleLogout(e)}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    )
  } else {
    return (
      <div className='ps-block--user-header'>
        <div className='ps-block__left'>
          <i className='icon-user'></i>
        </div>
        <div className='ps-block__right'>
          <Link href='/account/login'>
            <a>Login</a>
          </Link>
          <Link href='/account/register'>
            <a>Register</a>
          </Link>
        </div>
      </div>
    )
  }
}

export default connect((state) => state)(AccountQuickLinks)
