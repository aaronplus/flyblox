import React from 'react'

import BreadCrumb from '~/components/elements/BreadCrumb'
import Fees from '~/components/partials/page/Fees'
import FooterDefault from '~/components/shared/footers/FooterDefault'
import Newletters from '~/components/partials/commons/Newletters'
import PageContainer from '~/components/layouts/PageContainer'

const AboutUsPage = () => {
  const breadCrumb = [
    {
      text: 'Home',
      url: '/'
    },
    {
      text: 'Fees'
    }
  ]
  return (
    <PageContainer footer={<FooterDefault />} title='Fees'>
      <div className='ps-page--single'>
        <BreadCrumb breacrumb={breadCrumb} />
        <Fees />
      </div>
      <Newletters layout='container' />
    </PageContainer>
  )
}
export default AboutUsPage
