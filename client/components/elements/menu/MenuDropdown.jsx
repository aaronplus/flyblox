import React from 'react'
import Link from 'next/link'

const MenuDropdown = ({ source }) => {
  return (
    <li className='menu-item-has-children dropdown'>
      {
        <Link href={`/category/${item._id}`}>
          <a>{source.name}</a>
        </Link>
      }
      {source.subcategories && (
        <ul className={source.subClass}>
          {source.subcategories.map((subMenuItem, index) => (
            <MenuDropdown source={subMenuItem} key={index} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default MenuDropdown
