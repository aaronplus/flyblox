import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Spin } from 'antd'
import ProductRepository from '~/repositories/ProductRepository'
import ProductSearchResult from '~/components/elements/products/ProductSearchResult'
import useGetCategories from '~/hooks/useGetCategories'
import { set } from 'js-cookie'

const exampleCategories = [
  'All',
  'Babies & Moms',
  'Books & Office',
  'Cars & Motocycles',
  'Clothing & Apparel',
  ' Accessories',
  'Bags',
  'Kid’s Fashion',
  'Mens',
  'Shoes',
  'Sunglasses',
  'Womens',
  'Computers & Technologies',
  'Desktop PC',
  'Laptop',
  'Smartphones',
  'Consumer Electrics',
  'Air Conditioners',
  'Accessories',
  'Type Hanging Cell',
  'Audios & Theaters',
  'Headphone',
  'Home Theater System',
  'Speakers',
  'Car Electronics',
  'Audio & Video',
  'Car Security',
  'Radar Detector',
  'Vehicle GPS',
  'Office Electronics',
  'Printers',
  'Projectors',
  'Scanners',
  'Store & Business',
  'Refrigerators',
  'TV Televisions',
  '4K Ultra HD TVs',
  'LED TVs',
  'OLED TVs',
  'Washing Machines',
  'Type Drying Clothes',
  'Type Horizontal',
  'Type Vertical',
  'Garden & Kitchen',
  'Cookware',
  'Decoration',
  'Furniture',
  'Garden Tools',
  'Home Improvement',
  'Powers And Hand Tools',
  'Utensil & Gadget',
  'Health & Beauty',
  'Equipments',
  'Hair Care',
  'Perfumer',
  'Wine Cabinets'
]

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

const SearchHeader = () => {
  const inputEl = useRef(null)
  const [isSearch, setIsSearch] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('all')
  const [resultItems, setResultItems] = useState(null)
  const [loadingSearch, setLoadingSearch] = useState(false)
  const debouncedSearchTerm = useDebounce(keyword, 300)
  const { categories, loading, getCategories } = useGetCategories()

  useEffect(() => {
    getCategories()
  }, [])

  function handleClearKeyword() {
    setKeyword('')
    setIsSearch(false)
    setLoadingSearch(false)
  }

  function onCategoryChange(event) {
    setKeyword('')
    setIsSearch(false)
    setCategory(event.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    setIsSearch(false)
    Router.push(`/search?keyword=${keyword}&category=${category}`)
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoadingSearch(true)
      if (keyword) {
        const queries = {
          limit: 5,
          title_contains: keyword,
          category: category
        }
        const products = ProductRepository.getProductsByPagination(queries)
        products.then(result => {
          setLoadingSearch(false)
          setResultItems(result)
          setIsSearch(true)
        })
      } else {
        setIsSearch(false)
        setKeyword('')
      }
      if (loadingSearch) {
        setIsSearch(false)
      }
    } else {
      setLoadingSearch(false)
      setIsSearch(false)
    }
  }, [debouncedSearchTerm])

  // Views
  let productItemsView,
    clearTextView,
    selectOptionView,
    loadingView,
    loadMoreView
  if (!loadingSearch) {
    if (resultItems && resultItems.length > 0) {
      if (resultItems.length > 5) {
        loadMoreView = (
          <div className='ps-panel__footer text-center'>
            <Link href='/search'>
              <a>See all results</a>
            </Link>
          </div>
        )
      }
      productItemsView = resultItems.map(product => (
        <ProductSearchResult product={product} key={product.id} />
      ))
    } else {
      productItemsView = <p>No product found.</p>
    }
    if (keyword !== '') {
      clearTextView = (
        <span className='ps-form__action' onClick={handleClearKeyword}>
          <i className='icon icon-cross2'></i>
        </span>
      )
    }
  } else {
    loadingView = (
      <span className='ps-form__action'>
        <Spin size='small' />
      </span>
    )
  }

  if (loading === false && categories && categories.length > 0) {
    selectOptionView = categories.map(option => (
      <option value={option._id} key={option._id}>
        {option.name}
      </option>
    ))
  }

  return (
    <form
      className='ps-form--quick-search'
      method='get'
      action='/'
      onSubmit={handleSubmit}
    >
      <div className='ps-form__categories'>
        <select className='form-control' onChange={onCategoryChange}>
          <option value={'all'} key={1}>
            All
          </option>
          {selectOptionView}
        </select>
      </div>
      <div className='ps-form__input'>
        <input
          ref={inputEl}
          className='form-control'
          type='text'
          value={keyword}
          placeholder="I'm shopping for..."
          onChange={e => setKeyword(e.target.value)}
        />
        {clearTextView}
        {loadingView}
      </div>
      <button onClick={handleSubmit}>Search</button>
      <div className={`ps-panel--search-result${isSearch ? ' active ' : ''}`}>
        <div className='ps-panel__content'>{productItemsView}</div>
        {loadMoreView}
      </div>
    </form>
  )
}

export default SearchHeader
