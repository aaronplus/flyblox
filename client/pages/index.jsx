import React, { useEffect } from 'react'
import SiteFeatures from '~/components/partials/homepage/home-default/SiteFeatures'
// import HomeAdsColumns from '~/components/partials/homepage/home-default/HomeAdsColumns'
// import HomeAds from '~/components/partials/homepage/home-default/HomeAds'
// import DownLoadApp from '~/components/partials/commons/DownLoadApp'
// import NewArrivals from '~/components/partials/homepage/home-default/NewArrivals'
import Newletters from '~/components/partials/commons/Newletters'
// import HomeDefaultDealOfDay from '~/components/partials/homepage/home-default/HomeDefaultDealOfDay'
// import HomeDefaultTopCategories from '~/components/partials/homepage/home-default/HomeDefaultTopCategories'
// import HomeDefaultProductListing from '~/components/partials/homepage/home-default/HomeDefaultProductListing'
import HomeDefaultBanner from '~/components/partials/homepage/home-default/HomeDefaultBanner'
import PageContainer from '~/components/layouts/PageContainer'
import Shop from '~/pages/shop'
import { WithAuth } from '~/utilities/WithAuth'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '~/store/auth/action'
import gtag, { install } from 'ga-gtag';
const HomepageDefaultPage = () => {
  const dispatch = useDispatch()
  // dispatch(loginSuccess())
  useEffect(() => {
    install('G-GJ3Y3E1SQX');
    gtag('js', new Date());
    gtag('config', 'G-GJ3Y3E1SQX');
  })
  return (
    <PageContainer title='Multipurpose Marketplace React Ecommerce Template'>
      <main id='homepage-1'>
        <Shop />
        <SiteFeatures />
        {/* <HomeDefaultBanner /> */}
        {/* <HomeDefaultDealOfDay collectionSlug="deal-of-the-day" /> */}
        {/* <HomeAdsColumns /> */}
        {/* <HomeDefaultTopCategories /> */}
        {/* <HomeDefaultProductListing
          collectionSlug="consumer-electronics"
          title="Consumer Electronics"
        /> */}
        {/* <HomeDefaultProductListing collectionSlug='products' title='Products' /> */}
        {/* <HomeDefaultProductListing
          collectionSlug="garden-and-kitchen"
          title="Garden & Kitchen"
        /> */}
        {/* <HomeAds /> */}
        {/* <DownLoadApp /> */}
        {/* <NewArrivals collectionSlug="new-arrivals-products" /> */}
        <Newletters />
      </main>
    </PageContainer>
  )
}

export default HomepageDefaultPage
