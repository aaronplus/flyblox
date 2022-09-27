import React from 'react'

const Rating = ({ stars }) => {
  let rating = []
  for (var i = 0; i < 5; i++) {
    if (i < stars) {
      rating.push(<i className='fa fa-star'></i>)
    } else {
      rating.push(<i className='fa fa-star-o'></i>)
    }
  }
  return <span className='ps-rating'>{rating}</span>
}

export default Rating
