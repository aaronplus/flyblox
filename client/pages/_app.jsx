import React, { useEffect } from 'react'
import { wrapper } from '~/store/store'
import { autoLogin } from '~/store/auth/action'
import { CookiesProvider } from 'react-cookie'
import { useDispatch } from 'react-redux'

import MasterLayout from '~/components/layouts/MasterLayout'
import '~/public/static/fonts/Linearicons/Font/demo-files/demo.css'
import '~/public/static/fonts/font-awesome/css/font-awesome.min.css'
import '~/public/static/css/bootstrap.min.css'
import '~/public/static/css/slick.min.css'
import '~/scss/style.scss'
import '~/scss/home-default.scss'
import '~/scss/market-place-1.scss'
import '~/scss/market-place-2.scss'
import '~/scss/market-place-3.scss'
import '~/scss/market-place-4.scss'
import '~/scss/electronic.scss'
import '~/scss/furniture.scss'
import '~/scss/organic.scss'
import '~/scss/technology.scss'
import '~/scss/autopart.scss'
import '~/scss/electronic.scss'

function App({ Component, pageProps }) {
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(function () {
      document.getElementById('__next').classList.add('loaded')
    }, 100)
  })

  useEffect(() => {
    // console.log('localStorage.getItem(access_token)',localStorage.getItem('access_token'))
    dispatch(
      autoLogin(localStorage.getItem('access_token') != null ? true : false)
    )
  }, [])

  return (
    <CookiesProvider>
      <MasterLayout>
        <Component {...pageProps} />
      </MasterLayout>
    </CookiesProvider>
  )
}

export default wrapper.withRedux(App)
