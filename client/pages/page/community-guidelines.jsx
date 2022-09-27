import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import CommunityGuidelines from '~/components/partials/page/CommunityGuidelines';
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
            text: 'Community Guidelines',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Community Guidelines">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <CommunityGuidelines />
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
};

export default Banditem;
