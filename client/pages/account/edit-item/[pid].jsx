import React from 'react'
import BreadCrumb from '~/components/elements/BreadCrumb'
import PageContainer from '~/components/layouts/PageContainer'
import FooterDefault from '~/components/shared/footers/FooterDefault'
import Newletters from '~/components/partials/commons/Newletters'
import EditItem from '~/components/partials/account/EditItem'
import { useRouter } from 'next/router'

const AccountNotificationsPage = () => {
  const router = useRouter()
  const { pid } = router.query
  const breadCrumb = [
    {
      text: 'Home',
      url: '/'
    },
    {
      text: 'Edit Item'
    }
  ]
  return (
    <>
      <PageContainer footer={<FooterDefault />} title='Edit Item'>
        <div className='ps-page--my-account'>
          <BreadCrumb breacrumb={breadCrumb} />
          <EditItem id={pid} />
        </div>
        <Newletters layout='container' />
      </PageContainer>
    </>
  )
}

export default AccountNotificationsPage
