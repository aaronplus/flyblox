import React, { useState, useEffect } from 'react'
import { Cascader, Form, Input, notification, Upload } from 'antd'
import { CameraTwoTone, LoadingOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'

import { addCategory } from '~/store/category/action'

const FormCreateCategory = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const categories = useSelector(state => state.categoryList.categories)
  const [thumbnail, setthumbnail] = useState()
  const [nameError, setNameError] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [loadingImage, setLoadingImage] = useState(false)

  let options = []
  if (categories) {
    options = categories
  }

  const handleFileChange = info => {
    if (info.file.status === 'uploading') {
      setLoadingImage(true)
      return
    }
    if (info.file.status === 'done') {
      setLoadingImage(false)
      setthumbnail(info.file.originFileObj)
      setImageError(false)
    }
  }
  const urlConverter = file => {
    return URL.createObjectURL(file)
  }
  const handleSubmit = async values => {
    let data = new FormData()
    for (var key in values) {
      if (key === 'parent') {
        if (values[key]) {
          let value = values[key]
          data.append(key, value[value.length - 1])
        }
      } else if (key === 'thumbnail') {
        if (values[key]){
          let value = values[key].file.originFileObj
          data.append(key, value)
        }
      } else {
        if (values[key]) {
          data.append(key, values[key])
        }
      }
    }
    setthumbnail(null)
    form.resetFields()
console.log(JSON.stringify(data))
    dispatch(addCategory(data))
  }
  const uploadButton = (
    <div>
      {loadingImage ? (
        <LoadingOutlined />
      ) : (
        <CameraTwoTone twoToneColor='#fcb800' />
      )}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <Form form={form} className='ps-form--add' onFinish={handleSubmit}>
      <div className='form-group'>
        <label>Category Name</label>
        <Form.Item
          name='name'
          rules={[
            {
              required: true,
              message: 'Please input Category name!'
            }
          ]}
        >
          <Input
            className='form-control'
            type='text'
            placeholder='Category Name'
          />
        </Form.Item>
      </div>
      <div className='upload'>
        <div className='form-group' style={{ flex: 0.2 }}>
          <label>Category Image</label>
          <Form.Item
            name='thumbnail'
          >
            <Upload
              name='thumbnail'
              listType='picture-card'
              className='avatar-uploader'
              showUploadList={false}
              onChange={handleFileChange}
            >
              {thumbnail ? (
                <img
                  src={urlConverter(thumbnail)}
                  alt='avatar'
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'contain'
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
        </div>
      </div>
      <div className='form-group'>
        <label>Parent Category</label>
        <Form.Item name='parent'>
          <Cascader options={options} changeOnSelect />
        </Form.Item>
      </div>

      <div className='form-group submit'>
        <button type='submit' className='ps-btn ps-btn--fullwidth'>
          Add
        </button>
      </div>
    </Form>
  )
}

export default FormCreateCategory
