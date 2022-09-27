import React from 'react'
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault'
import DefaultDescription from '~/components/elements/detail/description/DefaultDescription'
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription'
import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions'
import ModuleProductDetailSpecification from '~/components/elements/detail/modules/ModuleProductDetailSpecification'
import ModuleProductDetailSharing from '~/components/elements/detail/modules/ModuleProductDetailSharing'
import ModuleDetailActionsMobile from '~/components/elements/detail/modules/ModuleDetailActionsMobile'
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation'
import LazyLoad from 'react-lazyload'
import { baseURL } from '~/endpoints'
import { useState } from 'react'
import { useEffect } from 'react'
import useEcomerce from '~/hooks/useEcomerce'
import { connect } from 'react-redux'

const ProductDetailFullwidth = ({ product, ecomerce }) => {
  const { getQty } = useEcomerce()
  const [productQuantity, setProductQuantity] = useState(
    product?.quantity
  )
  const [selectedAttributes, setSelectedAttributes] = useState({})

  useEffect(() => {
    if (product) {
      let quantity = getQty(product, ecomerce.cartItems)
      if (quantity) {
        setProductQuantity(product?.quantity - quantity)
      } else {
        setProductQuantity(product?.quantity)
      }
    }
  }, [product, ecomerce])

  useEffect(() => {
    if (product.attributes.length > 0) {
      let attribute = {}
      product.attributes.map(item => {
        if (item.options?.length > 0) {
          attribute[item.name] = item.options[0].label
        }
      })
      setSelectedAttributes(attribute)
    }
  }, [product])

  function onAttributeChange(e, name) {
    setSelectedAttributes({
      ...selectedAttributes,
      [name]: e.target.value
    })
  }

  const onChange = (action, quantity) => {
    if (action === 'Increase') {
      setProductQuantity(productQuantity - 1)
    } else {
      setProductQuantity(productQuantity + 1)
    }
  }

  return (
    <div className='ps-product--detail ps-product--fullwidth'>
      <div className='ps-product__header'>
        <ThumbnailDefault product={product} />
        {/* <div className='ps-wrapper'> */}
        {/* <LazyLoad>
            <img
              style={{
                width: '320px',
                height: '320px',
                objectFit: 'contain'
              }}
              src={baseURL + '/' + product.mainImage}
              alt='image'
            />
          </LazyLoad> */}
        <div className='ps-product__info'>
          <ModuleDetailTopInformation
            product={product}
            productQuantity={productQuantity}
          />
          {/* <ModuleProductDetailDescription product={product} /> */}
          <ModuleDetailShoppingActions
            product={product}
            productQuantity={productQuantity}
            setProductQuantity={onChange}
            selectedAttributes={selectedAttributes}
            onAttributeChange={onAttributeChange}
          />
          <ModuleProductDetailSpecification product={product} />
          {/* <ModuleProductDetailSharing /> */}
          <ModuleDetailActionsMobile
            product={product}
            productQuantity={productQuantity}
            setProductQuantity={onChange}
          />
        </div>
      </div>
      <DefaultDescription product={product} />
    </div>
  )
}

export default connect(state => state)(ProductDetailFullwidth)
