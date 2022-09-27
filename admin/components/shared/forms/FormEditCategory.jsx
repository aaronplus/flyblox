import React, { useState, useEffect } from "react";
import { Cascader, Form, Input, notification, Upload } from "antd";
import { CameraTwoTone, LoadingOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import { addCategory, editCategory } from "~/store/category/action";
import useCategory from "~/hooks/useCategories";
import { useRouter } from "next/router";

const FormEditCategory = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pid } = router.query;

  const { loading, category, thumbnailImage, getCategory } = useCategory();
  useEffect(() => {
    getCategory(pid);
  }, []);

  const categories = useSelector((state) => state.categoryList.categories);

  const [thumbnail, setthumbnail] = useState();
  const [imageError, setImageError] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const modalNotification = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  useEffect(() => {
    if (category) {
      setthumbnail(category.thumbnail);
    }
  }, [category]);

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
    // console.log("typeof thsa", typeof thumbnail);
    if (thumbnail && typeof thumbnail != "string") {
      let data = new FormData();
      data.append("id", pid);
      for (var key in values) {
        if (key === "parent") {
          // if (values[key]) {
          //   let value = values[key];
          //   data.append(key, value[value.length - 1]);
          // }
        } else {
          if (values[key]) {
            data.append(key, values[key]);
          }
        }
      }
      if (thumbnail){
        data.append("thumbnail", thumbnail);
      }
      dispatch(editCategory(data));
    } else {
      values.id = pid;
      if (values.thumbnail){
        values.thumbnail = thumbnail;
      }
      dispatch(editCategory(values));
    }
  };
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

  return (
    <Form className="ps-form--add" onFinish={handleSubmit}>
      {category ? (
        <div>
          <div className="form-group">
            <label>Category Name</label>
            <Form.Item
              name="name"
              initialValue={category.name}
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
                    src={
                      typeof thumbnail !== "string"
                        ? urlConverter(thumbnail)
                        : `http://localhost:4000/${thumbnail}`
                    }
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
          {/* <div className="form-group">
            <label>Parent Category</label>
            <Form.Item
              name="parent"
              initialValue={category && category.parent ? category.parent : ""}
            >
              <Cascader options={categories ? categories : ""} changeOnSelect />
            </Form.Item>
          </div> */}
          <div className="form-group submit">
            <button type="submit" className="ps-btn ps-btn--fullwidth">
              Add
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </Form>
  );
};

export default FormEditCategory;
