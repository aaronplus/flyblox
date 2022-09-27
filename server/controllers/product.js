const Product = require('../models/Product')
const Feedback = require('../models/Feedback')
const Category = require("../models/Category")
const { validationResult } = require('express-validator')
const createImageUrl = require('../utils/createImageUrl')
const getImagePath = require('../utils/getImagePath')
const fs = require('fs')
const mongoose = require('mongoose')

exports.Add = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  }

  if (req.files.mainImage === undefined) {
    return res.status(422).json({ error: 'MainImage is required' })
  }

  const { userId } = req.decoded

  const {
    name,
    category,
    description,
    token,
    sellingPrice,
    quantity,
    freeShipping,
    shippingCharges,
    shippingDays,
    countryOfSale,
    freeInternationally,
    color,
    size,
    sku,
    manufacturePartNo,
    productSerialNo,
    terms,
    tags,
    attributes,
    freeInternationalShipping,
    internationalshippingDays,
    internationalshippingCharges
  } = req.body

  const {
    mainImage,
    additionalImage1,
    additionalImage2,
    additionalImage3,
    additionalImage4,
    additionalImage5
  } = req.files

  let dueDate = 7;
  if (!freeInternationally ) {
    dueDate = Number(shippingDays) + dueDate;
  } else {
    dueDate = Number(internationalshippingDays) + dueDate;
  }
  const product = new Product({
    name,
    category,
    description,
    token,
    sellingPrice,
    quantity,
    freeShipping,
    shippingCharges,
    shippingDays,
    countryOfSale,
    freeInternationally,
    color,
    size,
    sku,
    manufacturePartNo,
    productSerialNo,
    terms,
    tags,
    seller: userId,
    freeInternationalShipping,
    internationalshippingDays,
    internationalshippingCharges,
    dueDate: dueDate,
  })

  if (attributes !== undefined) {
    product.attributes = JSON.parse(attributes)
  }

  if (req.files !== undefined) {
    if (mainImage) {
      const { destination, filename } = mainImage[0]
      image = createImageUrl(destination, filename)
      product.mainImage = image
    }
    if (additionalImage1) {
      const { destination, filename } = additionalImage1[0]
      image = createImageUrl(destination, filename)
      product.additionalImage1 = image
    }
    if (additionalImage2) {
      const { destination, filename } = additionalImage2[0]
      image = createImageUrl(destination, filename)
      product.additionalImage2 = image
    }
    if (additionalImage3) {
      const { destination, filename } = additionalImage3[0]
      image = createImageUrl(destination, filename)
      product.additionalImage3 = image
    }
    if (additionalImage4) {
      const { destination, filename } = additionalImage4[0]
      image = createImageUrl(destination, filename)
      product.additionalImage4 = image
    }
    if (additionalImage5) {
      const { destination, filename } = additionalImage5[0]
      image = createImageUrl(destination, filename)
      product.additionalImage5 = image
    }
  }

  try {
    const newProduct = await product.save()
    res.json({
      message: 'Product added successfully.',
      product: product
    })
  } catch (error) {
    res.status(422).json({ error: error })
    console.log(error)
  }
}

exports.GetAll = (req, res) => {
  Product.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'seller',
        foreignField: '_id',
        as: 'seller'
      }
    },
    {
      $unwind: '$seller'
    },
    {
      $match: {
        'seller.walletAddress': { $ne: null }
      }
    }
  ])
    .then(results =>
      res.status(200).json({
        message: 'Fetched Products successfully.',
        products: results
      })
    )
    .catch(error => res.status(400).send({ error: error }))
}

