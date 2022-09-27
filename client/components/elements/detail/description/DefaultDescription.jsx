import React, { useEffect } from 'react'

import { Spin, Tabs } from 'antd'
import PartialDescription from '~/components/elements/detail/description/PartialDescription'
import PartialSpecification from '~/components/elements/detail/description/PartialSpecification'
import PartialVendor from '~/components/elements/detail/description/PartialVendor'
import PartialReview from '~/components/elements/detail/description/PartialReview'
import PartialOffer from '~/components/elements/detail/description/PartialOffer'
import Rating from '../../Rating'
import useGetProducts from '~/hooks/useGetProducts'

const { TabPane } = Tabs

const DefaultDescription = ({ product }) => {
  const { rating, loading, getProductRating } = useGetProducts()

  useEffect(() => {
    if(product){
      getProductRating(product._id)
    }
  }, [product])

  return (
    <div className='ps-product__content ps-tab-root'>
      <div className='rating-box'>
      {
        loading === false && rating && rating.total?
        <>
        <h4>Seller Feedback {((rating.total)/5)*100}%</h4>
        <div className='description-feedback'>
          <div className='item'>
            <h6>Item Description:</h6>
            <Rating stars={Math.round(rating?.averageDescriptionRating)} />
          </div>
          <div className='item'>
            <h6>Postage Time:</h6>
            <Rating stars={Math.round(rating?.averageTimeRating)} />
          </div>
          <div className='item'>
            <h6>Communication:</h6>
            <Rating stars={Math.round(rating?.averageCommunicationRating)} />
          </div>
        </div>
        </>
        : 
        <>
        {loading === false ? 
          <>
            <h4>Seller Feedback</h4>
            <div>No Feedback yet</div>
          </>
          :
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spin />
          </div>
        }
        </>
      }
      </div>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Description' key='1'>
          <PartialDescription description={product?.description} />
        </TabPane>
        {/* <TabPane tab="Specification" key="2">
                    <PartialSpecification />
                </TabPane>
                <TabPane tab="Vendor" key="3">
                    <PartialVendor />
                </TabPane> */}
        <TabPane tab='Reviews' key='2'>
          <PartialReview productId={product?._id} />
        </TabPane>
        {/* <TabPane tab="Questions and Answers" key="5">
                    Content of Tab Pane 3
                </TabPane>
                <TabPane tab="More Offers" key="6">
                    <PartialOffer />
                </TabPane> */}
      </Tabs>
    </div>
  )
}

export default DefaultDescription
