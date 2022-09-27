import React, { useEffect, useState } from 'react'
import useLandingPage from '~/hooks/useLandingPages'
import { Table } from 'antd'
import LandingPageRepository from '~/repositories/LandingPageRepository'
import { removeLandingPage, setLandingPage } from '~/store/landingPages/action'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'antd/lib/modal/Modal'
import { useRouter } from 'next/router'

const TableCustomerItems = ({ title_contains }) => {
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(async () => {
        const res = await LandingPageRepository.getLandingPages({ title_contains })
        if (res) {
            dispatch(setLandingPage(res.data.data))
        }
    }, [title_contains])

    const { thumbnailImage } = useLandingPage()
    const landingPages = useSelector(state => state.landingPage.landingPage)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [deleteLandingPageId, setdeleteLandingPageId] = useState('')

    const handleOk = async () => {
        dispatch(removeLandingPage(deleteLandingPageId))
        setIsModalVisible(false)
    }
    const handleCancel = () => {
        setdeleteLandingPageId('')
        setIsModalVisible(false)
    }
    const tableColumn = [
        // {
        //     title: 'Sr No.',
        //     key: '_id',
        //     render: (text, record, index) => {
        //         return <p>{index + 1}</p>
        //     }
        // },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: value => {
                return <p>{value}</p>
            }
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
            render: value => {
                return <p>{value ? value : '-'}</p>
            }
        },
        // {
        //     title: 'Register Panel Background',
        //     dataIndex: 'register_panel_background',
        //     key: 'register_panel_background',
        //     render: register_panel_background => {
        //         return <div>{register_panel_background ? thumbnailImage(register_panel_background) : 'No Panel Background'}</div>
        //     }
        // },
        // {
        //     title: 'Register Form Location',
        //     dataIndex: 'register_form_location',
        //     key: 'register_form_location',
        //     render: value => {
        //         return <p>{value}</p>
        //     }
        // },
        // {
        //     title: 'Register Button Colour',
        //     dataIndex: 'register_button_colour',
        //     key: 'register_button_colour',
        //     render: value => {
        //         return <p>{value}</p>
        //     }
        // },
        // {
        //     title: 'Register Button Label',
        //     dataIndex: 'register_button_label',
        //     key: 'register_button_label',
        //     render: value => {
        //         return <p>{value}</p>
        //     }
        // },
        {
            title: 'Action',
            dataIndex: '_id',
            key: '_id',
            render: id => {
                return (
                    <div className='table-btn-wd'>
                        <button
                            className='ps-btn ps-btn--reverse ps-btn--sm mb-2'
                            onClick={e => {
                                e.stopPropagation()
                                router.push(`/landingpages/${id}`)
                            }}
                        >
                            Edit
                        </button>
                        <button
                            className='ps-btn ps-btn--sm mb-2'
                            onClick={e => {
                                e.stopPropagation()
                                setIsModalVisible(true)
                                setdeleteLandingPageId(id)
                            }}
                        >
                            Delete
                        </button>
                    </div>
                )
            }
        }
    ]

    return (
        <div className='table-responsive'>
            <Table columns={tableColumn} dataSource={landingPages ? landingPages : []} />
            <Modal
                title={'RemoveToken'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='Yes'
                cancelText='No'
            >
                <p>Are you sure to Delete Landing Page?</p>
            </Modal>
        </div>
    )
}

export default TableCustomerItems
