const baseURL = `${process.env.baseURL}`;
import React, { useState, useEffect } from "react";
import { Cascader, Form, Input, notification, Upload, Radio, Button, message } from "antd";
import { CameraTwoTone, LoadingOutlined, MinusCircleOutlined, MenuOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import { editLandingPage } from "~/store/landingPages/action";
import useGetLandingPage from "~/hooks/useLandingPages";
import { useRouter } from "next/router";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
const options = [
    {
        label: 'Left',
        value: 'left',
    },
    {
        label: 'Center',
        value: 'center',
    },
    {
        label: 'Right',
        value: 'right',
    },
];

const FormEditLandingPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { pid } = router.query;

    const { loading, landingPage, thumbnailImage, getLandingPage } = useGetLandingPage();
    useEffect(() => {
        getLandingPage(pid);
    }, []);

    // const landingPages = useSelector((state) => state.landingPages.landingPages);
    const [thumbnail, setthumbnail] = useState();
    const [imageError, setImageError] = useState(false);
    const [loadingImage, setLoadingImage] = useState(false);
    const [radioValue, setRadioValue] = useState("");
    const [counter, setCounter] = useState(0);
    const [fileList, setFileList] = useState([]);
    const modalNotification = (type, message) => {
        notification[type]({
            message: message,
        });
    };

    useEffect(() => {
        if (landingPage) {
            setthumbnail(landingPage.register_panel_background);
            setRadioValue(landingPage.register_form_location);
            setCounter(landingPage.panel_images.length)
            setFileList(landingPage.panel_images)
        }
    }, [landingPage]);

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        return isJpgOrPng;
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

    const handlePanelImageChange = (info, index) => {
        if (info.file.status === "uploading") {
            // setLoadingPanelImages(true);
            return;
        }
        if (info.file.status === "done") {
            // setLoadingPanelImages(false);
            let files = [...fileList];

            files[index] = info.file.originFileObj;
            setFileList(files);
            // setImageError(false);
        }
    };
    const urlConverter = (file) => {
        return URL.createObjectURL(file);
    };
    const handleSubmit = async (values) => {
        // console.log("typeof thsa", typeof thumbnail);
        // if (thumbnail && typeof thumbnail != "string") {
        let data = new FormData();
        data.append("id", pid);
        for (var key in values) {
            data.append(key, values[key]);
        }
        if (thumbnail) {
            data.append("thumbnail", thumbnail);
        }
        for (let value in fileList) {

            if (typeof fileList[value] == "string") {
                const response = await fetch(`${baseURL}/${fileList[value]}`);
                const blob = await response.blob();
                const file = new File([blob], 'image.jpg', { type: "image/jpeg" });
                data.append("panel_images[" + value + "]", file);
            } else {
                console.log(fileList[value]);
                data.append("panel_images[" + value + "]", fileList[value]);
            }
        }
        dispatch(editLandingPage(data));
        // } else {
        //     values.id = pid;
        //     if (values.thumbnail) {
        //         values.thumbnail = thumbnail;
        //     }
        //     dispatch(editLandingPage(values));
        // }
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
        console.log(counter)
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
    return (
        <Form className="ps-form--add" onFinish={handleSubmit}>
            {landingPage ? (
                <div>
                    <div className="form-group">
                        <label>Name</label>
                        <Form.Item
                            name="name"
                            initialValue={landingPage.name}
                            rules={[
                                {
                                    required: true,
                                    message: "Please input name!",
                                },
                            ]}
                        >
                            <Input
                                className="form-control"
                                type="text"
                                placeholder=" Name"
                            />
                        </Form.Item>
                    </div>
                    <div className='form-group'>
                        <label>Slug</label>
                        <Form.Item
                            name='slug'
                            initialValue={landingPage.slug}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input slug!'
                                }
                            ]}
                        >
                            <Input
                                className='form-control'
                                type='text'
                                placeholder='slug'
                            />
                        </Form.Item>
                    </div>
                    <div className="upload">
                        <div className="form-group" style={{ flex: 0.2 }}>
                            <label>Register Panel Background</label>
                            <Upload
                                name="thumbnail"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                onChange={handleFileChange}
                                beforeUpload={beforeUpload}
                            >
                                {thumbnail ? (
                                    <img
                                        src={
                                            typeof thumbnail !== "string"
                                                ? urlConverter(thumbnail)
                                                : `${baseURL}/${thumbnail}`
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
                    <div className="form-group three-item radio">
                        <label>Register Form Location</label>
                        <Form.Item name="register_form_location"
                            initialValue={landingPage.register_form_location}
                        >
                            <Radio.Group className="form-group"
                                onChange={onChange}
                                options={options}
                                value={landingPage.register_form_location}
                            />
                        </Form.Item>
                    </div>
                    <div className='form-group'>
                        <label>Register Button Colour</label>
                        <Form.Item name='register_button_colour'
                            initialValue={landingPage.register_button_colour}
                        >
                            <Input
                                className='form-control'
                                type='text'
                                placeholder='button colour'
                            />
                        </Form.Item>
                    </div>
                    <div className='form-group'>
                        <label>Register Button Label</label>
                        <Form.Item name='register_button_label'
                            initialValue={landingPage.register_button_label}
                        >
                            <Input
                                className='form-control'
                                type='text'
                                placeholder='button label'
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <Button type="primary" block style={{ marginBottom: '20px' }}
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
                                                                        name='panel_images'
                                                                        style={{
                                                                            display: 'flex'
                                                                        }}
                                                                    >

                                                                        <Upload
                                                                            name="panel_images"
                                                                            listType="picture-card"
                                                                            className="avatar-uploader"
                                                                            showUploadList={false}
                                                                            beforeUpload={beforeUpload}
                                                                            onChange={e => handlePanelImageChange(e, index)}
                                                                        >
                                                                            {fileList[index] ? (
                                                                                <img
                                                                                    src={
                                                                                        typeof fileList[index] !== "string"
                                                                                            ? urlConverter(fileList[index])
                                                                                            : `${baseURL}/${fileList[index]}`
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

                                                                        {/* {imageError ? (
                        <div role="alert" style={{ color: "red" }}>
                            Register Panel Background Required!
                        </div>
                    ) : (
                        ""
                    )} */}     <div className='table-btn-wd' style={{
                                                                            display: 'flex',
                                                                            height: '50px'
                                                                        }}>
                                                                            {/* <Button
                                                                                icon={<MenuOutlined />}
                                                                                style={{ marginRight: '20px' }}
                                                                            /> */}
                                                                            <Button
                                                                                icon={<MinusCircleOutlined />}
                                                                                onClick={e => {
                                                                                    const list = [...fileList];
                                                                                    list.splice(index, 1);
                                                                                    setFileList(list);
                                                                                    setCounter(counter - 1)
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
                                )
                                }
                            </Droppable >
                        </DragDropContext >
                    </div >

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

export default FormEditLandingPage;
