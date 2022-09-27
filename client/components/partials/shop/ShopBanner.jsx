import { useRouter } from 'next/router'
import React from 'react'
import Slider from 'react-slick'
import NextArrow from '~/components/elements/carousel/NextArrow'
import PrevArrow from '~/components/elements/carousel/PrevArrow'

const ShopBanner = () => {
  const carouselSetting = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }
  const router = useRouter()
  return (
    <div className='ps-shop-banner' style={{ cursor: 'pointer' }}>
      <div className='desktop'>
        <Slider {...carouselSetting} fade={true} className='ps-carousel'>
          <img
            src='/static/img/slider/shop-default/banner.jpg'
            alt='martfury'
            onClick={() => router.push('/account/register')}
          />
        </Slider>
      </div>
      <div className='mobile'>
        <Slider {...carouselSetting} fade={true} className='ps-carousel'>
          <img
            src='/static/img/slider/shop-default/BANNER-MOBILE.jpg'
            alt='martfury'
            onClick={() => router.push('/account/register')}
          />
        </Slider>
      </div>
    </div>
  )
}

export default ShopBanner
