import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '~/store/auth/action'
import FormHeaderSearch from '~/components/shared/forms/FormHeaderSearch'
import { WithAuth } from '~/utilities/WithAuth'
const HeaderDashboard = ({
  title = 'Dashboard',
  description = 'Everything here'
}) => {
  const dispatch = useDispatch()
  const handleLogout = e => {
    e.preventDefault()
    dispatch(logOut())
  }

  return (
    <header className='header--dashboard'>
      {/* <div className="header__left">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <div className="header__center">
                <FormHeaderSearch />
            </div> */}
      <div className='header__right'>
        <a className='header__site-link' href='#'
          style={{ marginRight: '30px' }}
        >
          <span>View your store</span>
          <i className='icon-exit-right'></i>
        </a>
        <a className='header__site-link' href='#'
          onClick={e => handleLogout(e)}>
          <span>Logout</span>
          <i className='icon-power-switch'></i>
        </a>
      </div>
      {/* <a onClick={e => handleLogout(e)}>
        <i className='icon-power-switch'></i>
        Logout
      </a> */}
    </header>
  )
}

export default HeaderDashboard;
