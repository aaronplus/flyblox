import React from 'react'
import Link from 'next/link'

const ModuleProductDetailSpecification = ({ product }) => (
    <div className="ps-product__specification">
        {/* <Link href="/page/contact-us">
            <a className="report">Report Abuse</a>
        </Link> */}
        {product?.sku ?
            <p>
                <strong>SKU:</strong> {product.sku}
            </p>
            : null
        }
        {product?.category ?
            <p className="categories">
                <strong> Categories:</strong>
                <Link href={`/category/${product?.category?._id}`}>
                    <a>{product?.category?.name}</a>
                </Link>
            </p>
            : null
        }
        {/* <p className="tags">
            <strong> Tags</strong>
            <Link href="/shop">
                <a>sofa</a>
            </Link>
            <Link href="/shop">
                <a>technologies</a>
            </Link>
            <Link href="/shop">
                <a>wireless</a>
            </Link>
        </p> */}
    </div >
)

export default ModuleProductDetailSpecification
