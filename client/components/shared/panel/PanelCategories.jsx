import React, { Component, useEffect } from 'react'
import { Menu, Spin } from 'antd'
import Link from 'next/link'
// import categories from '../../../public/static/data/static-categories.json';
import useGetCategories from '~/hooks/useGetCategories'
import router from 'next/router'

const { SubMenu } = Menu

const PanelCategories = ({ onClose }) => {
  // rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  // state = {
  //     openKeys: ['sub1'],
  // };
  const { categories, loading, getCategories } = useGetCategories()

  useEffect(() => {
    getCategories()
  }, [])

  // onOpenChange = openKeys => {
  //     const latestOpenKey = openKeys.find(
  //         key => this.state.openKeys.indexOf(key) === -1
  //     );
  //     if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
  //         this.setState({ openKeys });
  //     } else {
  //         this.setState({
  //             openKeys: latestOpenKey ? [latestOpenKey] : [],
  //         });
  //     }
  // };

  // render() {
  return (
    <>
      {loading == false && categories != null ? (
        <Menu
          mode='inline'
          //   openKeys={this.state.openKeys}
          //   onOpenChange={this.onOpenChange}
        >
          {categories.map(category => (
            <Menu.Item
              key={category._id}
              onClick={() => {
                router.push(`/category/${category._id}`)
                onClose()
              }}
            >
              <a>{category.name}</a>
            </Menu.Item>
          ))}
        </Menu>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '1rem'
          }}
        >
          <Spin />
        </div>
      )}
    </>
  )
}
// }

export default PanelCategories
