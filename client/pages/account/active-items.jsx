import React from 'react'
import BreadCrumb from '~/components/elements/BreadCrumb'
import ActiveItems from '~/components/partials/account/ActiveItems'
import PageContainer from '~/components/layouts/PageContainer'
import FooterDefault from '~/components/shared/footers/FooterDefault'
import Newletters from '~/components/partials/commons/Newletters'
import { WithAuth } from '~/utilities/WithAuth'

const AccountNotificationsPage = () => {
  const breadCrumb = [
    {
      text: 'Home',
      url: '/'
    },
    {
      text: 'Active Items'
    }
  ]
  return (
    <>
      <PageContainer footer={<FooterDefault />} title='Active Items'>
        <div className='ps-page--my-account'>
          <BreadCrumb breacrumb={breadCrumb} />
          <ActiveItems />
        </div>
        <Newletters layout='container' />
      </PageContainer>
    </>
  )
}

export default WithAuth(AccountNotificationsPage)
