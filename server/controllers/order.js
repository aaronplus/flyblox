const Order = require('../models/Order')
const { validationResult } = require('express-validator')
const Product = require('../models/Product')
const Feedback = require('../models/Feedback')
const Dispute = require('../models/Dispute')
const mongoose = require('mongoose')
const GenerateOrderNo = require('../utils/orderNoGenerator')
const Cart = require('../models/Cart')
const { sendEmail } = require('../config/email')
const orderConfirmedMailToBuyer = require('../mailers/orderConfirmedMailToBuyer')
const orderConfirmedMailToSeller = require('../mailers/orderConfirmedMailToSeller')

exports.Add = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //     return res.status(422).json({ error: errors.array() });
  // }

  const {
    orderItems,
    status,
    shippingDate,
    shippingAddress,
    token,
    seller,
    orderNo,
    total,
    contract,
    shippingCharges
  } = req.body
  // const orderNo = GenerateOrderNo(8)
  // let total = 0
  var items = await Promise.all(
    orderItems.map(async (item) => {
      const product = await Product.findOne({ _id: item.id })
      if (product) {
        item['product'] = item.id
        item['seller'] = product.seller
        item['total'] = item.quantity * item.amount
        // total += product.sellingPrice
      }
      const newquantity = product.quantity - item['quantity']
      const updateproduct = await Product.findOneAndUpdate(
        { _id: item.id },
        { quantity: newquantity },
        { new: true }
      )

      return item
    })
  )

  const order = new Order({
    orderItems: items,
    // buyer: "61f3298b7b8d8f75ea2b8141",
    buyer: req.decoded.userId,
    total,
    status: 'on the way',
    orderNo,
    // sellers: sellers,
    token: token,
    seller: seller,
    shippingDate: shippingDate,
    shippingAddress: shippingAddress,
    contract: contract._id,
    shippingCharges: shippingCharges
  })

  try {
    const newOrder = await order.save()
    let orderData = await Order.findOne({ _id: newOrder._id }).populate('seller', 'email firstName username').populate('buyer', 'firstName email')
    orderConfirmedMailToBuyer(orderData)
    orderConfirmedMailToSeller(orderData)
    res.status(200).json({
      message: 'Order placed successfully.',
      orderNo: newOrder.orderNo,
    })
  } catch (error) {
    console.log('error', error)
    res.status(422).json({ error: error })
  }
}

exports.GetAll = (req, res) => {
  Order.find()
    .then((results) =>
      res.status(200).json({
        message: 'Fetched Orders successfully.',
        orders: results,
      })
    )
    .catch((error) => res.status(400).send({ error: error }))
}

exports.GetByQuery = (req, res) => {
  const { page, limit, filter, title_contains } = req.query
  let aggregatePipeline = []

  if (filter) {
    let filterQuery
    switch (filter) {
      case 'latest':
        filterQuery = { createdAt: -1 }
        break
      default:
        filterQuery = { createdAt: 1 }
        break
    }
    aggregatePipeline.push({ $sort: filterQuery })
  }

  if (title_contains) {
    aggregatePipeline.push({
      $match: { name: { $regex: title_contains, $options: 'i' } },
    })
  }

  if (page) {
    aggregatePipeline.push({ $skip: (page - 1) * limit })
  }

  if (limit) {
    aggregatePipeline.push({ $limit: limit * 1 })
  }

  aggregatePipeline.push({
    $lookup: {
      from: 'users',
      let: { buyerId: '$buyer' },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ['$_id', '$$buyerId'] },
          },
        },
        { $project: { firstName: 1, walletAddress: 1 } },
      ],
      as: 'buyer',
    },
  })
  aggregatePipeline.push({
    $unwind: '$buyer',
  })
  aggregatePipeline.push({
    $lookup: {
      from: 'users',
      let: { sellerId: '$seller' },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ['$_id', '$$sellerId'] },
          },
        },
        { $project: { firstName: 1, walletAddress: 1 } },
      ],
      as: 'seller',
    },
  })
  aggregatePipeline.push({
    $unwind: '$seller',
  })

  Order.aggregate(aggregatePipeline)
    .then((results) =>
      res.status(200).json({
        message: 'Fetched Orders successfully.',
        orders: results,
      })
    )
    .catch((error) => res.status(400).send({ error: error }))
}

