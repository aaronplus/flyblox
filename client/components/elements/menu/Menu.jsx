import React from 'react'
import Link from 'next/link'
import MenuDropdown from '~/components/elements/menu/MenuDropdown'
import MegaMenu from '~/components/elements/menu/MegaMenu'

const Menu = ({ source, className }) => {
  // Views
  let menuView
  if (source && source.length > 0) {
    menuView = source.map(item => {
      if (item.hasSubcategories) {
        // return <MenuDropdown source={item} key={item.text} />
        // } else if (item.megaContent) {
        return <MegaMenu source={item} key={item._id} />
      } else {
        return (
          <li key={item._id}>
            <Link href={`/category/${item._id}`}>
              <a>
                {/* {item.icon && <i className={item.icon}></i>} */}
                {item.name}
              </a>
            </Link>
          </li>
        )
      }
    })
    // menuView = (
    //   <li>
    //     <a href='#' onClick={e => e.preventDefault()}>
    //       No menu item.
    //     </a>
    //   </li>
    // )
  } else {
    menuView = (
      <li>
        <a href='#' onClick={e => e.preventDefault()}>
          No menu item.
        </a>
      </li>
    )
  }
  return <ul className={className}>{menuView}</ul>
}

export default Menu
