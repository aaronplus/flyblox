import React from 'react'
import FooterDefault from '~/components/shared/footers/FooterDefault'
import BreadCrumb from '~/components/elements/BreadCrumb'
import Newletters from '~/components/partials/commons/Newletters'
import PageContainer from '~/components/layouts/PageContainer'
import ProductEditForm from '~/components/partials/product/ProductEditForm'
import { useRouter } from 'next/router'

const Edit = () => {
  const router = useRouter()
  const { pid } = router.query

  const breadCrumb = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'Edit Product',
    },
  ]

  return (
    <PageContainer footer={<FooterDefault />} title='Vendor store'>
      <BreadCrumb breacrumb={breadCrumb} />
      <div className='ps-page--product'>
        {pid ? <ProductEditForm id={pid} /> : <div>Loading...</div>}
      </div>
      <Newletters layout='container' />
    </PageContainer>
  )
}

export default Edit