exports.GetByStatus = (req, res) => {
  const { status } = req.body

  Order.find({ status })
    .sort({ shippingDate: 1 })
    .then((results) =>
      res.status(200).json({
        message: 'Fetched Orders successfully.',
        orders: results,
      })
    )
    .catch((error) => res.status(400).send({ error: error }))
}
exports.GetSellerOrders = async (req, res) => {
  const { userId } = req.decoded
  Order.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'buyer',
        foreignField: '_id',
        as: 'buyer',
      },
    },
    {
      $addFields: {
        orderItems: {
          $filter: {
            input: '$orderItems',
            as: 'orderItems',
            cond: {
              $eq: ['$$orderItems.seller', mongoose.Types.ObjectId(userId)],
            },
          },
        },
      },
    },
    {
      $unwind: '$orderItems',
    },
  ])
    .then((results) => {
      res.status(200).json({
        message: 'Fetched Orders successfully.',
        orders: results,
      })
    })
    .catch((error) => {
      res.status(400).send(error)
    })
}

exports.GetBuyerOrders = (req, res) => {
  const { userId } = req.decoded
  Order.aggregate([
    {
      $match: {
        buyer: mongoose.Types.ObjectId(userId),
      },
    },
    {
      $unwind: '$orderItems',
    },
    {
      $lookup: {
        from: 'users',
        let: { userId: '$orderItems.seller' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$_id', '$$userId'] },
            },
          },
          { $project: { firstName: 1, lastName: 1, email: 1 } },
        ],
        as: 'seller',
      },
    },
    {
      $unwind: '$seller',
    },
    {
      $lookup: {
        from: 'users',
        let: { userId: '$buyer' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$_id', '$$userId'] },
            },
          },
          { $project: { firstName: 1, lastName: 1 } },
        ],
        as: 'buyer',
      },
    },
    {
      $unwind: '$buyer',
    },
    {
      $lookup: {
        from: 'products',
        let: { productId: '$orderItems.product' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$_id', '$$productId'] },
            },
          },
          { $project: { name: 1 } },
        ],
        as: 'product',
      },
    },
    {
      $unwind: '$product',
    },
  ])
    .then((results) => {
      res.status(200).json({
        message: 'Fetched Orders successfully.',
        orders: results,
      })
    })
    .catch((error) => {
      res.status(400).send(error)
    })
}

exports.Edit = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //     return res.status(422).json({ error: errors.array() });
  // }

  const { id } = req.params
  const {
    product,
    seller,
    buyer,
    quantity,
    token,
    amount,
    status,
    shippingDate,
  } = req.body

  const data = {}
  if (product) {
    data['product'] = product
  }
  if (seller) {
    data['seller'] = seller
  }
  if (buyer) {
    data['buyer'] = buyer
  }
  if (quantity) {
    data['quantity'] = quantity
  }
  if (token) {
    data['token'] = token
  }
  if (amount) {
    data['amount'] = amount
  }
  if (status) {
    data['status'] = status
  }
  if (shippingDate) {
    data['shippingDate'] = shippingDate
  }

  const order = await Order.findByIdAndUpdate(id, data, { new: true })

  if (!order) {
    return res.status(404).send({ error: 'Order Not Found' })
  }

  res.status(200).json({
    message: 'Order Modified successfully.',
    order: order,
  })
}

exports.changeStatus = async (req, res) => {
  const { id } = req.params
  const { action, orderItemId } = req.body
  let order
  if (action === 'Product Sent') {
    order = await Order.updateOne(
      {
        _id: mongoose.Types.ObjectId(id),
        'orderItems._id': mongoose.Types.ObjectId(orderItemId),
      },
      {
        $set: {
          'orderItems.$.status': 'Shipped',
        },
      }
    )
  } else if (action === 'Product Received') {
    order = await Order.updateOne(
      {
        _id: mongoose.Types.ObjectId(id),
        'orderItems._id': mongoose.Types.ObjectId(orderItemId),
      },
      {
        $set: {
          'orderItems.$.status': 'Received',
        },
      }
    )
  } else if (action === 'Product Claimed') {
    order = await Order.updateOne(
      {
        _id: mongoose.Types.ObjectId(id),
        'orderItems._id': mongoose.Types.ObjectId(orderItemId),
      },
      {
        $set: {
          'orderItems.$.status': 'Claimed',
        },
      }
    )
  }

  if (!order) {
    return res.status(404).send({ error: 'Order Not Found' })
  }

  res.status(200).json({
    message: 'Order Modified successfully.',
    order: order,
  })
}

