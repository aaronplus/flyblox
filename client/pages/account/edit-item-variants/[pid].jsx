import React from 'react'
import BreadCrumb from '~/components/elements/BreadCrumb'
import PageContainer from '~/components/layouts/PageContainer'
import FooterDefault from '~/components/shared/footers/FooterDefault'
import Newletters from '~/components/partials/commons/Newletters'
import { useRouter } from 'next/router'
import EditVariants from '~/components/partials/account/EditVariants'

const Varaints = () => {
  const router = useRouter()
  const { pid } = router.query
  const breadCrumb = [
    {
      text: 'Home',
      url: '/'
    },
    {
      text: 'Edit Item Images'
    }
  ]
  return (
    <>
      <PageContainer footer={<FooterDefault />} title='Edit Item'>
        <div className='ps-page--my-account'>
          <BreadCrumb breacrumb={breadCrumb} />
          <EditVariants id={pid} />
        </div>
        <Newletters layout='container' />
      </PageContainer>
    </>
  )
}

export default Varaints
