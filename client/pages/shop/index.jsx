import React from 'react'
import BreadCrumb from '~/components/elements/BreadCrumb'
import ShopItems from '~/components/partials/shop/ShopItems'
import ProductGroupByCarousel from '~/components/partials/product/ProductGroupByCarousel'
import ShopCategories from '~/components/partials/shop/ShopCategories'
import ShopBrands from '~/components/partials/shop/ShopBrands'
import ShopBanner from '~/components/partials/shop/ShopBanner'
import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories'
import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands'
import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange'
import PageContainer from '~/components/layouts/PageContainer'
import Newletters from '~/components/partials/commons/Newletters'

const ShopDefaultPage = () => {
  const breadCrumb = [
    {
      text: 'Home',
      url: '/'
    },
    {
      text: 'Shop Default'
    }
  ]

  return (
    // <PageContainer title='Shop'>
    <div className='ps-page--shop'>
      {/* <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" /> */}
      <div className='ps-container'>
        <ShopBanner />
        {/* <ShopBrands />
          <ShopCategories /> */}
        <div className='ps-layout--shop'>
          <div className='ps-layout__left'>
            <WidgetShopCategories />
            {/* <WidgetShopBrands />
              <WidgetShopFilterByPriceRange /> */}
          </div>
          <div className='ps-layout__right'>
            <ProductGroupByCarousel
              filter='topSeller'
              title='Top Selling Products'
              layout='with-dots'
            />
            <ProductGroupByCarousel
              filter='latest'
              title='New Arrivals'
              layout='with-dots'
            />
            {/* <ProductGroupByCarousel
                collectionSlug='shop-recommend-items'
                title='Recommended Items'
              /> */}
            <ShopItems columns={4} pageSize={12} />
          </div>
        </div>
      </div>
    </div>
    // <Newletters />
    // </PageContainer>
  )
}
export default ShopDefaultPage
