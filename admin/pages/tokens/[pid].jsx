import React, { useEffect } from 'react'
import ContainerDefault from '~/components/layouts/ContainerDefault'
import FormEditToken from '~/components/shared/forms/FormEditToken'
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard'
import { connect, useDispatch } from 'react-redux'
import { toggleDrawerMenu } from '~/store/app/action'
import { useRouter } from 'next/router'

const TokenPage = () => {
  const router = useRouter()
  const { pid } = router.query
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(toggleDrawerMenu(false))
  }, [])

  return (
    <ContainerDefault>
      <HeaderDashboard title='Token' description='Martfury Token Listing' />
      <section className='ps-dashboard ps-items-listing'>
        <div className='ps-section__content'>
          {pid ? <FormEditToken id={pid} /> : ''}
        </div>
      </section>
    </ContainerDefault>
  )
}

export default connect(state => state.app)(TokenPage)
