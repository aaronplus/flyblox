import React from 'react'
import Head from 'next/head'
import HeaderDefault from '~/components/shared/headers/HeaderDefault'
import HeaderMobile from '~/components/shared/headers/HeaderMobile'
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth'

const initHeaders = (
  <>
    <HeaderDefault />
    <HeaderMobile />
  </>
)
const initFooters = (
  <>
    <FooterFullwidth />
  </>
)

const PageContainer = ({
  header = initHeaders,
  footer = initFooters,
  children,
  title = 'Page'
}) => {
  let titleView

  if (title !== '') {
    titleView = process.env.title + ' | ' + title
  } else {
    titleView = process.env.title + ' | ' + process.env.titleDescription
  }

  return (
    <>
      <Head>
        <title>{titleView}</title>
        <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyC7eTj6rs_o83ID5oAAjvWae26IpdUHieg&libraries=places'></script>
      </Head>
      {header}
      {children}
      {footer}
    </>
  )
}

export default PageContainer
