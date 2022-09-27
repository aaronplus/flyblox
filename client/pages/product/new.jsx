import React from "react";
import FooterDefault from "~/components/shared/footers/FooterDefault";
import BreadCrumb from "~/components/elements/BreadCrumb";
import Newletters from "~/components/partials/commons/Newletters";
import PageContainer from "~/components/layouts/PageContainer";
import ProductAddForm from "~/components/partials/product/ProductAddForm";

const New = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Add Product",
    },
  ];

  return (
    <PageContainer footer={<FooterDefault />} title="Vendor store">
      <BreadCrumb breacrumb={breadCrumb} />
      <div className="ps-page--product">
        <ProductAddForm />
      </div>
      <Newletters layout="container" />
    </PageContainer>
  );
};

export default New;
