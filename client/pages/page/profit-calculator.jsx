import React from 'react'
import BreadCrumb from '~/components/elements/BreadCrumb'
import FooterDefault from '~/components/shared/footers/FooterDefault'
import PageContainer from '~/components/layouts/PageContainer'
import Newletters from '~/components/partials/commons/Newletters'
import ProfitCalculator from '~/components/partials/page/ProfitCalculator'

const ContactUsPage = () => {
  const breadCrumb = [
    {
      text: 'Home',
      url: '/'
    },
    {
      text: 'Profit Calculator'
    }
  ]

  return (
    <PageContainer footer={<FooterDefault />} title='Contact Us'>
      <div className='ps-page--single' id='contact-us'>
        <BreadCrumb breacrumb={breadCrumb} />
        <ProfitCalculator />
      </div>
      <Newletters layout='container' />
    </PageContainer>
  )
}

export default ContactUsPage
