import React from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import PageContainer from "~/components/layouts/PageContainer";
import FooterDefault from "~/components/shared/footers/FooterDefault";
import Newletters from "~/components/partials/commons/Newletters";
import SoldItems from "~/components/partials/account/sold-items";
import { WithAuth } from '~/utilities/WithAuth'

const MyAccountPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Sold Items",
    },
  ];
  return (
    <>
      <PageContainer footer={<FooterDefault />} title="My Account">
        <div className="ps-page--my-account">
          <BreadCrumb breacrumb={breadCrumb} />
          <SoldItems />
        </div>
        <Newletters layout="container" />
      </PageContainer>
    </>
  );
};

export default WithAuth(MyAccountPage);
