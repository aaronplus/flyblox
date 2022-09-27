import React from 'react'
import BreadCrumb from '~/components/elements/BreadCrumb'
import SellItem from '~/components/partials/account/SellItem'
import FooterDefault from '~/components/shared/footers/FooterDefault'
import Newletters from '~/components/partials/commons/Newletters'
import PageContainer from '~/components/layouts/PageContainer'
import { WithAuth } from '~/utilities/WithAuth'

const InvoicePage = () => {
  const breadCrumb = [
    {
      text: 'Home',
      url: '/'
    },
    {
      text: 'Sell Item'
    }
  ]
  return (
    <>
      <PageContainer footer={<FooterDefault />} title='Sell Item'>
        <div className='ps-page--my-account'>
          <BreadCrumb breacrumb={breadCrumb} />
          <SellItem />
        </div>
        <Newletters layout='container' />
      </PageContainer>
    </>
  )
}

export default WithAuth(InvoicePage)
