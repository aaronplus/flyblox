import React, { useEffect, useState } from 'react'
import ContainerDefault from '~/components/layouts/ContainerDefault'
import Pagination from '~/components/elements/basic/Pagination'
import TableLandingPages from '~/components/shared/tables/TableLandingPages'
import HeaderDashboard from '~/components/shared/headers/HeaderDashboard'
import FormSearchSimple from '~/components/shared/forms/FormSearchSimple'
import { connect, useDispatch } from 'react-redux'
import { toggleDrawerMenu } from '~/store/app/action'
import FormCreateLadingPages from '~/components/shared/forms/FormCreateLandingPages'
const LandingPage = () => {
    const dispatch = useDispatch()
    const [title_contains, setTitle_contains] = useState('')
    useEffect(() => {
        dispatch(toggleDrawerMenu(false))
    }, [])
    return (
        <ContainerDefault>
            <HeaderDashboard
                title='landingPages'
                description='Martfury Category Listing'
            />
            <section className='ps-dashboard ps-items-listing'>
                <div className='ps-section__left'>
                    <div className='ps-section__header'>
                        <FormSearchSimple onChange={setTitle_contains} />
                    </div>
                    <div className='ps-section__content'>
                        <TableLandingPages title_contains={title_contains} />
                    </div>
                </div>
                <div className='ps-section__right'>
                    <FormCreateLadingPages />
                </div>
            </section>
        </ContainerDefault>
    )
}
export default connect(state => state.app)(LandingPage)
