import React from 'react'
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault'
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation'
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription'
import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions'
import ModuleProductDetailSpecification from '~/components/elements/detail/modules/ModuleProductDetailSpecification'
import ModuleProductDetailSharing from '~/components/elements/detail/modules/ModuleProductDetailSharing'
import ModuleDetailActionsMobile from '~/components/elements/detail/modules/ModuleDetailActionsMobile'
import LazyLoad from 'react-lazyload'
import { baseURL } from '~/endpoints'
const ProductDetailQuickView = ({ product }) => (
  <div className='ps-product--detail ps-product--quickview'>
    <div className='ps-product__header'>
      {/* <ThumbnailDefault product={product} vertical={false} /> */}
      <LazyLoad>
        <img style={{width:"50%",height:"50%"}} src={baseURL + '/' + product.mainImage} alt='image' />
      </LazyLoad>
      <div className='ps-product__info'>
        <ModuleDetailTopInformation product={product} />
        <ModuleProductDetailDescription product={product} />
        <ModuleDetailShoppingActions product={product} extended={true} />
        <ModuleProductDetailSpecification />
        <ModuleProductDetailSharing />
        <ModuleDetailActionsMobile product={product} />
      </div>
    </div>
  </div>
)

export default ProductDetailQuickView
