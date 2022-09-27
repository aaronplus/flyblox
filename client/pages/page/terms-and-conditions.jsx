import React from 'react'
import BreadCrumb from '~/components/elements/BreadCrumb'
import TermsAndConditions from '~/components/partials/page/TermsAndConditions'
import FooterDefault from '~/components/shared/footers/FooterDefault'
import Newletters from '~/components/partials/commons/Newletters'
import PageContainer from '~/components/layouts/PageContainer'

const TermsAndConditionsPage = () => {
  const breadCrumb = [
    {
      text: 'Home',
      url: '/'
    },
    {
      text: 'Terms And Conditions'
    }
  ]

  return (
    <PageContainer footer={<FooterDefault />} title='terms and conditions'>
      <div className='ps-page--single'>
        <BreadCrumb breacrumb={breadCrumb} layout='fullwidth' />
        <TermsAndConditions />
      </div>
      <Newletters layout='container' />
    </PageContainer>
  )
}

export default TermsAndConditionsPage
