import React from 'react'

import BreadCrumb from '~/components/elements/BreadCrumb'
import ComingSoon from '~/components/partials/page/ComingSoon'
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
      text: 'Coming Soon'
    }
  ]
  return (
    <PageContainer footer={<FooterDefault />} title='Coming Soon'>
      <div className='ps-page--single'>
        <BreadCrumb breacrumb={breadCrumb} />
        <ComingSoon />
      </div>
      <Newletters layout='container' />
    </PageContainer>
  )
}
export default AboutUsPage
