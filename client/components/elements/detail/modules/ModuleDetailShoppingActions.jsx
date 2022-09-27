import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { Modal, notification, Radio } from 'antd'
import useEcomerce from '~/hooks/useEcomerce'
import { useEffect } from 'react'
import { set } from 'js-cookie'

const ModuleDetailShoppingActions = ({
  ecomerce,
  product,
  auth,
  extended = false,
  productQuantity,
  setProductQuantity,
  selectedAttributes,
  onAttributeChange
}) => {
  const [quantity, setQuantity] = useState(1)

  const Router = useRouter()
  const { cartItems } = ecomerce

  const { addItem } = useEcomerce()

  useEffect(() => {
    setQuantity(1)
  }, [ecomerce])

  const modalSuccess = (type, message) => {
    notification[type]({
      message: message
    })
  }

  const modalWarning = (type, message) => {
    notification[type]({
      message: message
    })
  }

  function handleAddItemToCart(e) {
    e.preventDefault()
    const existItem = cartItems.find(item => item.id === product._id)
    if (existItem) {
      let total = existItem.quantity + quantity
      if (total <= product.quantity) {
        addItem(
          {
            id: product._id,
            quantity: quantity,
            name: product.name,
            amount: product.sellingPrice,
            seller: product.seller,
            mainImage: product.mainImage,
            maxQuantity: product.quantity,
            attributes: selectedAttributes
          },
          cartItems,
          'cart',
          auth
        )
        modalSuccess(
          'success',
          'Item successfully added in the cart.'
        )
      } else {
        modalWarning('warning', 'Item Quantity Exceed')
      }
    } else {
      if (quantity <= product.quantity) {
        addItem(
          {
            id: product._id,
            quantity: quantity,
            name: product.name,
            amount: product.sellingPrice,
            seller: product.seller,
            mainImage: product.mainImage,
            maxQuantity: product.quantity,
            attributes: selectedAttributes
          },
          cartItems,
          'cart',
          auth
        )
        modalSuccess(
          'success',
          'Item successfully added in the cart.'
        )
      } else {
        modalWarning('warning', 'Item Quantity Exceed')
      }
    }
  }

  function handleBuynow(e) {
    e.preventDefault()
    const existItem = cartItems.find(item => item.id === product._id)
    if (existItem) {
      let total = existItem.quantity + quantity
      if (total <= product.quantity) {
        addItem(
          {
            id: product._id,
            quantity: quantity,
            name: product.name,
            amount: product.sellingPrice,
            seller: product.seller,
            mainImage: product.mainImage,
            maxQuantity: product.quantity,
            attributes: selectedAttributes
          },
          cartItems,
          'cart',
          auth
        )
        setTimeout(function () {
          Router.push('/account/checkout')
        }, 1000)
      } else {
        modalWarning('warning', 'Item Quantity Exceed')
      }
    } else {
      if (quantity <= product.quantity) {
        addItem(
          {
            id: product._id,
            quantity: quantity,
            name: product.name,
            amount: product.sellingPrice,
            seller: product.seller,
            mainImage: product.mainImage,
            maxQuantity: product.quantity,
            attributes: selectedAttributes
          },
          cartItems,
          'cart',
          auth
        )
        setTimeout(function () {
          Router.push('/account/checkout')
        }, 1000)
      } else {
        modalWarning('warning', 'Item Quantity Exceed')
      }
    }
  }

  // const handleAddItemToCompare = e => {
  //   e.preventDefault()
  //   e.preventDefault()
  //   addItem({ id: product.id }, ecomerce.compareItems, 'compare')
  //   const modal = Modal.success({
  //     centered: true,
  //     title: 'Success!',
  //     content: `This product has been added to compare listing!`
  //   })
  //   modal.update
  // }

  // const handleAddItemToWishlist = e => {
  //   e.preventDefault()
  //   addItem({ id: product.id }, ecomerce.wishlistItems, 'wishlist')
  //   const modal = Modal.success({
  //     centered: true,
  //     title: 'Success!',
  //     content: `This item has been added to your wishlist`
  //   })
  //   modal.update
  // }

  const handleIncreaseItemQty = async e => {
    setQuantity(quantity + 1)
    setProductQuantity('Increase', quantity)
  }

  function handleDecreaseItemQty(e) {
    e.preventDefault()
    if (quantity > 1) {
      setQuantity(quantity - 1)
      setProductQuantity('Decrease', quantity)
    }
  }

  if (!extended) {
    return (
      <div>
        {product?.attributes.length > 0 ? (
          <>
            {product.attributes.map(item => {
              let options = item.options.map(option => {
                return { label: option.label, value: option.label }
              })

              return (
                <div style={{ marginBottom: '1rem' }}>
                  <h5>{item.name}</h5>
                  <Radio.Group
                    id='rg'
                    options={options}
                    onChange={e => onAttributeChange(e, item.name)}
                    value={selectedAttributes[item.name]}
                    optionType='button'
                  />
                </div>
              )
            })}
          </>
        ) : null}
        <div className='ps-product__shopping'>
          <figure>
            <figcaption>Quantity</figcaption>
            <div className='form-group--number'>
              <button
                className='up'
                onClick={e => handleIncreaseItemQty(e)}
              >
                <i className='fa fa-plus'></i>
              </button>
              <button
                className='down'
                onClick={e => handleDecreaseItemQty(e)}
              >
                <i className='fa fa-minus'></i>
              </button>
              <input
                className='form-control'
                type='text'
                placeholder={quantity}
                disabled
              />
            </div>
          </figure>
          <a
            className='ps-btn ps-btn--black'
            onClick={e =>
              productQuantity > 0 ? handleAddItemToCart(e) : null
            }
            style={{ opacity: productQuantity > 0 ? '' : '0.75' }}
            disabled={productQuantity > 0 ? null : 'disabled'}
          >
            Add to cart
          </a>
          <a
            // className='ps-btn'
            className='ps-btn ps-btn--black'
            onClick={e =>
              productQuantity > 0 ? handleBuynow(e) : null
            }
            style={{ opacity: productQuantity > 0 ? '' : '0.75' }}
            disabled={productQuantity > 0 ? null : 'disabled'}
          >
            Buy Now
          </a>
          {/* <div className='ps-product__actions'>
          <a href='#' onClick={e => handleAddItemToWishlist(e)}>
            <i className='icon-heart'></i>
          </a>
          <a href='#' onClick={e => handleAddItemToCompare(e)}>
            <i className='icon-chart-bars'></i>
          </a>
        </div> */}
        </div>
      </div>
    )
  } else {
    return (
      <div className='ps-product__shopping extend'>
        <div className='ps-product__btn-group'>
          <figure>
            <figcaption>Quantity</figcaption>
            <div className='form-group--number'>
              <button
                className='up'
                onClick={e => handleIncreaseItemQty(e)}
              >
                <i className='fa fa-plus'></i>
              </button>
              <button
                className='down'
                onClick={e => handleDecreaseItemQty(e)}
              >
                <i className='fa fa-minus'></i>
              </button>
              <input
                className='form-control'
                type='text'
                placeholder={quantity}
                disabled
              />
            </div>
          </figure>
          <a
            className='ps-btn ps-btn--black'
            href='#'
            onClick={e => handleAddItemToCart(e)}
          >
            Add to cart
          </a>
          {/* <div className='ps-product__actions'>
            <a href='#' onClick={e => handleAddItemToWishlist(e)}>
              <i className='icon-heart'></i>
            </a>
            <a href='#' onClick={e => handleAddItemToCompare(e)}>
              <i className='icon-chart-bars'></i>
            </a>
          </div> */}
        </div>
        <a className='ps-btn' href='#' onClick={e => handleBuynow(e)}>
          Buy Now
        </a>
      </div>
    )
  }
}

export default connect(state => state)(ModuleDetailShoppingActions)