exports.addOrderFeedback = async (req, res) => {
  const { orderId } = req.params
  const {
    sellerId,
    buyerId,
    productId,
    stars,
    description,
    time,
    communication,
    feedbackText,
  } = req.body
  const isFeedbackExist = sellerId
    ? await Feedback.findOne({ orderId, productId, sellerId })
    : await Feedback.findOne({ orderId, productId, buyerId })
  if (isFeedbackExist) {
    try {
      const feedback = sellerId
        ? await Feedback.findByIdAndUpdate(
          isFeedbackExist._id,
          { stars, feedbackText },
          { new: true }
        )
        : await Feedback.findByIdAndUpdate(
          isFeedbackExist._id,
          { description, time, communication, feedbackText },
          { new: true }
        )

      res.status(200).json({
        message: 'Account Updated successfully.',
        feedbackId: feedback._id,
      })
    } catch (error) {
      console.log('error', error)
      res.status(422).json({ error: error })
    }
  } else {
    try {
      const feedback = new Feedback({
        orderId,
        sellerId,
        buyerId,
        productId,
        stars,
        description,
        time,
        communication,
        feedbackText,
      })
      const newFeedBack = await feedback.save()

      res.status(200).json({
        message: 'FeedBack given Successfully',
        feedbackId: newFeedBack._id,
      })
    } catch (error) {
      console.log('error', error)
      res.status(422).json({ error: error })
    }
  }
}

exports.GetOrderFeedbackByBuyer = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  }

  const { orderId, productId } = req.body
  const { userId } = req.decoded

  Feedback.findOne({ orderId, productId, buyerId: userId })
    .then((results) =>
      res.status(200).json({
        message: 'Fetched Order Feedback successfully.',
        orderFeedback: results,
      })
    )
    .catch((error) => res.status(400).send({ error: error }))
}

exports.GetOrderFeedbackBySeller = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  }

  const { orderId, productId } = req.body
  const { userId } = req.decoded
  Feedback.findOne({ orderId, productId, sellerId: userId })
    .then((results) =>
      res.status(200).json({
        message: 'Fetched Order Feedback successfully.',
        orderFeedback: results,
      })
    )
    .catch((error) => res.status(400).send({ error: error }))
}

