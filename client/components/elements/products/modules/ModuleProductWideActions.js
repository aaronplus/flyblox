import React from 'react'
import { connect } from 'react-redux'
import { Modal, notification } from 'antd'
import useProduct from '~/hooks/useProduct'
import useEcomerce from '~/hooks/useEcomerce'

const ModuleProductWideActions = ({ ecomerce, product, auth }) => {
    const { price } = useProduct()
    const { addItem } = useEcomerce()
    const { cartItems } = ecomerce
    const handleAddItemToCart = e => {
        e.preventDefault()
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
        const existItem = cartItems.find(item => item.id === product._id)
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
                        maxQuantity: product.quantity
                    },
                    cartItems,
                    'cart',
                    auth
                )
                modalSuccess('success', 'Item successfully added in the cart.')
            } else {
                modalWarning('warning', 'Item Quantity Exceed')
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
                        maxQuantity: product.quantity
                    },
                    cartItems,
                    'cart',
                    auth
                )
                modalSuccess('success', 'Item successfully added in the cart.')
            } else {
                modalWarning('warning', 'Item Quantity Exceed')
            }
        }
    }

    function handleAddItemToWishlist(e) {
        e.preventDefault()
        addItem({ id: product.id }, ecomerce.wishlistItems, 'wishlist')
        const modal = Modal.success({
            centered: true,
            title: 'Success!',
            content: `This item has been added to your wishlist`,
        })
        modal.update
    }

    function handleAddItemToCompare(e) {
        e.preventDefault()
        addItem({ id: product.id }, ecomerce.compareItems, 'compare')
        const modal = Modal.success({
            centered: true,
            title: 'Success!',
            content: `This product has been added to your compare listing!`,
        })
        modal.update
    }

    return (
        <div className="ps-product__shopping">
            {price(product)}
            <a
                className="ps-btn"
                href="#"
                onClick={(e) => handleAddItemToCart(e)}>
                Add to cart
            </a>
            {/* <ul className="ps-product__actions">
                <li>
                    <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
                        <i className="icon-heart"></i> Wishlist
                    </a>
                </li>
                <li>
                    <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
                        <i className="icon-chart-bars"></i> Compare
                    </a>
                </li>
            </ul> */}
        </div>
    )
}

export default connect((state) => state)(ModuleProductWideActions)
