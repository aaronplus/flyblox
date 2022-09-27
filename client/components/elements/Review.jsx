import React from 'react'
import Rating from './Rating'

const Review = ({ rating, text, buyer }) => (
  <div style={{ padding: '0rem 1rem' }}>
    <article className='ps-block--store-2'>
      <div
        className='ps-block__content bg--cover'
        style={{
          background: `url('/static/img/vendor/store/default-store-banner.png')`,
        }}
      >
        <figure>
          <h4>
            {buyer.firstName} {buyer.lastName}
          </h4>
          <div className='ps-block__rating'>
            <Rating stars={Math.round(rating)} />
          </div>
          <p>{text}</p>
        </figure>
      </div>
      {/* <div className='ps-block__author'>
        <a className='ps-block__user'>
          <img
            src='/static/img/vendor/store/vendor-150x150.jpg'
            alt='martfury'
          />
        </a>
      </div> */}
    </article>
  </div>
)

export default Review
