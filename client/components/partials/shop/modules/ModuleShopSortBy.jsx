import React from 'react'

const ModuleShopSortBy = ({ handleFilter }) => {
  const onChange = event => {
    handleFilter(event.target.value)
  }
  return (
    <select
      className='ps-select form-control'
      data-placeholder='Sort Items'
      onChange={onChange}
    >
      <option value='latest'>Sort by latest</option>
      {/* <option value='2'>Sort by popularity</option> */}
      {/* <option>Sort by average rating</option> */}
      <option value='ascending'>Sort by price: low to high</option>
      <option value='descending'>Sort by price: high to low</option>
    </select>
  )
}

export default ModuleShopSortBy
