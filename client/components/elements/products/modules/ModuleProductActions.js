import React, { useState } from "react"
import { Modal, notification } from "antd"
import { connect } from "react-redux"
import ProductDetailQuickView from "~/components/elements/detail/ProductDetailQuickView"
import useEcomerce from "~/hooks/useEcomerce"
import { Router } from "next/router"

const ModuleProductActions = ({ product, ecomerce, auth }) => {
  const { cartItems } = ecomerce
  const [isQuickView, setIsQuickView] = useState(false)
  const { addItem } = useEcomerce()
  function handleAddItemToCart(e) {
    e.preventDefault()
    const modalSuccess = (type, message) => {
      notification[type]({
        message: message,
      })
    }
    const modalWarning = (type, message) => {
      notification[type]({
        message: message,
      })
    }
    const existItem = cartItems.find((item) => item.id === product._id)
    if (existItem) {
      let total = existItem.quantity + 1
      if (total <= product.quantity) {
        addItem(
          {
            id: product._id,
            quantity: 1,
            name: product.name,
            amount: product.sellingPrice,
            seller: product.seller,
            mainImage: product.mainImage,
            maxQuantity: product.quantity,
          },
          cartItems,
          "cart",
          auth
        )
        modalSuccess("success", "Item successfully added in the cart.")
      } else {
        modalWarning("warning", "Item Quantity Exceed")
      }
    } else {
      if (product.quantity > 0) {
        addItem(
          {
            id: product._id,
            quantity: 1,
            name: product.name,
            amount: product.sellingPrice,
            seller: product.seller,
            mainImage: product.mainImage,
            maxQuantity: product.quantity,
          },
          cartItems,
          "cart",
          auth
        )
        modalSuccess("success", "Item successfully added in the cart.")
      } else {
        modalWarning("warning", "Item Quantity Exceed")
      }
    }

    // e.preventDefault()
    // const modalSuccess = (type, message) => {
    //     notification[type]({
    //         message: message
    //     })
    // }
    // addItem({ id: product._id, quantity: 1, name: product.name, amount: product.sellingPrice, seller: product.seller }, ecomerce.cartItems, 'cart', auth)
    // modalSuccess('success', 'Item successfully added in the cart.')
  }

  function handleAddItemToWishlist(e) {
    e.preventDefault()
    addItem({ id: product._id }, ecomerce.wishlistItems, "wishlist")
    const modal = Modal.success({
      centered: true,
      title: "Success!",
      content: `This item has been added to your wishlist`,
    })
    modal.update
  }

  function handleAddItemToCompare(e) {
    e.preventDefault()
    addItem({ id: product._id }, ecomerce.compareItems, "compare")
    const modal = Modal.success({
      centered: true,
      title: "Success!",
      content: `This product has been added to your compare listing!`,
    })
    modal.update
  }

  const handleShowQuickView = (e) => {
    e.preventDefault()
    setIsQuickView(true)
  }

  const handleHideQuickView = (e) => {
    e.preventDefault()
    setIsQuickView(false)
  }
  return (
    <ul className="ps-product__actions">
      <li>
        <a
          href="#"
          data-toggle="tooltip"
          data-placement="top"
          title="Add To Cart"
          onClick={handleAddItemToCart}
        >
          <i className="icon-bag2"></i>
        </a>
      </li>
      <li>
        <a
          href="#"
          data-toggle="tooltip"
          data-placement="top"
          title="Quick View"
          onClick={handleShowQuickView}
        >
          <i className="icon-eye"></i>
        </a>
      </li>
      <li>
        <a
          href="#"
          data-toggle="tooltip"
          data-placement="top"
          title="Add to wishlist"
          onClick={handleAddItemToWishlist}
        >
          <i className="icon-heart"></i>
        </a>
      </li>
      <li>
        <a
          href="#"
          data-toggle="tooltip"
          data-placement="top"
          title="Compare"
          onClick={handleAddItemToCompare}
        >
          <i className="icon-chart-bars"></i>
        </a>
      </li>
      <Modal
        centered
        footer={null}
        width={1024}
        onCancel={(e) => handleHideQuickView(e)}
        visible={isQuickView}
        closeIcon={<i className="icon icon-cross2"></i>}
      >
        <h3>Quickview</h3>
        <ProductDetailQuickView product={product} />
      </Modal>
    </ul>
  )
}

export default connect((state) => state)(ModuleProductActions)
