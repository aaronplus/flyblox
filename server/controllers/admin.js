// const mongoose = require("mongoose");
// const moment = require("moment");
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const fs = require('fs')
const { MY_SECRET_KEY } = require('../config/constants')
const User = require('../models/User')
const Order = require('../models/Order')
const Token = require('../models/Token')
const Product = require('../models/Product')
const Category = require('../models/Category')
const GenerateToken = require('../utils/tokkenGenerator')
const createImageUrl = require('../utils/createImageUrl')
const getImagePath = require('../utils/getImagePath')

//Login user Controller
exports.login = async (req, res) => {
  const { identifier, password } = req.body
  
  // const errors = validationResult(req)
  // if (!errors.isEmpty()) {
  //   return res.status(422).json({ error: errors.array() })
  // }

  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }]
  })
  if (!user) {
    return res.status(404).send({ error: 'Email Not Found' })
  }
  if (user.role != "Admin") {
    return res.status(404).send({ error: 'Email Not Found' })
  }
  user
    .comparePassword(password)
    .then(result => {
      if (result) {
        const token = jwt.sign({ userId: user._id }, MY_SECRET_KEY)
        res.status(200).json({
          message: 'Logged in successfully.',
          token: token
        })
      } else {
        res.status(401).send({ error: 'Invalid Password or email.' })
      }
    })
    .catch(err => {
      res.status(500).send({ error: err })
    })
}

//Login user Controller
exports.getUsers = async (req, res) => {
  const { title_contains } = req.query
  let aggregatePipeline = []
  aggregatePipeline.push({ $sort: { createdAt: 1 } })
  if (title_contains) {
    aggregatePipeline.push({
      $match: { firstName: { $regex: title_contains, $options: 'i' } }
    })
  }

  User.aggregate(aggregatePipeline)
    .then(results =>
      res.status(200).json({
        message: 'User List Success.',
        users: results
      })
    )
    .catch(error => res.status(400).send({ error: error }))
}

exports.getProducts = async (req, res) => {
  const products = await Product.find()
  if (!products) {
    return res.status(404).send({ error: 'No Products Found' })
  }
  res.status(200).json({
    message: 'Products List Success.',
    products: products
  })
}
exports.addCategory = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  }

  const { name, parent } = req.body
  const category = new Category({ name, parent })

  if (req.file !== undefined) {
    const { destination, filename } = req.file
    image = createImageUrl(destination, filename)
    category.thumbnail = image
  }

  try {
    const newCategory = await category.save()
    res.json({
      message: 'Category added successfully.',
      category: newCategory
    })
  } catch (error) {
    res.status(422).json({ error: error })
  }
}
exports.getCategories = async (req, res) => {
  const { title_contains } = req.query
  const categories = await Category.aggregate([
    { $match: { name: { $regex: title_contains, $options: 'i' } } },
    {
      $addFields: {
        label: '$name',
        value: '$_id'
      }
    }
  ])
  // const categories = await Category.aggregate([
  //   {
  //     $lookup: {
  //       from: "categories",
  //       localField: "_id",
  //       foreignField: "parent",
  //       as: "childrens",
  //     },
  //   },
  // ]);
  if (!categories) {
    return res.status(404).send({ error: 'No Categories Found' })
  }
  res.status(200).json({
    message: 'Categories List Success.',
    categories: categories
  })
}

exports.GetById = (req, res) => {
  const { id } = req.params
  Category.findById(id)
    .then(result =>
      res.status(200).json({
        message: 'Fetched Category successfully.',
        category: result
      })
    )
    .catch(error => res.status(400).send({ error: error }))
}

exports.updateCategory = async (req, res) => {
  const { id } = req.params
  const { name, thumbnail } = req.body
  const category = await Category.findOne({ _id: id })
  let image = thumbnail
  if (req.file !== undefined) {
    const { destination, filename } = req.file
    image = createImageUrl(destination, filename)
  }
  await Category.findByIdAndUpdate(id, {
    name: name,
    thumbnail: image
  })
    .then(() => {
      res.status(200).json({
        message: 'Category successfully Updated.'
      })
    })
    .catch(error => {
      console.log('error', error)
      res.status(400).send({ error: error })
    })
}

exports.removeCategory = (req, res) => {
  const { id } = req.params
  Category.findOneAndDelete({ _id: id })
    .then(() =>
      res.status(200).json({
        message: 'Category successfully Removed.'
      })
    )
    .catch(error => res.status(400).send({ error: error }))
}

exports.getOrders = async (req, res) => {
  const orders = await Order.find()
  if (!orders) {
    return res.status(404).send({ error: 'No Orders Found' })
  }
  res.status(200).json({
    message: 'Orders List Success.',
    orders: orders
  })
}

exports.getTokens = async (req, res) => {
  const tokens = await Token.find()
  if (!tokens) {
    return res.status(404).send({ error: 'No Token Found' })
  }
  res.status(200).json({
    message: 'Tokens List.',
    tokens: tokens
  })
}
