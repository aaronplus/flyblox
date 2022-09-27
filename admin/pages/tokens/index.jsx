import React, { useEffect, useState } from 'react'
import ContainerDefault from '~/components/layouts/ContainerDefault'
import Pagination from '~/components/elements/basic/Pagination'
import TableTokenItems from '~/components/shared/tables/TableTokenItems'
import FormSearchSimple from '~/components/shared/forms/FormSearchSimple'
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard'
import { connect, useDispatch } from 'react-redux'
import { toggleDrawerMenu } from '~/store/app/action'
import FormCreateToken from '~/components/shared/forms/FormCreateToken'

const CustomersPage = () => {
  const dispatch = useDispatch()
  const [title_contains, setTitle_contains] = useState('')

  useEffect(() => {
    dispatch(toggleDrawerMenu(false))
  }, [])
  return (
    <ContainerDefault>
      <HeaderDashboard
        title='Categories'
        description='Martfury Category Listing'
      />
      <section className='ps-dashboard ps-items-listing'>
        <div className='ps-section__left'>
          <div className='ps-section__header'>
            <FormSearchSimple onChange={setTitle_contains} />
          </div>
          <div className='ps-section__content'>
            <TableTokenItems title_contains={title_contains} />
            {/* <div className="ps-section__footer">
              <p>Show 5 in 30 items.</p>
              <Pagination />
            </div> */}
          </div>
        </div>
        <div className='ps-section__right'>
          <FormCreateToken />
        </div>
      </section>
    </ContainerDefault>
  )
}
export default connect(state => state.app)(CustomersPage)
