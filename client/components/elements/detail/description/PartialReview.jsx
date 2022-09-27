import React, { useEffect, useState } from 'react'
import { Pagination, Rate, Spin } from 'antd'
import Rating from '~/components/elements/Rating'
import useGetProducts from '~/hooks/useGetProducts'
import Review from '../../Review'

const PartialReview = ({ productId }) => {
  const { reviews, loading, getProductReviews } = useGetProducts()
  const [page, setPage] = useState(1)
  const [reviewList, setReviewList] = useState()
  const [ratingCount, setRatingCount] = useState()

  const getCount = () => {
    let Count = []
    let allReviews = reviews?.allRatings[0].allReviews
    for (let i = 1; i <= 5; i++) {
      let test = allReviews.filter((item) => i == item.stars)
      if (test.length > 0) {
        Count.push(test[0].count)
      } else {
        Count.push(0)
      }
    }
    setRatingCount(Count)
  }

  const getList = (number) => {
    console.log(number, 'page')
    let start = number * 2
    let end = start + 2
    let allFeedbackTexts = reviews?.allFeedbackTexts
    let List = allFeedbackTexts.slice(start, end)
    setReviewList(List)
  }

  useEffect(() => {
    getProductReviews(productId)
  }, [productId])

  if (loading === false && reviews?.allFeedbackTexts.length > 0) {
    if (!ratingCount) {
      getCount()
    }
    if (!reviewList) {
      getList(0)
    }
  }

  function handlePagination(page, pageSize) {
    setPage(page)
    getList(page - 1)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '0rem 1rem',
      }}
    >
      {loading === false && ratingCount ? (
        <>
          {/* <div className='col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 '>
            <div className='ps-block--average-rating'>
              <div className='ps-block__header'>
                {reviews?.allRatings[0]?.averageRating ? (
                  <>
                    <h3>{reviews.allRatings[0].averageRating}</h3>
                    <Rating
                      stars={Math.round(
                        reviews.allRatings[0].averageRating
                      )}
                    />
                  </>
                ) : (
                  <>
                    <h3>0.0</h3>
                    <Rating />
                  </>
                )}
                <span>
                  {reviews?.allFeedbackTexts
                    ? reviews.allFeedbackTexts.length
                    : ''}{' '}
                  Review
                </span>
              </div>
              <div className='ps-block__star'>
                <span>5 Star</span>
                <div className='ps-progress' data-value='70'>
                  <span></span>
                </div>
                <span>{ratingCount[4]}</span>
              </div>
              <div className='ps-block__star'>
                <span>4 Star</span>
                <div className='ps-progress' data-value='0'>
                  <span></span>
                </div>
                <span>{ratingCount[3]}</span>
              </div>
              <div className='ps-block__star'>
                <span>3 Star</span>
                <div className='ps-progress' data-value='0'>
                  <span></span>
                </div>
                <span>{ratingCount[2]}</span>
              </div>
              <div className='ps-block__star'>
                <span>2 Star</span>
                <div className='ps-progress' data-value='0'>
                  <span></span>
                </div>
                <span>{ratingCount[1]}</span>
              </div>
              <div className='ps-block__star'>
                <span>1 Star</span>
                <div className='ps-progress' data-value='0'>
                  <span></span>
                </div>
                <span>{ratingCount[0]}</span>
              </div>
            </div>
          </div> */}
          <div>
            {/* <div className='col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 '> */}
            {/* <h4>Reviews</h4> */}
            {/* <p>Feedback of product provided by buyer</p> */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {reviewList.map((item) => (
                <Review
                  rating={item.stars}
                  text={item.feedbackText}
                  buyer={item.buyer}
                />
              ))}
            </div>
            <div className='ps-pagination'>
              <Pagination
                total={reviews?.allFeedbackTexts.length}
                pageSize={2}
                responsive={true}
                showSizeChanger={false}
                current={page}
                onChange={(e) => handlePagination(e)}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          {loading === false && reviews?.allFeedbackTexts.length == 0 ? (
            <div>No Reviews yet</div>
          ) : (
            <Spin />
          )}
        </>
      )}
    </div>
  )
}

export default PartialReview
