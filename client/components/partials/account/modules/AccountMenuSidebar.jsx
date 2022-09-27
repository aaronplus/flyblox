import React from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { logOut } from '~/store/auth/action'

const AccountMenuSidebar = ({ data }) => {
  const dispatch = useDispatch()
  const handleLogout = e => {
    e.preventDefault()
    dispatch(logOut())
  }
  return (
    <aside className='ps-widget--account-dashboard'>
      {/* <div className="ps-widget__header">
            <img src="/static/img/users/3.jpg" />
            <figure>
                <figcaption>Hello</figcaption>
                <p>username@gmail.com</p>
            </figure>
        </div> */}
      <div className='ps-widget__content'>
        <ul>
          {data.map(link => (
            <li key={link.text} className={link.active ? 'active' : ''}>
              <Link href={link.url}>
                <a>
                  <i className={link.icon}></i>
                  {link.text}
                </a>
              </Link>
            </li>
          ))}
          <li>
            <a onClick={e => handleLogout(e)}>
              <i className='icon-power-switch'></i>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default AccountMenuSidebar
