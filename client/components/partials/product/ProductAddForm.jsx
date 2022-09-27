import React, { useEffect } from "react";
import {
  Button,
  Cascader,
  Form,
  Input,
  notification,
  Radio,
  Select,
  Space,
  Upload,
} from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import {
  CameraTwoTone,
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "~/store/product/action";
import useGetCategories from "~/hooks/useGetCategories";
import Countries from "~/utilities/countries.json";
import ProductRepository from "~/repositories/ProductRepository";

const ProductAddForm = () => {
  const dispatch = useDispatch();
  const [loadingImage, setLoadingImage] = useState(false);
  const [mainImage, setMainImage] = useState();
  const [additionalImage1, setAdditionalImage1] = useState();
  const [additionalImage2, setAdditionalImage2] = useState();
  const [additionalImage3, setAdditionalImage3] = useState();
  const [additionalImage4, setAdditionalImage4] = useState();
  const [additionalImage5, setAdditionalImage5] = useState();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [loadingCurrent, setLoading] = useState(false);

  const [form] = Form.useForm();
  const [freeShipping, setFreeShipping] = useState(false);
  const [freeInternationalShipping, setFreeInternationalShipping] = useState(false);
  const [ShipInternational, setShipInternational] = useState(false);
  const { categories, loading, getCategories } = useGetCategories();

  async function getLatestProduct() {
    setLoading(true);
    const responseData = await ProductRepository.getLatestProduct();
    if (responseData) {
      setProduct(responseData.product);
      setCategory(responseData.category);
    }
    setLoading(false);
  }

  useEffect(() => {
    getCategories();
    getLatestProduct();
  }, []);

  let options = [];
  if (loading == false) {
    options = categories;
  }

  const uploadButton = (
    <div>
      {loadingImage ? (
        <LoadingOutlined />
      ) : (
        <CameraTwoTone twoToneColor="#fcb800" />
      )}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      modalNotification("error", "You can only upload JPG/PNG file!");
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      modalNotification("error", "Image must be smaller than 2MB!");
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const modalNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const urlConverter = (file) => {
    return URL.createObjectURL(file);
  };

  const handleMainFileChange = (info) => {
    if (info.file.status === "uploading") {
      setLoadingImage(true);
      return;
    }
    if (info.file.status === "done") {
      setLoadingImage(false);
      setMainImage(info.file.originFileObj);
    }
  };

  const handleAdditionalFile1Change = (info) => {
    if (info.file.status === "uploading") {
      setLoadingImage(true);
      return;
    }
    if (info.file.status === "done") {
      setLoadingImage(false);
      setAdditionalImage1(info.file.originFileObj);
    }
  };

  const handleAdditionalFile2Change = (info) => {
    if (info.file.status === "uploading") {
      setLoadingImage(true);
      return;
    }
    if (info.file.status === "done") {
      setLoadingImage(false);
      setAdditionalImage2(info.file.originFileObj);
    }
  };
  const handleAdditionalFile3Change = (info) => {
    if (info.file.status === "uploading") {
      setLoadingImage(true);
      return;
    }
    if (info.file.status === "done") {
      setLoadingImage(false);
      setAdditionalImage3(info.file.originFileObj);
    }
  };

  const handleAdditionalFile4Change = (info) => {
    if (info.file.status === "uploading") {
      setLoadingImage(true);
      return;
    }
    if (info.file.status === "done") {
      setLoadingImage(false);
      setAdditionalImage4(info.file.originFileObj);
    }
  };

  const handleAdditionalFile5Change = (info) => {
    if (info.file.status === "uploading") {
      setLoadingImage(true);
      return;
    }
    if (info.file.status === "done") {
      setLoadingImage(false);
      setAdditionalImage5(info.file.originFileObj);
    }
  };

  const handleSubmit = async (values) => {
    if (!window.ethereum?.selectedAddress) {
      modalNotification("error", "Please Connect To Wallet");
    } else if (mainImage) {
      let data = new FormData();
      for (var key in values) {
        if (key === "attributes" || key === "category") {
          if (key === "attributes" && values[key]) {
            let error = false;
            values[key].map((item) => {
              if (item.options === undefined) {
                error = true;
              }
            });
            if (error) {
              modalNotification(
                "error",
                "Attribute should contain atleast one option"
              );
              return null;
            } else {
              data.append(key, JSON.stringify(values[key]));
            }
          } else if (key === "category") {
            let value = values[key];
            data.delete("category");
            data.append("category", value[value.length - 1]);
          }
        } else {
          if (values[key]) {
            data.append(key, values[key]);
          }
        }
      }
      if (mainImage) {
        data.append("mainImage", mainImage);
      }
      if (additionalImage1) {
        data.append("additionalImage1", additionalImage1);
      }
      if (additionalImage2) {
        data.append("additionalImage2", additionalImage2);
      }
      if (additionalImage3) {
        data.append("additionalImage3", additionalImage3);
      }
      if (additionalImage4) {
        data.append("additionalImage4", additionalImage4);
      }
      if (additionalImage5) {
        data.append("additionalImage5", additionalImage5);
      }
      dispatch(addProduct(data));
    } else {
      modalNotification("error", "Main Image is required");
    }
  };

  const handleFreeShippinng = () => {
    let val = form.getFieldValue("freeShipping");
    setFreeShipping(!val);
    // if (form.getFieldValue("shippingCharges")){
    form.setFieldsValue({ shippingCharges: 0, freeShipping: !val });
    // }
  };

  const handleFreeInternationalShippinng = () => {
    let val = form.getFieldValue("freeInternationalShipping");
    setFreeInternationalShipping(!val);
    // if (form.getFieldValue("shippingCharges")){
    form.setFieldsValue({ internationalshippingCharges: 0, freeInternationalShipping: !val });
    // }
  };

  const ShipInternationally = (value) => {
    setShipInternational(value.target.value)
  }
  return (
    // <div className='container'>
    //   <div className='ps-section__wrapper'>
    <>
      {!loadingCurrent && (
        <div>
          <Form className="ps-form--add" form={form} onFinish={handleSubmit}>
            {/* <div className='ps-section__header'>
          <h3>Add Product</h3>
        </div> */}
            <div className="form-group">
              <label>Product Name</label>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input product name!",
                  },
                ]}
              >
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Product Name"
                />
              </Form.Item>
            </div>
            <div className="upload">
              <div className="form-group" style={{ flex: 0.2 }}>
                <label>Main Image</label>
                <Upload
                  name="mainImage"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleMainFileChange}
                >
                  {mainImage ? (
                    <img
                      src={urlConverter(mainImage)}
                      alt="avatar"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>
              <div className="form-group">
                <label>Additional Images</label>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <div>
                    <Upload
                      style={{ width: "100" }}
                      name="additionalImage1"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleAdditionalFile1Change}
                    >
                      {additionalImage1 ? (
                        <img
                          src={urlConverter(additionalImage1)}
                          alt="avatar"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </div>
                  <div>
                    <Upload
                      name="additionalImage2"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleAdditionalFile2Change}
                    >
                      {additionalImage2 ? (
                        <img
                          src={urlConverter(additionalImage2)}
                          alt="avatar"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </div>

                  <div>
                    <Upload
                      name="additionalImage3"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleAdditionalFile3Change}
                    >
                      {additionalImage3 ? (
                        <img
                          src={urlConverter(additionalImage3)}
                          alt="avatar"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </div>
                  <div>
                    <Upload
                      name="additionalImage4"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleAdditionalFile4Change}
                    >
                      {additionalImage4 ? (
                        <img
                          src={urlConverter(additionalImage4)}
                          alt="avatar"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </div>
                  <div>
                    <Upload
                      name="additionalImage5"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleAdditionalFile5Change}
                    >
                      {additionalImage5 ? (
                        <img
                          src={urlConverter(additionalImage5)}
                          alt="avatar"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Category</label>
              {category ? (
                <Form.Item
                  id="categoryCascader"
                  name="category"
                  initialValue={[...category]}
                  rules={[
                    {
                      required: true,
                      message: "Please select category!",
                    },
                  ]}
                >
                  <Cascader
                    defaultValue={[...category]}
                    options={options}
                    changeOnSelect
                    onChange={() => { }}
                  />
                </Form.Item>
              ) : (
                <Form.Item
                  id="categoryCascader"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: "Please select category!",
                    },
                  ]}
                >
                  <Cascader
                    options={options}
                    changeOnSelect
                    onChange={() => { }}
                  />
                </Form.Item>
              )}
            </div>
            <div className="form-group">
              <label>Description</label>
              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input description!",
                  },
                ]}
              >
                <Input.TextArea
                  className="form-control"
                  type="text"
                  placeholder="Description"
                />
              </Form.Item>
            </div>

            <div className="form-group">
              <label>
                Note: Add the USD $ price, you will be receiving the equivalent
                amount in cryptocurrency at the time of sale.
              </label>
            </div>
            <div className="section">
              <div className="form-group two-item">
                <label>Selling Price</label>
                <Form.Item
                  name="sellingPrice"
                  rules={[
                    {
                      required: true,
                      message: "Please input Selling Price!",
                    },
                    {
                      validator(_, value) {
                        if (value && isNaN(value)) {
                          return Promise.reject(
                            new Error("Please input Selling Price in number!")
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Selling Price"
                  />
                </Form.Item>
              </div>
              <div className="form-group two-item">
                <label>Quantity</label>
                <Form.Item
                  name="quantity"
                  rules={[
                    {
                      required: true,
                      message: "Please input Quantity!",
                    },
                    {
                      validator(_, value) {
                        if (value && isNaN(value)) {
                          return Promise.reject(
                            new Error("Please input Quantity in number!")
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Quantity"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="section">
              <div className="form-group three-item">
                <label>Domestic Shipping Charges</label>
                <Form.Item
                  name="shippingCharges"
                  rules={[
                    {
                      required: true,
                      message: "Please input Shipping Charges!",
                    },
                    {
                      validator(_, value) {
                        if (value && isNaN(value)) {
                          return Promise.reject(
                            new Error(
                              "Please input Shipping Charges in number!"
                            )
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input
                    disabled={freeShipping}
                    className="form-control"
                    type="text"
                    placeholder="Shipinng Charges"
                  />
                </Form.Item>
              </div>
              <div className="three-item free-shipping">
                <Form.Item name="freeShipping" initialValue={false}>
                  <Checkbox
                    defaultChecked={false}
                    onChange={() => handleFreeShippinng()}
                  >
                    Free Shipping
                  </Checkbox>
                </Form.Item>
              </div>
              <div className="form-group three-item">
                <label className="">Shipping Days</label>
                <Form.Item
                  name="shippingDays"
                  rules={[
                    {
                      required: true,
                      message: "Please input Shipping Days!",
                    },
                    {
                      validator(_, value) {
                        if (value && isNaN(value)) {
                          return Promise.reject(
                            new Error("Please input Shipping Days in number!")
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Shipping Days"
                  />
                </Form.Item>
              </div>
            </div>
            {/* <div className="section">
              <div className="form-group two-item">
                <label>Color</label>
                <Form.Item name="color">
                  <Select defaultValue="lucy" className="form-group" allowClear>
                    <Option value="lucy">Lucy</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="form-group two-item">
                <label>Size</label>
                <Form.Item name="size">
                  <Select defaultValue="lucy" className="form-group" allowClear>
                    <Option value="lucy">Lucy</Option>
                  </Select>
                </Form.Item>
              </div>
            </div> */}
            <div className="section">
              <div className="form-group two-item">
                <label>Country of Sale</label>
                <Form.Item
                  name="countryOfSale"
                  initialValue={product?.countryOfSale}
                  rules={[
                    {
                      required: true,
                      message: "Please input Country of Sale!",
                    },
                  ]}
                >
                  {/* <Input
                className='form-control'
                type='text'
                placeholder='Country of Sale'
              /> */}
                  <Select
                    allowClear
                    showSearch
                    placeholder="Select Country"
                    style={{ width: "100%" }}
                    // onChange={this.handleChange}
                    options={Countries}
                  />
                </Form.Item>
              </div>
              <div className="form-group two-item radio">
                <label>Ship Internationally</label>
                <Form.Item name="freeInternationally" initialValue={false}>
                  <Radio.Group className="form-group" onChange={ShipInternationally}>
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
            {ShipInternational ? (
              <div className="section">
                <div className="form-group three-item">
                  <label>International Shipping Charges</label>
                  <Form.Item
                    name="internationalshippingCharges"
                    rules={[
                      {
                        required: true,
                        message: "Please input International Shipping Charges!",
                      },
                      {
                        validator(_, value) {
                          if (value && isNaN(value)) {
                            return Promise.reject(
                              new Error(
                                "Please input International Shipping Charges in number!"
                              )
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      disabled={freeInternationalShipping}
                      className="form-control"
                      type="text"
                      placeholder="International Shipinng Charges"
                    />
                  </Form.Item>
                </div>
                <div className="three-item free-shipping">
                  <Form.Item name="freeInternationalShipping" initialValue={false}>
                    <Checkbox
                      defaultChecked={false}
                      onChange={() => handleFreeInternationalShippinng()}
                    >
                      Free International Shipping
                    </Checkbox>
                  </Form.Item>
                </div>
                <div className="form-group three-item">
                  <label className="">International Shipping Days</label>
                  <Form.Item
                    name="internationalshippingDays"
                    rules={[
                      {
                        required: true,
                        message: "Please input International Shipping Days!",
                      },
                      {
                        validator(_, value) {
                          if (value && isNaN(value)) {
                            return Promise.reject(
                              new Error("Please input International Shipping Days in number!")
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      className="form-control"
                      type="text"
                      placeholder="International Shipping Days"
                    />
                  </Form.Item>
                </div>
              </div>
            ): null}
            <div className="form-group">
              <Form.List name="attributes">
                {(fields, { add, remove }) => {
                  return (
                    <div>
                      {fields.map((field) => (
                        <Space
                          key={field.key}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="start"
                        >
                          <Form.Item
                            {...field}
                            name={[field.name, "name"]}
                            fieldKey={[field.fieldKey, "name"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing attribute name",
                              },
                            ]}
                          >
                            <Input placeholder="Attribute Name" />
                          </Form.Item>

                          {/* This is the Dynamic option Adder */}

                          <Form.Item>
                            <Form.List name={[field.name, "options"]}>
                              {(options, { add, remove }) => {
                                return (
                                  <div>
                                    {options.map((option, index2) => (
                                      <Space
                                        key={option.key}
                                        style={{
                                          display: "flex",
                                          marginBottom: 8,
                                        }}
                                        align="start"
                                      >
                                        <Form.Item
                                          // name={"aar"}
                                          {...option}
                                          name={[option.name, "label"]}
                                          fieldKey={[option.fieldKey, "label"]}
                                          key={index2}
                                          // noStyle
                                          rules={[
                                            {
                                              required: true,
                                              message: "Label Missing",
                                            },
                                          ]}
                                        >
                                          <Input placeholder="Label" />
                                        </Form.Item>
                                        <Form.Item
                                          {...option}
                                          name={[option.name, "sku"]}
                                          fieldKey={[option.fieldKey, "sku"]}
                                          key={index2}
                                        >
                                          <Input placeholder="Sku" />
                                        </Form.Item>
                                        <Form.Item
                                          {...option}
                                          name={[option.name, "quantity"]}
                                          fieldKey={[
                                            option.fieldKey,
                                            "quantity",
                                          ]}
                                          key={index2}
                                          rules={[
                                            {
                                              required: true,
                                              message: "Quantity Missing",
                                            },
                                          ]}
                                        >
                                          <Input placeholder="Quantity" />
                                        </Form.Item>
                                        <Form.Item
                                          {...option}
                                          name={[option.name, "price"]}
                                          fieldKey={[option.fieldKey, "price"]}
                                          key={index2}
                                        >
                                          <Input placeholder="Price" />
                                        </Form.Item>
                                        <MinusCircleOutlined
                                          onClick={() => {
                                            remove(option.name);
                                          }}
                                        />
                                      </Space>
                                    ))}
                                    <Form.Item>
                                      <Button
                                        type="dashed"
                                        onClick={() => {
                                          add();
                                        }}
                                      >
                                        <PlusOutlined /> Add Option
                                      </Button>
                                    </Form.Item>
                                  </div>
                                );
                              }}
                            </Form.List>
                          </Form.Item>

                          <MinusCircleOutlined
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        </Space>
                      ))}

                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        block
                      >
                        <PlusOutlined /> Add Attribute
                      </Button>
                    </div>
                  );
                }}
              </Form.List>
              {/* <Button type='dashed' style={{ width: '100%' }}>
            <PlusOutlined />
            Add An Attribute */}
              {/* </Button> */}
            </div>
            <div className="form-group">
              <label>
                Note: Not Required but below fields will improve your search
                result
              </label>
            </div>
            <div className="section">
              <div className="form-group three-item">
                <label>Sku Code</label>
                <Form.Item name="sku">
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Sku Code"
                  />
                </Form.Item>
              </div>
              <div className="form-group three-item">
                <label>Manufacture Part Number</label>
                <Form.Item name="manufacturePartNo">
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Manufacture Part Number"
                  />
                </Form.Item>
              </div>
              <div className="form-group three-item">
                <label>Product Serial Number</label>
                <Form.Item name="productSerialNo">
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Product Serial Number"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="form-group">
              <label>Terms And Conditions</label>
              <Form.Item name="terms" initialValue={product?.terms}>
                <Select
                  allowClear
                  showSearch
                  placeholder="Select Terms And Conditions"
                  style={{ width: "100%" }}
                  // onChange={this.handleChange}
                  options={[
                    {
                      value:
                        "Return Accepted, buyer pays return postage in 30 days",
                    },
                    {
                      value:
                        "Return Accepted, buyer pays return postage in 60 days",
                    },
                    {
                      value:
                        "Return Accepted, seller pays return postage in 30 days",
                    },
                    {
                      value:
                        "Return Accepted, seller pays return postage, in 60 days",
                    },
                  ]}
                />
                {/* <Input.TextArea
              className='form-control'
              type='text'
              placeholder='You can get a full refund within 30 days'
            /> */}
              </Form.Item>
            </div>
            <div className="form-group">
              <label>Product Tags</label>
              <Form.Item name="tags">
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Not Required but will improve your search result"
                />
              </Form.Item>
            </div>
            <div className="form-group submit">
              <button type="submit" className="ps-btn ps-btn--fullwidth">
                Add
              </button>
            </div>
          </Form>
        </div>
      )}
    </>

    //   </div>
    // </div>
  );
};

export default ProductAddForm;