exports.GetSales = (req, res) => {
  const FIRST_MONTH = 1
  const LAST_MONTH = 12
  const MONTHS_ARRAY = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  let TODAY = new Date()
  let YEAR_BEFORE = new Date(
    new Date().setFullYear(new Date().getFullYear() - 1)
  )

  Order.aggregate([
    {
      $match: {
        createdAt: { $gte: YEAR_BEFORE, $lte: TODAY },
      },
    },
    {
      $group: {
        _id: { year_month: { $substrCP: ['$createdAt', 0, 7] } },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { '_id.year_month': 1 },
    },
    {
      $project: {
        _id: 0,
        count: 1,
        month_year: {
          $concat: [
            {
              $arrayElemAt: [
                MONTHS_ARRAY,
                {
                  $subtract: [
                    {
                      $toInt: { $substrCP: ['$_id.year_month', 5, 2] },
                    },
                    1,
                  ],
                },
              ],
            },
            '-',
            { $substrCP: ['$_id.year_month', 0, 4] },
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        data: { $push: { k: '$month_year', v: '$count' } },
      },
    },
    {
      $addFields: {
        start_year: { $substrCP: [YEAR_BEFORE, 0, 4] },
        end_year: { $substrCP: [TODAY, 0, 4] },
        months1: {
          $range: [
            { $toInt: { $substrCP: [YEAR_BEFORE, 5, 2] } },
            { $add: [LAST_MONTH, 1] },
          ],
        },
        months2: {
          $range: [
            FIRST_MONTH,
            { $add: [{ $toInt: { $substrCP: [TODAY, 5, 2] } }, 1] },
          ],
        },
      },
    },
    {
      $addFields: {
        template_data: {
          $concatArrays: [
            {
              $map: {
                input: '$months1',
                as: 'm1',
                in: {
                  count: 0,
                  month_year: {
                    $concat: [
                      {
                        $arrayElemAt: [
                          MONTHS_ARRAY,
                          { $subtract: ['$$m1', 1] },
                        ],
                      },
                      '-',
                      '$start_year',
                    ],
                  },
                },
              },
            },
            {
              $map: {
                input: '$months2',
                as: 'm2',
                in: {
                  count: 0,
                  month_year: {
                    $concat: [
                      {
                        $arrayElemAt: [
                          MONTHS_ARRAY,
                          { $subtract: ['$$m2', 1] },
                        ],
                      },
                      '-',
                      '$end_year',
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    },
    {
      $addFields: {
        data: {
          $map: {
            input: '$template_data',
            as: 't',
            in: {
              k: '$$t.month_year',
              v: {
                $reduce: {
                  input: '$data',
                  initialValue: 0,
                  in: {
                    $cond: [
                      { $eq: ['$$t.month_year', '$$this.k'] },
                      { $add: ['$$this.v', '$$value'] },
                      { $add: [0, '$$value'] },
                    ],
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      $project: {
        data: { $arrayToObject: '$data' },
        _id: 0,
      },
    },
  ])
    .then((results) =>
      res.status(200).json({
        message: 'Fetched Sales successfully.',
        sales: results[0].data,
      })
    )
    .catch((error) => res.status(400).send({ error: error }))
}

exports.AddTrackingNumber = async (req, res) => {
  const { orderId } = req.params
  const { trackingNumber } = req.body
  await Order.findByIdAndUpdate(orderId, { trackingNumber: trackingNumber })
    .then(() => {
      res.status(200).json({
        message: 'Tracking Number successfully Updated.',
      })
    })
    .catch((error) => {
      console.log('error', error)
      res.status(400).send({ error: error })
    })
}

exports.addOrderDispute = async (req, res) => {
  console.log('hi')
  const { orderId } = req.params
  const {
    orderItemId,
    productId,
    details,
    buyerName,
    sellerName,
    sellerEmail,
  } = req.body

  const order = await Order.findOne({
    _id: mongoose.Types.ObjectId(orderId),
    'orderItems._id': mongoose.Types.ObjectId(orderItemId),
  })

  if (!order) {
    return res.status(404).send({ error: 'Order Not Found' })
  }

  const isDisputeExist = await Dispute.findOne({ orderId, productId })
  if (isDisputeExist) {
    res.status(422).json({
      message: 'Dispute has already been created.',
    })
  } else {
    try {
      const dispute = new Dispute({
        orderId,
        productId,
        details,
        status: 'Open',
        messages: [{ text: details, name: buyerName }],
      })
      const newDispute = await dispute.save()

      const updateOrder = await Order.updateOne(
        {
          _id: mongoose.Types.ObjectId(orderId),
          'orderItems._id': mongoose.Types.ObjectId(orderItemId),
        },
        {
          $set: {
            'orderItems.$.status': 'On Hold',
          },
        }
      )
      if (!updateOrder) {
        res.status(422).json({
          message: 'Order Status not got updated.',
        })
      }
      //send mail to Admin
      sendEmail({
        from: process.env.SMTP_USER, // sender address
        to: process.env.ADMIN_EMAIL, // list of receivers
        subject: `Dispute ${productId}`, // Subject line
        text: `${details}`, // plain text body
        html: `<b>${details}</b>`, // html body
      })

      //send mail to Seller
      let template = `Hi ${sellerName},<br/>
      ${buyerName} has created dispute for order ${orderId} - product ${productId}. Please see comments below.<br/>
      ${details}<br/>
      Kind Regards<br/>
      Team @ Flybox<br/>`

      sendEmail({
        from: process.env.SMTP_USER, // sender address
        to: `${sellerEmail}`, // list of receivers
        subject: `Dispute created - Order ${orderId} - Product ${productId}`, // Subject line
        text: template, // plain text body
        html: template, // html body
      })

      res.status(200).json({
        message: 'Dispute given Successfully',
        disputeId: newDispute._id,
      })
    } catch (error) {
      console.log('error', error)
      res.status(422).json({ error: error })
    }
  }
}

exports.GetOrderDispute = async (req, res) => {
  const { orderId, productId } = req.body

  let Aggregate = [
    {
      $match: {
        orderId: mongoose.Types.ObjectId(orderId),
        productId: mongoose.Types.ObjectId(productId),
      },
    },
    {
      $lookup: {
        from: 'orders',
        localField: 'orderId',
        foreignField: '_id',
        as: 'order',
      },
    },
    {
      $unwind: '$order',
    },
    {
      $lookup: {
        from: 'users',
        let: { buyerId: '$order.buyer' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$_id', '$$buyerId'] },
            },
          },
          { $project: { firstName: 1, lastName: 1 } },
        ],
        as: 'buyer',
      },
    },
    {
      $unwind: '$buyer',
    },
  ]
  Dispute.aggregate([Aggregate])
    .then((results) => {
      res.status(200).json({
        message: 'Fetched Order Dispute',
        orderDispute: results[0],
      })
    })
    .catch((error) => res.status(400).send({ error: error }))
}

exports.GetOrderDisputes = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  }

  const { userId } = req.decoded
  console.log('UId', userId)
  let Aggregate = [
    {
      $match: {
        status: 'Open',
      },
    },
    {
      $lookup: {
        from: 'orders',
        localField: 'orderId',
        foreignField: '_id',
        as: 'order',
      },
    },
    {
      $unwind: '$order',
    },
    {
      $match: {
        $or: [
          { 'order.seller': mongoose.Types.ObjectId(userId) },
          { 'order.buyer': mongoose.Types.ObjectId(userId) },
        ],
      },
    },
    {
      $lookup: {
        from: 'users',
        let: { sellerId: '$order.seller' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$_id', '$$sellerId'] },
            },
          },
          { $project: { firstName: 1, lastName: 1 } },
        ],
        as: 'seller',
      },
    },
    {
      $unwind: '$seller',
    },
    {
      $lookup: {
        from: 'users',
        let: { buyerId: '$order.buyer' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$_id', '$$buyerId'] },
            },
          },
          { $project: { firstName: 1, lastName: 1 } },
        ],
        as: 'buyer',
      },
    },
    {
      $unwind: '$buyer',
    },
    {
      $addFields: {
        user: mongoose.Types.ObjectId(userId),
      },
    },
  ]

  // Aggregate.push(
  //   {
  //     $lookup: {
  //       from: 'products',
  //       localField: 'productId',
  //       foreignField: '_id',
  //       as: 'product',
  //     },
  //   },
  //   {
  //     $unwind: '$product',
  //   }
  // )

  Dispute.aggregate([Aggregate])
    .then((results) => {
      res.status(200).json({
        message: 'Fetched Order Disputes.',
        orderDisputes: results,
      })
    })
    .catch((error) => res.status(400).send({ error: error }))
}

exports.GetOrderDisputesByAdmin = async (req, res) => {
  Dispute.aggregate([
    {
      $match: {
        status: 'Open',
      },
    },
    {
      $lookup: {
        from: 'orders',
        localField: 'orderId',
        foreignField: '_id',
        as: 'order',
      },
    },
    {
      $unwind: '$order',
    },
  ])
    .then((results) => {
      res.status(200).json({
        message: 'Fetched Order Disputes.',
        orderDisputes: results,
      })
    })
    .catch((error) => res.status(400).send({ error: error }))
}

exports.AddDisputeMessage = async (req, res) => {
  const { id } = req.params
  const { text, name } = req.body
  const isDisputeExist = await Dispute.findById(id)
  if (!isDisputeExist) {
    res.status(422).json({
      message: 'Dispute not found.',
    })
  } else {
    let newMessages = isDisputeExist.messages
    newMessages.push({ text, name })

    console.log('id', id)
    console.log('N', newMessages)
    const updatedDispute = await Dispute.findOneAndUpdate(
      { _id: id },
      { messages: newMessages },
      { new: true }
    )

    console.log('updatedDispute', updatedDispute)
    if (!updatedDispute) {
      return res.status(404).send({ error: 'Dispute Not Found' })
    }

    res.status(200).json({
      message: 'Message Added Successfully.',
    })
  }
}

exports.CloseDispute = async (req, res) => {
  const { id } = req.params
  const { orderId, orderItemId } = req.body
  const isDisputeExist = await Dispute.findById(id)
  if (!isDisputeExist) {
    res.status(422).json({
      message: 'Dispute not found.',
    })
  } else {
    let order = await Order.updateOne(
      {
        _id: mongoose.Types.ObjectId(orderId),
        'orderItems._id': mongoose.Types.ObjectId(orderItemId),
      },
      {
        $set: {
          'orderItems.$.status': 'Received',
        },
      }
    )

    if (!order) {
      return res.status(404).send({ error: 'Order Not Found' })
    }

    const updatedDispute = await Dispute.findOneAndUpdate(
      { _id: id },
      { status: 'Closed' },
      { new: true }
    )

    if (!updatedDispute) {
      return res.status(404).send({ error: 'Dispute Not Found' })
    }

    res.status(200).json({
      message: 'Message Added Successfully.',
    })
  }
}


//send mail to Seller
// let template = `Great news, you have sold an item.`<br/>
// <br />
// Post item to:
// {Customer First Name and Last Name }
// {Address) { City }
//   { State }, { Country }, { Postcode }

// Items Sold
//   {Item name } - Quantity - { quantity }
//       Kind Regards<br/>
//       Team @ Flybox<br/>`

// sendEmail({
//   from: process.env.SMTP_USER, // sender address
//   to: `${sellerEmail}`, // list of receivers
//   subject: `Dispute created - Order ${orderId} - Product ${productId}`, // Subject line
//   text: template, // plain text body
//   html: template, // html body
// })