exports.GetAllPaginated = (req, res) => {
  const { page, limit, filter, category, title_contains } = req.query
  let aggregatePipeline = [
    {
      $lookup: {
        from: 'users',
        localField: 'seller',
        foreignField: '_id',
        as: 'seller'
      }
    },
    {
      $unwind: '$seller'
    },
    {
      $match: {
        'seller.walletAddress': { $ne: null },
        'activated': true
      }
    }
  ]

  if (filter) {
    let filterQuery
    switch (filter) {
      case 'latest':
        filterQuery = { createdAt: -1 }
        aggregatePipeline.push({ $sort: filterQuery })
        break
      case 'ascending':
        filterQuery = { sellingPrice: 1 }
        aggregatePipeline.push({ $sort: filterQuery })
        break
      case 'descending':
        filterQuery = { sellingPrice: -1 }
        aggregatePipeline.push({ $sort: filterQuery })
        break
      case 'topSeller':
        aggregatePipeline.push(
          {
            $lookup: {
              from: 'orders',
              localField: '_id',
              foreignField: 'orderItems.product',
              as: 'orders'
            }
          },
          {
            $addFields: {
              orders: { $size: '$orders' }
            }
          },
          {
            $sort: {
              orders: -1
            }
          }
        )
        break
      default:
        filterQuery = { createdAt: 1 }
        aggregatePipeline.push({ $sort: filterQuery })
        break
    }
  }

  if (category && category != 'all') {
    aggregatePipeline.push({
      $match: { category: mongoose.Types.ObjectId(category) }
    })
  }

  if (title_contains) {
    aggregatePipeline.push({
      $match: { name: { $regex: title_contains, $options: 'i' } }
    })
  }

  if (page) {
    aggregatePipeline.push({ $skip: (page - 1) * limit })
  }

  if (limit) {
    aggregatePipeline.push({ $limit: limit * 1 })
  }

  Product.aggregate(aggregatePipeline)
    .then(results => {
      res.status(200).json({
        message: 'Fetched Products successfully.',
        products: results
      })
    })
    .catch(error => res.status(400).send({ error: error }))
}

exports.total = (req, res) => {
  Product.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'seller',
        foreignField: '_id',
        as: 'seller'
      }
    },
    {
      $unwind: '$seller'
    },
    {
      $match: {
        'seller.walletAddress': { $ne: null }
      }
    }
  ])
    .then(results => {
      res.status(200).json({
        message: 'Fetched Products successfully.',
        total: results.length > 0 ? results.length : 0
      })
    })
    .catch(error => res.status(400).send({ error: error }))
}
exports.GetById = (req, res) => {
  const { id } = req.params
  Product.findById(id)
    .populate('seller', 'username walletAddress')
    .populate('category', 'name')
    .then(results =>
      res.status(200).json({
        message: 'Fetched Product successfully.',
        product: results
      })
    )
    .catch(error => res.status(400).send({ error: error }))
}

exports.GetByIds = async (req, res) => {
  const { payload } = req.body
  var products = await Promise.all(
    payload.map(async item => {
      const product = await Product.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(item.id)
          }
        },
        {
          $unset: 'attributes'
        },
        {
          $addFields: {
            attributes: { $const: item.attributes } 
          }
        }
      ])
      return product[0]
    })
  )
  res.status(200).json({
    message: 'Fetched Products By Ids successfully.',
    products
  })

  // Product.find({ _id: { $in: ids } })
  //   .then(results =>
  //     res.status(200).json({
  //       message: 'Fetched Products By Ids successfully.',
  //       products: results
  //     })
  //   )
  //   .catch(error => res.status(400).send({ error: error }))
}

exports.GetByCategory = (req, res) => {
  const { id } = req.params
  Product.find({ category: id })
    .then(results =>
      res.status(200).json({
        message: 'Fetched Product By Category successfully.',
        products: results
      })
    )
    .catch(error => res.status(400).send({ error: error }))
}

exports.GetBySeller = (req, res) => {
  Product.find({ seller: req.decoded.userId })
    .populate('category', 'name')
    .then(results =>
      res.status(200).json({
        message: 'Fetched Product By Seller successfully.',
        products: results
      })
    )
    .catch(error => res.status(400).send({ error: error }))
}

exports.Update = async (req, res) => {
  if (Object.keys(req.body).length <= 0) {
    return res
      .status(422)
      .json({ error: 'Kindly, Provide an attribute to update.' })
  }

  const { id } = req.params

  const {
    name,
    category,
    description,
    token,
    sellingPrice,
    quantity,
    freeShipping,
    shippingCharges,
    shippingDays,
    countryOfSale,
    freeInternationally,
    color,
    size,
    sku,
    manufacturePartNo,
    productSerialNo,
    terms,
    tags
  } = req.body
  const data = {}

  if (name) {
    data['name'] = name
  }
  if (category) {
    data['category'] = category
  }
  if (description) {
    data['description'] = description
  }
  if (token) {
    data['token'] = token
  }
  if (sellingPrice) {
    data['sellingPrice'] = sellingPrice
  }
  if (quantity) {
    data['quantity'] = quantity
  }
  if (freeShipping) {
    data['freeShipping'] = freeShipping
  }
  if (shippingCharges) {
    data['shippingCharges'] = shippingCharges
  }
  if (shippingDays) {
    data['shippingDays'] = shippingDays
  }
  if (countryOfSale) {
    data['countryOfSale'] = countryOfSale
  }
  if (freeInternationally) {
    data['freeInternationally'] = freeInternationally
  }
  if (color) {
    data['color'] = color
  }
  if (size) {
    data['size'] = size
  }
  if (sku) {
    data['sku'] = sku
  }
  if (manufacturePartNo) {
    data['manufacturePartNo'] = manufacturePartNo
  }
  if (productSerialNo) {
    data['productSerialNo'] = productSerialNo
  }
  if (terms) {
    data['terms'] = terms
  }
  if (tags) {
    data['tags'] = tags
  }

  if (Object.keys(data).length > 0) {
    const product = await Product.findByIdAndUpdate(id, data, {
      new: true
    })

    if (!product) {
      return res.status(404).send({ error: 'Product Not Found' })
    }

    res.status(200).json({
      message: 'Product Updated successfully.',
      product: product
    })
  } else {
    return res.status(422).json({
      error: 'Kindly, Provide an valid attribute to update.'
    })
  }
}

