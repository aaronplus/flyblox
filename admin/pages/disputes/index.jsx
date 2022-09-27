import React, { useEffect, useState } from 'react'
import ContainerDefault from '~/components/layouts/ContainerDefault'
import TableDisputeItems from '~/components/shared/tables/TableDisputeItems'
import FormSearchSimple from '~/components/shared/forms/FormSearchSimple'
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard'
import { connect, useDispatch } from 'react-redux'
import { toggleDrawerMenu } from '~/store/app/action'

const DisputesPage = () => {
  const dispatch = useDispatch()
  const [title_contains, setTitle_contains] = useState('')

  useEffect(() => {
    dispatch(toggleDrawerMenu(false))
  }, [])
  return (
    <ContainerDefault title='Disputes'>
      <HeaderDashboard
        title='Disputes'
        description='Martfury Disputes Listing'
      />
      <section className='ps-items-listing'>
        <div className='ps-section__header simple'>
          <div className='ps-section__filter'>
            <FormSearchSimple onChange={setTitle_contains} />
          </div>
        </div>
        <div className='ps-section__content'>
          <TableDisputeItems title_contains={title_contains} />
        </div>
      </section>
    </ContainerDefault>
  )
}
export default connect((state) => state.app)(DisputesPage)
