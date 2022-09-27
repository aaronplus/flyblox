import React from 'react'

import BreadCrumb from '~/components/elements/BreadCrumb'
import ForgotPassword from '~/components/partials/account/ForgotPassword'
import PageContainer from '~/components/layouts/PageContainer'
import FooterDefault from '~/components/shared/footers/FooterDefault'
import Newletters from '~/components/partials/commons/Newletters'

const ForgotPasswordPage = () => {
  const breadCrumb = [
    {
      text: 'Home',
      url: '/'
    },
    {
      text: 'Forgot Password'
    }
  ]
  return (
    <>
      <PageContainer footer={<FooterDefault />} title='Forgot Password'>
        <div className='ps-page--my-account'>
          <BreadCrumb breacrumb={breadCrumb} />
          <ForgotPassword />
        </div>
        <Newletters layout='container' />
      </PageContainer>
    </>
  )
}

export default ForgotPasswordPage
