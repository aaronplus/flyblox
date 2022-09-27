import React from 'react'
import Link from 'next/link'

const MegaMenu = ({ source }) => {
  let megaContentView
  if (source) {
    megaContentView = source.subcategories.map(subItem => (
      <li key={subItem._id}>
        <Link href={`/category/${subItem._id}`}>
          <a>{subItem.name}</a>
        </Link>
      </li>
    ))
  }
  return (
    <li className='menu-item-has-children has-mega-menu'>
      {/* <Link href={source.url !== '' ? source.url : '/'}> */}
      <a>
        {/* {source.icon && <i className={source.icon}></i>} */}
        {source.name}
      </a>
      {/* </Link> */}
      <div className='mega-menu'>
        <div className='mega-menu__column' key={source._id}>
          <h4>{source.name}</h4>
          <ul className='mega-menu__list'>{megaContentView}</ul>
        </div>
      </div>
    </li>
  )
}

export default MegaMenu