exports.UpdateImage = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //     return res.status(422).json({ error: errors.array() });
  // }
  // console.log(req.files)

  const { id } = req.params
  const { imageType, imageCount } = req.body

  const product = await Product.findById(id)

  if (!product) {
    return res.status(404).send({ error: 'Product Not Found' })
  }

  if (imageType === 'main') {
    if (req.file !== undefined) {
      const { destination, filename } = req.file
      let image = createImageUrl(destination, filename)
      if (product.mainImage) {
        const path = getImagePath(product.mainImage)
        if (fs.existsSync(path)) {
          fs.unlinkSync(path)
        }
      }
      product.mainImage = image
    }
  } else if (imageType === 'secondary') {
    if (req.file !== undefined) {
      const { destination, filename } = req.file
      let image = createImageUrl(destination, filename)

      if (imageCount == 1) {
        if (product.additionalImage1) {
          const path = getImagePath(product.additionalImage1)
          if (fs.existsSync(path)) {
            fs.unlinkSync(path)
          }
        }
        product.additionalImage1 = image
      } else if (imageCount == 2) {
        if (product.additionalImage2) {
          const path = getImagePath(product.additionalImage2)
          if (fs.existsSync(path)) {
            fs.unlinkSync(path)
          }
        }
        product.additionalImage2 = image
      } else if (imageCount == 2) {
        if (product.additionalImage3) {
          const path = getImagePath(product.additionalImage3)
          if (fs.existsSync(path)) {
            fs.unlinkSync(path)
          }
        }
        product.additionalImage3 = image
      }
    }
  } else {
    return res.status(400).send({ error: 'Image type is invalid' })
  }

  try {
    const newProduct = await product.save()
    res.json({
      message: 'Images Updated Successfully'
    })
  } catch (error) {
    res.status(422).json({ error: error })
  }
}

exports.UpdateImages = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //     return res.status(422).json({ error: errors.array() });
  // }
  // console.log(req.files)
  const { id } = req.params
  const {
    mainImage,
    additionalImage1,
    additionalImage2,
    additionalImage3,
    additionalImage4,
    additionalImage5
  } = req.files
  const product = await Product.findById(id)

  if (!product) {
    return res.status(404).send({ error: 'Product Not Found' })
  }

  if (req.files !== undefined) {
    if (mainImage) {
      const { destination, filename } = mainImage[0]
      let image = createImageUrl(destination, filename)
      if (product.mainImage) {
        const path = getImagePath(product.mainImage)
        if (fs.existsSync(path)) {
          fs.unlinkSync(path)
        }
      }
      product.mainImage = image
    }
    if (additionalImage1) {
      const { destination, filename } = additionalImage1[0]
      let image = createImageUrl(destination, filename)
      if (product.additionalImage1) {
        const path = getImagePath(product.additionalImage1)
        if (fs.existsSync(path)) {
          fs.unlinkSync(path)
        }
      }
      product.additionalImage1 = image
    }
    if (additionalImage2) {
      const { destination, filename } = additionalImage2[0]
      let image = createImageUrl(destination, filename)
      if (product.additionalImage2) {
        const path = getImagePath(product.additionalImage2)
        if (fs.existsSync(path)) {
          fs.unlinkSync(path)
        }
      }
      product.additionalImage2 = image
    }
    if (additionalImage3) {
      const { destination, filename } = additionalImage3[0]
      let image = createImageUrl(destination, filename)
      if (product.additionalImage3) {
        const path = getImagePath(product.additionalImage3)
        if (fs.existsSync(path)) {
          fs.unlinkSync(path)
        }
      }
      product.additionalImage3 = image
    }
    if (additionalImage4) {
      const { destination, filename } = additionalImage4[0]
      let image = createImageUrl(destination, filename)
      if (product.additionalImage4) {
        const path = getImagePath(product.additionalImage4)
        if (fs.existsSync(path)) {
          fs.unlinkSync(path)
        }
      }
      product.additionalImage4 = image
    }
    if (additionalImage5) {
      const { destination, filename } = additionalImage5[0]
      let image = createImageUrl(destination, filename)
      if (product.additionalImage5) {
        const path = getImagePath(product.additionalImage5)
        if (fs.existsSync(path)) {
          fs.unlinkSync(path)
        }
      }
      product.additionalImage5 = image
    }
  } else {
    return res.status(422).send({ error: 'No file found' })
  }

  try {
    const newProduct = await product.save()
    res.json({
      message: 'Image Updated Successfully',
      product: product
    })
  } catch (error) {
    res.status(422).json({ error: error })
  }
}

