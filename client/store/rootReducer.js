import { combineReducers } from 'redux'
import auth from './auth/reducer'
import setting from './setting/reducer'
import app from './app/reducer'
import ecomerce from './ecomerce/reducer'
import product from './product/reducer'
import order from './order/reducer'
import tokens from './tokens/reducer'
import landingpages from './landingpages/reducer'

export default combineReducers({
    auth,
    setting,
    app,
    ecomerce,
    products: product,
    order,
    tokens,
    landingpages
})
