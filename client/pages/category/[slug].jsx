import React, { useEffect, useState } from 'react'
import BreadCrumb from '~/components/elements/BreadCrumb'
import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories'
import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands'
import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange'
import ProductRepository from '~/repositories/ProductRepository'
import { useRouter } from 'next/router'
import ProductItems from '~/components/partials/product/ProductItems'
import PageContainer from '~/components/layouts/PageContainer'
import FooterDefault from '~/components/shared/footers/FooterDefault'
import Newletters from '~/components/partials/commons/Newletters'
import useGetProducts from '~/hooks/useGetProducts'
import useGetCategories from '~/hooks/useGetCategories'
import { Spin } from 'antd'

const ProductCategoryScreen = () => {
  const Router = useRouter()
  const { slug } = Router.query
  const { productItems, loading, getProductsByCategory } = useGetProducts()
  const { category, getCategory } = useGetCategories()
  // const [category, setCategory] = useState(null);
  // const [loading, setLoading] = useState(false);

  // async function getCategry() {
  //     setLoading(true);
  //     if (slug) {
  //         const responseData = await ProductRepository.getProductsByCategory(
  //             slug
  //         );
  //         if (responseData) {
  //             setCategory(responseData);
  //             setTimeout(
  //                 function () {
  //                     setLoading(false);
  //                 }.bind(this),
  //                 250
  //             );
  //         }
  //     } else {
  //         await Router.push('/shop');
  //     }
  // }

  // useEffect(() => {
  //     getCategry();
  // }, [slug]);

  useEffect(() => {
    if (slug) {
      // getCategory(slug)
      getProductsByCategory(slug)
    }
  }, [slug])

  const breadCrumb = [
    {
      text: 'Home',
      url: '/'
    },
    {
      text: 'Shop',
      url: '/'
      // url: '/shop/shop-sidebar-without-banner'
    },
    {
      //   text: slug ? slug : "Product category",
      text: category ? category.name : 'Product category'
    }
  ]

  // console.log(productItems)
  //Views
  let productItemsViews

  if (!loading) {
    if (productItems && productItems.length > 0) {
      productItemsViews = <ProductItems columns={4} products={productItems} />
    } else {
      productItemsViews = <p>No Product found</p>
    }
  } else {
    productItemsViews = (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Spin />
      </div>
    )
  }

  return (
    <PageContainer
      footer={<FooterDefault />}
      //   title={slug ? slug : "Category"}
      title={category ? category.name : 'Category'}
      boxed={true}
    >
      <div className='ps-page--shop'>
        <BreadCrumb breacrumb={breadCrumb} />
        <div className='container'>
          <div className='ps-layout--shop ps-shop--category'>
            <div className='ps-layout__left'>
              <WidgetShopCategories />
              {/* <WidgetShopBrands /> */}
              {/* <WidgetShopFilterByPriceRange /> */}
            </div>
            <div className='ps-layout__right'>
              {/* <h3 className="ps-shop__heading">{slug}</h3> */}
              <h3 className='ps-shop__heading'>{category && category.name}</h3>
              {productItemsViews}
            </div>
          </div>
        </div>
      </div>
      <Newletters layout='container' />
    </PageContainer>
  )
}
export default ProductCategoryScreen
