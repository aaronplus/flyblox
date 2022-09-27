import React from 'react'
import BreadCrumb from '~/components/elements/BreadCrumb'
import PageContainer from '~/components/layouts/PageContainer'
import FooterDefault from '~/components/shared/footers/FooterDefault'
import Newletters from '~/components/partials/commons/Newletters'
import Disputes from '~/components/partials/account/disputes'
import { WithAuth } from '~/utilities/WithAuth'

const MyAccountPage = () => {
  const breadCrumb = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'Disputes',
    },
  ]
  return (
    <>
      <PageContainer footer={<FooterDefault />} title='My Account'>
        <div className='ps-page--my-account'>
          <BreadCrumb breacrumb={breadCrumb} />
          <Disputes />
        </div>
        <Newletters layout='container' />
      </PageContainer>
    </>
  )
}

export default WithAuth(MyAccountPage)
