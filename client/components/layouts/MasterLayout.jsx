import React, { useEffect } from 'react'
import { BackTop } from 'antd'
import { useDispatch } from 'react-redux'
import { useCookies } from 'react-cookie'
import {
  setCartItems,
  setCompareItems,
  setWishlistTtems
} from '~/store/ecomerce/action'
import PageLoader from '~/components/elements/common/PageLoader'
import NavigationList from '~/components/shared/navigation/NavigationList'
import MainHead from '~/components/layouts/modules/MainHead'
import getToken from '~/utilities/GetToken'
import CartRepository from '~/repositories/CartRepository'

const MasterLayout = ({ children }) => {
  const dispatch = useDispatch()
  const [cookies, setCookie] = useCookies(['cart', 'compare', 'wishlist'])
  const token = getToken()
  async function initEcomerceValues() {
    if (token) {
      if (localStorage.getItem('first_time')) {
        if (cookies.cart && cookies.cart.length > 0) {
          const res = await CartRepository.addCartItems({
            newCartItems: cookies.cart
          })
          if (res.cartItems) {
            dispatch(setCartItems(res.cartItems))
          }
        } else {
          const res = await CartRepository.getCartItems()
          if (res.cartItems) {
            dispatch(setCartItems(res.cartItems))
          }
        }
        localStorage.removeItem('first_time')
      } else {
        const res = await CartRepository.getCartItems()
        if (res.cartItems) {
          dispatch(setCartItems(res.cartItems))
        }
      }
    } else {
      if (localStorage.getItem('logout')) {
        localStorage.removeItem('logout')
        setCookie('cart', [], { path: '/' })
      } else {
        if (cookies.cart && cookies.cart.length > 0) {
          dispatch(setCartItems(cookies.cart))
        }
      }
    }
    if (cookies) {
      //   if (cookies.cart) {
      //     console.log(cookies.cart)
      //     dispatch(setCartItems(cookies.cart))
      //   }
      if (cookies.wishlist) {
        dispatch(setWishlistTtems(cookies.wishlist))
      }
      if (cookies.compare) {
        dispatch(setCompareItems(cookies.compare))
      }
    }
  }

  useEffect(() => {
    initEcomerceValues()
  }, [token])

  return (
    <>
      <MainHead />
      {children}
      <PageLoader />
      <NavigationList />
      <BackTop>
        <button className='ps-btn--backtop'>
          <i className='icon-arrow-up'></i>
        </button>
      </BackTop>
    </>
  )
}

export default MasterLayout
