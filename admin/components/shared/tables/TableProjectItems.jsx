import React, { useState, useEffect } from "react";

import { Table } from "antd";
import useProduct from "~/hooks/useProduct";
import { useRouter } from "next/router";

const TableSoldItems = () => {
  const router = useRouter();

  const { loading, products, getProducts } = useProduct();
  useEffect(() => {
    getProducts();
  }, []);

  const [filterItems, setfilterItems] = useState(products);

  useEffect(() => {
    if (products) {
      setfilterItems(products);
    }
  }, [products]);

  const handleOk = async () => {
    await changeOrderStatus({ productId, orderItemId, action });
    getproducts();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setProductId("");
    setAction("");
    setOrderItemId("");
    setIsModalVisible(false);
  };

  const handleAction = (productId, orderItemId, action) => {
    setAction(action);
    setProductId(productId);
    setOrderItemId(orderItemId);
    setIsModalVisible(true);
  };

  const tableColumn = [
    {
      title: "Sr No.",
      key: "key",
      render: (text, record, index) => {
        return <p>{index + 1}</p>;
      },
    },
    {
      title: "Item",
      dataIndex: "name",
      key: "name",
      render: (product) => {
        return <p>{product}</p>;
      },
    },
    {
      title: "Selling Price",
      dataIndex: "sellingPrice",
      key: "sellingPrice",
      render: (sellingPrice) => {
        return <p>{sellingPrice}</p>;
      },
    },
    {
      title: "Shipping Charges",
      dataIndex: "shippingCharges",
      key: "shippingCharges",
      render: (shippingCharges) => {
        return <p>{shippingCharges}</p>;
      },
    },
    {
      title: "Serial No.",
      dataIndex: "productSerialNo",
      key: "productSerialNo",
      render: (productSerialNo) => {
        return <p>{productSerialNo}</p>;
      },
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      render: (sku) => {
        return <p>{sku}</p>;
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (orderId, record) => (
        <div className="table-btn-wd">
          <button
            className="ps-btn ps-btn--reverse ps-btn--sm mb-2"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Edit
          </button>
          <button
            className="ps-btn ps-btn--sm mb-2"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12 col-12 ">
          <div className="ps-form__left">
            <p>Search List</p>
          </div>
        </div>
        <div className="col-12 ">
          <input
            className="form-control"
            type="text"
            placeholder="Search By Product Name"
          />
        </div>
      </div>

      <Table columns={tableColumn} dataSource={filterItems} />
    </>
  );
};

export default TableSoldItems;
