import React, { useEffect } from 'react'
import menuData from '~/public/static/data/menu.json'
import Menu from '~/components/elements/menu/Menu'
import useGetCategories from '~/hooks/useGetCategories'

const MenuCategoriesDropdown = () => {
    const { categories, loading, getCategories } = useGetCategories()

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className="menu--product-categories">
            <div className="menu__toggle">
                <i className="icon-menu"></i>
                <span>Browser Categories</span>
            </div>
            <div className="menu__content">
                <Menu
                    source={loading === false ? categories : []}
                    // source={menuData.product_categories}
                    className="menu--dropdown"
                />
            </div>
        </div>
    )
}

export default MenuCategoriesDropdown
