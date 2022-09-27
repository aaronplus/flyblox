import React, { useEffect } from "react";
import ContainerDefault from "~/components/layouts/ContainerDefault";
import FormEditCategory from "~/components/shared/forms/FormEditCategory";
import HeaderDashboard from "~/components/shared/headers/HeaderDashboard";
import { connect, useDispatch } from "react-redux";
import { toggleDrawerMenu } from "~/store/app/action";
import { Cascader, Form, Input, notification, Upload } from "antd";
import { useRouter } from "next/router";

const CategoriesPage = () => {
  const router = useRouter();
  const { pid } = router.query;
  console.log("pidpid", pid);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(toggleDrawerMenu(false));
  }, []);
  const handleFileChange = (info) => {
    if (info.file.status === "uploading") {
      setLoadingImage(true);
      return;
    }
    if (info.file.status === "done") {
      setLoadingImage(false);
      setthumbnail(info.file.originFileObj);
      setImageError(false);
    }
  };
  const urlConverter = (file) => {
    return URL.createObjectURL(file);
  };
  const handleSubmit = async (values) => {
    console.log("values");
    // if (thumbnail) {
    //   let data = new FormData();
    //   for (var key in values) {
    //     if (key === "parent") {
    //       if (values[key]) {
    //         let value = values[key];
    //         data.append(key, value[value.length - 1]);
    //       }
    //     } else {
    //       if (values[key]) {
    //         data.append(key, values[key]);
    //       }
    //     }
    //   }
    //   if (thumbnail) {
    //     data.append("thumbnail", thumbnail);
    //   }
    //   dispatch(addCategory(data));
    // } else {
    //   setImageError(true);
    // }
  };
  return (
    <ContainerDefault>
      <HeaderDashboard
        title="Categories"
        description="Martfury Category Listing"
      />
      <section className="ps-dashboard ps-items-listing">
        {/* <div className="ps-section__header simple">
          <div className="ps-section__filter">
            <FormSearchSimple />
          </div>
          <div className="ps-section__actions">
            <a className="ps-btn success" href="#">
              <i className="icon icon-plus mr-2"></i>Edit Category
            </a>
          </div>
        </div> */}
        <div className="ps-section__content">
          {pid ? <FormEditCategory id={pid} /> : ""}
          {/* <Form className="ps-form--add" onFinish={handleSubmit}>
            <div className="form-group">
              <label>Category Name</label>
              <Form.Item
                name="name"
                // initialValue={product.name}

                rules={[
                  {
                    required: true,
                    message: "Please input Category name!",
                  },
                ]}
              >
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Category Name"
                />
              </Form.Item>
            </div>
            <div className="upload">
              <div className="form-group" style={{ flex: 0.2 }}>
                <label>Category Image</label>
                <Upload
                  name="thumbnail"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={handleFileChange}
                >
                  {thumbnail ? (
                    <img
                      src={urlConverter(thumbnail)}
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
                {imageError ? (
                  <div role="alert" style={{ color: "red" }}>
                    Category Image Required!
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="form-group">
              <label>Parent Category</label>
              <Form.Item name="parent">
                <Cascader
                  options={categories ? categories : ""}
                  changeOnSelect
                />
              </Form.Item>
            </div>

            <div className="form-group submit">
              <button type="submit" className="ps-btn ps-btn--fullwidth">
                Add
              </button>
            </div>
          </Form>
        */}
        </div>
      </section>
    </ContainerDefault>
  );
};

export default connect((state) => state.app)(CategoriesPage);
