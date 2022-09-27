import React from 'react'
import Link from 'next/link'
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions'
import useProduct from '~/hooks/useProduct'
import Rating from '~/components/elements/Rating'
import LazyLoad from 'react-lazyload'
import { baseUrl } from '~/repositories/Repository'

const Product = ({ product }) => {
  const { thumbnailImage, price, badge, title } = useProduct()
  return (
    <div className='ps-product'>
      <div className='ps-product__thumbnail'>
        <Link href='/product/[pid]' as={`/product/${product._id}`}>
          <a>
            <LazyLoad>
              <img
                style={{
                  width: '183px',
                  height: '183px',
                  objectFit: 'contain',
                }}
                src={baseUrl + '/' + product.mainImage}
                alt='image'
              />
            </LazyLoad>
          </a>
        </Link>
        {/* {badge(product)} */}
        {/* <ModuleProductActions product={product} /> */}
      </div>
      <div className='ps-product__container'>
        {/* <Link href='/shop'> */}
        <a className='ps-product__vendor'></a>
        {/* </Link> */}
        <div className='ps-product__content'>
          {title(product)}
          {/* <div className="ps-product__rating">
            <Rating />
            <span>02</span>
          </div> */}
          {price(product)}
        </div>
        <div className='ps-product__content hover'>
          {title(product)}
          {price(product)}
        </div>
      </div>
    </div>
  )
}

export default Product
