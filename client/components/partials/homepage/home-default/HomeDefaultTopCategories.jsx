import React, { useEffect } from 'react'
import Link from 'next/link'
import useGetCategories from '~/hooks/useGetCategories'
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct'
import { generateTempArray } from '~/utilities/common-helpers'
import { baseURL } from '~/endpoints'
const HomeDefaultTopCategories = () => {
  const { categories, loading, getCategories } = useGetCategories()

  useEffect(() => {
    getCategories()
  }, [])

  let categoryItems
  if (!loading) {
    if (categories && categories.length > 0) {
      categoryItems = categories.map(item => (
        <div
          className='col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6'
          key={item._id}
        >
          <div className='ps-block--category'>
            <Link href='/shop/shop-sidebar-without-banner'>
              <a className='ps-block__overlay'></a>
            </Link>
            <img
              src={baseURL + '/' + item.thumbnail}
              alt='martfury'
              width={100}
              height={100}
            />
            <p>{item.name}</p>
          </div>
        </div>
      ))
    } else {
      categoryItems = <p>No Category found.</p>
    }
  } else {
    categoryItems = generateTempArray(6).map(item => (
      <div className='col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6' key={item}>
        <SkeletonProduct />
      </div>
    ))
  }

  return (
    <div className='ps-top-categories'>
      <div className='ps-container'>
        <h3>Top categories of the month</h3>
        <div className='row'>
          {categoryItems}
          {/* <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
            <div className="ps-block--category">
              <Link href="/shop">
                <a className="ps-block__overlay"></a>
              </Link>
              <img src="/static/img/categories/1.jpg" alt="martfury" />
              <p>Electronics</p>
            </div>
          </div> */}
          {/* <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
            <div className="ps-block--category">
              <Link href="/shop">
                <a className="ps-block__overlay"></a>
              </Link>
              <img src="/static/img/categories/2.jpg" alt="martfury" />
              <p>Clothings</p>
            </div>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
            <div className="ps-block--category">
              <Link href="/shop">
                <a className="ps-block__overlay"></a>
              </Link>
              <img src="/static/img/categories/3.jpg" alt="martfury" />
              <p>Computers</p>
            </div>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
            <div className="ps-block--category">
              <Link href="/shop">
                <a className="ps-block__overlay"></a>
              </Link>
              <img src="/static/img/categories/4.jpg" alt="martfury" />
              <p>Home & Kitchen</p>
            </div>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
            <div className="ps-block--category">
              <Link href="/shop">
                <a className="ps-block__overlay"></a>
              </Link>
              <img src="/static/img/categories/5.jpg" alt="martfury" />
              <p>Health & Beauty</p>
            </div>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
            <div className="ps-block--category">
              <Link href="/shop">
                <a className="ps-block__overlay"></a>
              </Link>
              <img src="/static/img/categories/6.jpg" alt="martfury" />
              <p>Health & Beauty</p>
            </div>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
            <div className="ps-block--category">
              <Link href="/shop">
                <a className="ps-block__overlay"></a>
              </Link>
              <img src="/static/img/categories/7.jpg" alt="martfury" />
              <p>Jewelry & Watch</p>
            </div>
          </div> */}
          {/* <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
            <div className="ps-block--category">
              <Link href="/shop">
                <a className="ps-block__overlay"></a>
              </Link>
              <img src="/static/img/categories/8.jpg" alt="martfury" />
              <p>Technology Toys</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default HomeDefaultTopCategories
