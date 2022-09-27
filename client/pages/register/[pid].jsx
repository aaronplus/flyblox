import React, { useEffect, useState } from 'react'
import Register from "~/components/partials/register/RegisterPanel";
import { useRouter } from 'next/router'
import { connect, useDispatch } from 'react-redux'
const RegisterPage = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { pid } = router.query
    // useEffect(() => {
    //     dispatch({
    //         type: 'GET_LANDING_PAGE_ACC_TO_SLUG',
    //         payload: { slug: pid }
    //     })
    //     // getLandingPage(slug);
    // }, [pid]);
    return (
        <>

            <div className="ps-page--my-account">
                {pid ? <Register slug={pid} /> : ''}
            </div>
        </>
    );
};

export default RegisterPage;