exports.UpdateStock = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  }

  const { id, action, qty } = req.body

  const product = await Product.findById(id)

  if (action === 'add') {
    product.quantity = product.quantity + qty
  } else if (product.quantity - qty >= 0) {
    product.quantity = product.quantity - qty
  } else {
    return res
      .status(400)
      .send({ error: "Quantity can't be in negative" })
  }

  try {
    const newProduct = await product.save()
    res.json({
      message: 'Product Qauntity updated successfully.',
      product: product
    })
  } catch (error) {
    res.status(422).json({ error: error })
  }
}

exports.StatusChanged = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  }

  const { id, status } = req.body

  const product = await Product.findByIdAndUpdate(
    id,
    { activated: status },
    { new: true }
  )

  if (!product) {
    return res.status(404).send({ error: 'Product Not Found' })
  }

  res.status(200).json({
    message: 'Status Chaged successfully.',
    changedStatus: product.activated
  })
}

exports.GetReviews = (req, res) => {
  const { id } = req.params
  Feedback.aggregate([
    {
      $match: {
        productId: mongoose.Types.ObjectId(id)
      }
    },
    {
      $facet: {
        allFeedbackTexts: [
          {
            $lookup: {
              from: 'users',
              localField: 'buyerId',
              foreignField: '_id',
              as: 'buyer'
            }
          },
          { $unwind: '$buyer' },
          {
            $project: {
              feedbackText: 1,
              stars: { $divide: [{ $sum: ["$description", "$time", "$communication"] }, 3] },
              buyer: { firstName: 1, lastName: 1 }
            }
          }
        ],
        allRatings: [
          {
            $group: {
              _id: '$stars',
              count: { $sum: 1 },
              averageRating: { $avg: '$stars' }
            }
          },
          {
            $sort: {
              _id: -1
            }
          },
          {
            $group: {
              _id: null,
              allReviews: {
                $push: { stars: '$_id', count: '$count' }
              },
              averageRating: { $avg: '$averageRating' }
            }
          }
        ]
      }
    }
  ])
    .then(results => {
      res.status(200).json({
        message: 'Fetched Reviews successfully.',
        reviews: results[0]
      })
    })
    .catch(error => res.status(400).send({ error: error }))
}

exports.GetRating = (req, res) => {
  const { id } = req.params
  Feedback.aggregate([
    {
      $match: {
        productId: mongoose.Types.ObjectId(id)
      }
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
        averageDescriptionRating: { $avg: '$description' },
        averageTimeRating: { $avg: '$time' },
        averageCommunicationRating: { $avg: '$communication' }
      }
    },
    {
      $project: {
        averageDescriptionRating: 1,
        averageTimeRating: 1,
        averageCommunicationRating: 1,
        total: { $divide: [{ $sum: ["$averageDescriptionRating", "$averageTimeRating", "$averageCommunicationRating"] }, 3] }
      }
    }
  ])
    .then(results => {
      res.status(200).json({
        message: 'Fetched Rating successfully.',
        rating: results[0]
      })
    })
    .catch(error => res.status(400).send({ error: error }))
}

exports.GetLatestProduct = async (req, res) => {
  const product = await Product.findOne({ "seller": req.decoded.userId })
    .populate('category')
    .sort({ 'createdAt': -1 })

  let categories = []
  if (product){
    if (product.category.parent) {
      const Parentcategory = await Category.findOne({ "_id": product.category.parent})
      categories.push(Parentcategory._id, product.category._id)
    } else {
      categories.push(product.category._id)
    }
  }
  
  res.status(200).json({
    message: 'Fetched Product successfully.',
    product: product,
    category: categories
  })
}
