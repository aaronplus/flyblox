import React, { useEffect, useState } from 'react'
import { Form, Input, notification, Radio, Upload } from 'antd'
import { CameraTwoTone, LoadingOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { baseURL } from '~/endpoints'
import useGetProducts from '~/hooks/useGetProducts'

const ProductEditVariantsForm = ({ id }) => {
  // const dispatch = useDispatch()
  const { product, loading, getProductById, updateImages } = useGetProducts()
  // const [product, setProduct] = useState(null)
  // const [loading, setLoading] = useState(false)
  // const [stockOption, setStockOption] = useState('add')
  const [loadingImage, setLoadingImage] = useState(false)
  const [mainImage, setMainImage] = useState()
  const [additionalImage1, setAdditionalImage1] = useState()
  const [additionalImage2, setAdditionalImage2] = useState()
  const [additionalImage3, setAdditionalImage3] = useState()
  const [additionalImage4, setAdditionalImage4] = useState()
  const [additionalImage5, setAdditionalImage5] = useState()

  // async function getProduct(pid) {
  //   setLoading(true)
  //   const responseData = await ProductRepository.getProductsById(pid)
  //   if (responseData.product) {
  //     setProduct(responseData.product)
  //     setTimeout(
  //       function () {
  //         setLoading(false)
  //       }.bind(this),
  //       250
  //     )
  //   }
  // }

  useEffect(() => {
    if (id && id.length > 0) {
      getProductById(id)
    }
  }, [id])

  const Alert = (type, message) => {
    notification[type]({
      message: message
    })
  }

  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      Alert('error', 'You can only upload JPG/PNG file!')
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      Alert('error', 'Image must be smaller than 2MB!')
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
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

  const urlConverter = file => {
    return URL.createObjectURL(file)
  }

  const handleMainFileChange = info => {
    if (info.file.status === 'uploading') {
      setLoadingImage(true)
      return
    }
    if (info.file.status === 'done') {
      setLoadingImage(false)
      setMainImage(info.file.originFileObj)
    }
  }

  const handleAdditionalFile1Change = info => {
    if (info.file.status === 'uploading') {
      setLoadingImage(true)
      return
    }
    if (info.file.status === 'done') {
      setLoadingImage(false)
      setAdditionalImage1(info.file.originFileObj)
    }
  }

  const handleAdditionalFile2Change = info => {
    if (info.file.status === 'uploading') {
      setLoadingImage(true)
      return
    }
    if (info.file.status === 'done') {
      setLoadingImage(false)
      setAdditionalImage2(info.file.originFileObj)
    }
  }
  const handleAdditionalFile3Change = info => {
    if (info.file.status === 'uploading') {
      setLoadingImage(true)
      return
    }
    if (info.file.status === 'done') {
      setLoadingImage(false)
      setAdditionalImage3(info.file.originFileObj)
    }
  }

  const handleAdditionalFile4Change = info => {
    if (info.file.status === 'uploading') {
      setLoadingImage(true)
      return
    }
    if (info.file.status === 'done') {
      setLoadingImage(false)
      setAdditionalImage4(info.file.originFileObj)
    }
  }

  const handleAdditionalFile5Change = info => {
    if (info.file.status === 'uploading') {
      setLoadingImage(true)
      return
    }
    if (info.file.status === 'done') {
      setLoadingImage(false)
      setAdditionalImage5(info.file.originFileObj)
    }
  }

  // const handleStockSubmit = async values => {
  // values.id = id
  // console.log(values)
  // dispatch(editProduct(values))
  // }

  const handleSubmit = async values => {
    let data = new FormData()
    if (mainImage) {
      data.append('mainImage', mainImage)
    }
    if (additionalImage1) {
      data.append('additionalImage1', additionalImage1)
    }
    if (additionalImage2) {
      data.append('additionalImage2', additionalImage2)
    }
    if (additionalImage3) {
      data.append('additionalImage3', additionalImage3)
    }
    if (additionalImage4) {
      data.append('additionalImage4', additionalImage4)
    }
    if (additionalImage5) {
      data.append('additionalImage5', additionalImage5)
    }
    const res = await updateImages(id, data)
    if (res) {
      Alert('success', 'Image Updated Successfully')
    } else {
      Alert('error', 'Error Occurred at sever side')
    }
  }

  return (
    <div>
      {product ? (
        <div>
          {/* <Form className='ps-form--add' onFinish={handleStockSubmit}>
            <div className='ps-section__header'>
              <h3>Total Available Stock: {product.quantity}</h3>
            </div>
            <div className='section'>
              <div className='form-group two-item'>
                <label>Add/Remove Stock</label>
                <div className='form-group'>
                  <select
                    className='form-control'
                    value={stockOption}
                    onChange={event => setStockOption(event.target.value)}
                  >
                    <option value='add'>Add</option>
                    <option value='remove'>Remove</option>
                  </select>
                </div>
              </div>
              <div className='form-group two-item'>
                <label>Quantity</label>
                <Form.Item
                  name='quantity'
                  rules={[
                    {
                      required: true,
                      message: 'Please input Quantity!'
                    },
                    {
                      validator(_, value) {
                        if (value && isNaN(value)) {
                          return Promise.reject(
                            new Error('Please input Quantity in number!')
                          )
                        }
                        return Promise.resolve()
                      }
                    }
                  ]}
                >
                  <Input
                    className='form-control'
                    type='text'
                    placeholder='Quantity'
                  />
                </Form.Item>
              </div>
            </div>

            <div className='form-group submit'>
              <button type='submit' className='ps-btn ps-btn--fullwidth'>
                Update Stock
              </button>
            </div>
          </Form> */}
          <Form className='ps-form--add' onFinish={handleSubmit}>
            <div className='ps-section__header'>
              <h3>Edit Item Images</h3>
            </div>
            <div className='upload'>
              <div className='form-group' style={{ flex: 0.2 }}>
                <label>Main Image</label>
                <Upload
                  name='mainImage'
                  listType='picture-card'
                  className='avatar-uploader'
                  showUploadList={false}
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleMainFileChange}
                >
                  {product.mainImage || mainImage ? (
                    <img
                      src={
                        mainImage
                          ? urlConverter(mainImage)
                          : baseURL + '/' + product.mainImage
                      }
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
              </div>
              <div className='form-group'>
                <label>Additional Images</label>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  <div>
                    <Upload
                      style={{ width: '100' }}
                      name='additionalImage1'
                      listType='picture-card'
                      className='avatar-uploader'
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleAdditionalFile1Change}
                    >
                      {product.additionalImage1 || additionalImage1 ? (
                        <img
                          src={
                            additionalImage1
                              ? urlConverter(additionalImage1)
                              : baseURL + '/' + product.additionalImage1
                          }
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
                  </div>
                  <div>
                    <Upload
                      name='additionalImage2'
                      listType='picture-card'
                      className='avatar-uploader'
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleAdditionalFile2Change}
                    >
                      {product.additionalImage2 || additionalImage2 ? (
                        <img
                          src={
                            additionalImage2
                              ? urlConverter(additionalImage2)
                              : baseURL + '/' + product.additionalImage2
                          }
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
                  </div>

                  <div>
                    <Upload
                      name='additionalImage3'
                      listType='picture-card'
                      className='avatar-uploader'
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleAdditionalFile3Change}
                    >
                      {product.additionalImage3 || additionalImage3 ? (
                        <img
                          src={
                            additionalImage3
                              ? urlConverter(additionalImage3)
                              : baseURL + '/' + product.additionalImage3
                          }
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
                  </div>
                  <div>
                    <Upload
                      name='additionalImage4'
                      listType='picture-card'
                      className='avatar-uploader'
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleAdditionalFile4Change}
                    >
                      {product.additionalImage4 || additionalImage4 ? (
                        <img
                          src={
                            additionalImage4
                              ? urlConverter(additionalImage4)
                              : baseURL + '/' + product.additionalImage4
                          }
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
                  </div>
                  <div>
                    <Upload
                      name='additionalImage5'
                      listType='picture-card'
                      className='avatar-uploader'
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleAdditionalFile5Change}
                    >
                      {product.additionalImage5 || additionalImage5 ? (
                        <img
                          src={
                            additionalImage5
                              ? urlConverter(additionalImage5)
                              : baseURL + '/' + product.additionalImage5
                          }
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
                  </div>
                </div>
              </div>
            </div>

            <div className='form-group submit'>
              <button type='submit' className='ps-btn ps-btn--fullwidth'>
                Update
              </button>
            </div>
          </Form>
        </div>
      ) : null}
    </div>
  )
}

export default ProductEditVariantsForm
