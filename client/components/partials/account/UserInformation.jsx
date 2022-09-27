import React, { Component } from 'react'
import Link from 'next/link'
import FormChangeUserInformation from '~/components/shared/FormChangeUserInformation'
import AccountMenuSidebar from './modules/AccountMenuSidebar'

const UserInformation = () => {
  const accountLinks = [
    {
      text: 'Dashboard',
      url: '/account/dashboard',
      icon: 'icon-chart-bars',
    },
    {
      text: 'Account Information',
      url: '/account/user-information',
      icon: 'icon-user',
      active: true,
    },
    {
      text: 'Active Items',
      url: '/account/active-items',
      icon: 'icon-alarm-ringing',
    },
    {
      text: 'Sell Item',
      url: '/account/sell-item',
      icon: 'icon-paperclip',
    },
    {
      text: 'Sold Items',
      url: '/account/sold-items',
      icon: 'icon-alarm-ringing',
    },
    {
      text: 'Purchased Items',
      url: '/account/purchased-items',
      icon: 'icon-paperclip',
    },
    {
      text: 'Disputes',
      url: '/account/disputes',
    },
    // {
    //   text: "Address",
    //   url: "/account/addresses",
    //   icon: "icon-map-marker",
    // },
    // {
    //   text: "Recent Viewed Product",
    //   url: "/account/recent-viewed-product",
    //   icon: "icon-store",
    // },
    // {
    //   text: "Wishlist",
    //   url: "/account/wishlist",
    //   icon: "icon-heart",
    // },
  ]

  return (
    <section className='ps-my-account ps-page--account'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4'>
            <div className='ps-page__left'>
              <AccountMenuSidebar data={accountLinks} />
            </div>
          </div>
          <div className='col-lg-8'>
            <div className='ps-page__content'>
              <div className='ps-section--account-setting'>
                <div className='ps-section__header'>
                  <h3>Account Information</h3>
                </div>
                <div className='ps-section__content'>
                  <FormChangeUserInformation />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserInformation
