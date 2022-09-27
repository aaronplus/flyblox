import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import BandItem from '~/components/partials/page/BandItem';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import PageContainer from '~/components/layouts/PageContainer';

const Banditem = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Band Item',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Band Item">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <BandItem />
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
};

export default Banditem;
