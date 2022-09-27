import React, { useState, useEffect } from "react";
import { Form, Input, Radio, Upload, Button } from "antd";
import {
  CameraTwoTone,
  LoadingOutlined,
  MinusCircleOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addLandingPage } from "~/store/landingPages/action";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
const options = [
  {
    label: "Left",
    value: "left",
  },
  {
    label: "Center",
    value: "center",
  },
  {
    label: "Right",
    value: "right",
  },
];
const FormCreateLadingPages = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const [loadingPanelImages, setLoadingPanelImages] = useState(false);
  const [thumbnail, setthumbnail] = useState();
  const [imageError, setImageError] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [radioValue, setRadioValue] = useState("left");
  const [addPanel, setAddPanel] = useState(false);
  const [counter, setCounter] = useState(0);

  const handleSubmit = async (values) => {
    let data = new FormData();
    for (var key in values) {
      if (key === "thumbnail") {
        if (values[key]) {
          let value = values[key].file.originFileObj;
          data.append(key, value);
        }
      } else {
        if (values[key]) {
          data.append(key, values[key]);
        }
      }
    }
    for (let value in fileList) {
      data.append("panel_images[" + value + "]", fileList[value]);
    }
    setthumbnail(null);
    setRadioValue("left");
    setCounter(0);
    setFileList([]);
    form.resetFields();
    dispatch(addLandingPage(data));
  };

  const handlePanelImageChange = (info, index) => {
    if (info.file.status === "uploading") {
      setLoadingPanelImages(true);
      return;
    }
    if (info.file.status === "done") {
      setLoadingPanelImages(false);
      let files = [...fileList];

      files[index] = info.file.originFileObj;
      setFileList(files);
      // setImageError(false);
    }
  };

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

  // Function to update list on drop
  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    console.log(droppedItem);
    const [reorderedItem] = fileList.splice(droppedItem.source.index, 1);
    // Add dropped item
    fileList.splice(droppedItem.destination.index, 0, reorderedItem);
    console.log(fileList)
    // Update State
    setFileList(fileList);
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

  const onChange = (e) => {
    setRadioValue(e.target.value);
  };

  const handleClick = () => {
    setCounter(counter + 1);
  };

console.log(fileList)

  return (
    <Form form={form} className="ps-form--add" onFinish={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input name!",
            },
          ]}
        >
          <Input className="form-control" type="text" placeholder="Name" />
        </Form.Item>
      </div>
      <div className="form-group">
        <label>Slug</label>
        <Form.Item
          name="slug"
          rules={[
            {
              required: true,
              message: "Please input slug!",
            },
          ]}
        >
          <Input className="form-control" type="text" placeholder="slug" />
        </Form.Item>
      </div>

      <div className="upload">
        <div className="form-group" style={{ flex: 0.2 }}>
          <label>Register Panel Background</label>
          <Form.Item name="thumbnail">
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
            {/* {imageError ? (
                        <div role="alert" style={{ color: "red" }}>
                            Register Panel Background Required!
                        </div>
                    ) : (
                        ""
                    )} */}
          </Form.Item>
        </div>
      </div>

      <div className="form-group three-item radio">
        <label>Register Form Location</label>
        <Form.Item name="register_form_location" initialValue={radioValue}>
          <Radio.Group
            className="form-group"
            onChange={onChange}
            value={radioValue}
            options={options}
          />
        </Form.Item>
      </div>
      <div className="form-group">
        <label>Register Button Colour</label>
        <Form.Item name="register_button_colour">
          <Input
            className="form-control"
            type="text"
            placeholder="button colour"
          />
        </Form.Item>
      </div>
      <div className="form-group">
        <label>Register Button Label</label>
        <Form.Item name="register_button_label">
          <Input
            className="form-control"
            type="text"
            placeholder="button label"
          />
        </Form.Item>
      </div>
      <div>
        <Button
          type="primary"
          block
          style={{ marginBottom: "20px" }}
          onClick={handleClick}
        >
          Add Panel
        </Button>
      </div>
      <div>
        <DragDropContext onDragEnd={handleDrop}>
          <Droppable droppableId="list-container">
            {(provided) => (
              <div
                className="list-container custom-drag"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {Array.from(Array(counter)).map((c, index) => {
                  return (
                    <Draggable key={c} draggableId={"id" + index} index={index}>
                      {(provided) => (
                        <div
                          className="item-container custom-drag"
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          <div className="upload">
                            <div className="form-group" style={{ flex: 0.2 }}>
                              <Form.Item
                                name="panel_images"
                                style={{
                                  display: "flex",
                                }}
                              >
                                <Upload
                                  name="panel_images"
                                  listType="picture-card"
                                  className="avatar-uploader"
                                  showUploadList={false}
                                  onChange={(e) =>
                                    handlePanelImageChange(e, index)
                                  }
                                >
                                  {fileList[index] ? (
                                    <img
                                      src={urlConverter(fileList[index])}
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
                                {/* {imageError ? (
                        <div role="alert" style={{ color: "red" }}>
                            Register Panel Background Required!
                        </div>
                    ) : (
                        ""
                    )} */}{" "}
                                <div
                                  className="table-btn-wd"
                                  style={{
                                    display: "flex",
                                    height: "50px",
                                  }}
                                >
                                  {/* <Button
                                    icon={<MenuOutlined />}
                                    style={{ marginRight: "20px" }}
                                  /> */}
                                  <Button
                                    icon={<MinusCircleOutlined />}
                                    onClick={(e) => {
                                      const list = [...fileList];
                                      list.splice(index, 1);
                                      setFileList(list);
                                      setCounter(counter - 1);
                                    }}
                                  />
                                </div>
                              </Form.Item>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="form-group submit">
        <button type="submit" className="ps-btn ps-btn--fullwidth">
          Submit
        </button>
      </div>
    </Form>
  );
};

export default FormCreateLadingPages;
