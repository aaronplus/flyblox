const User = require('../models/User')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { validationResult } = require('express-validator')
const CreateImageUrl = require('../utils/createImageUrl')
const GetImagePath = require('../utils/getImagePath')
const fs = require('fs')
const moment = require("moment");

exports.GetUser = (req, res) => {
  const { userId } = req.decoded
  User.findById(userId)
    .then((results) =>
      res.status(200).json({
        message: 'Fetched User successfully.',
        user: results,
      })
    )
    .catch((error) => res.status(400).send({ error: err }))
}

exports.UpdateAccount = async (req, res) => {
  if (Object.keys(req.body).length <= 0 && req.file === undefined) {
    return res
      .status(422)
      .json({ error: 'Kindly, Provide an attribute to update.' })
  }

  const { userId } = req.decoded
  const {
    firstName,
    lastName,
    username,
    email,
    gender,
    phone,
    addresses,
    dob,
    walletAddress,
  } = req.body

  const data = {}
  if (firstName) {
    data['firstName'] = firstName
  }
  if (lastName) {
    data['lastName'] = lastName
  }
  if (username) {
    data['username'] = username
  }
  if (email) {
    const ownEmail = await User.findById(userId)
    let isOwnEmail = email === ownEmail.email
    const isEmailExist = await User.findOne({ email })
    if (isEmailExist && !isOwnEmail) {
      return res.status(400).json({ error: 'Email already exist.' })
    }
    data['email'] = email
  }
  if (gender) {
    data['gender'] = gender
  }
  if (phone) {
    data['phone'] = phone
  }
  if (addresses) {
    data['addresses'] = JSON.parse(addresses)
  }
  if (dob) {
    data['dob'] = dob
  }
  if (walletAddress) {
    data['walletAddress'] = walletAddress
  }
  if (req.file !== undefined) {
    const { destination, filename } = req.file

    image = CreateImageUrl(destination, filename)
    data['photo'] = image
    const IsImageExist = await User.findById(userId)
    if (IsImageExist.photo) {
      const path = GetImagePath(IsImageExist.photo)
      if (fs.existsSync(path)) {
        fs.unlinkSync(path)
      }
    }
  }

  if (Object.keys(data).length > 0 || req.file !== undefined) {
    const user = await User.findByIdAndUpdate(userId, data, { new: true })

    if (!user) {
      return res.status(404).send({ error: 'User Not Found' })
    }

    res.status(200).json({
      message: 'Account Updated successfully.',
      user: user,
    })
  } else {
    return res
      .status(422)
      .json({ error: 'Kindly, Provide an valid attribute to update.' })
  }
}

exports.UpdateAuthentication = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  }

  const { userId } = req.decoded
  const { activated } = req.body

  const user = await User.findByIdAndUpdate(
    userId,
    { twofactorauth: activated },
    { new: true }
  )

  if (!user) {
    return res.status(404).send({ error: 'User Not Found' })
  }

  res.status(200).json({
    message: 'Authentication Updated successfully.',
    user: user,
  })
}

exports.ChangeStatus = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  }

  const { userId } = req.decoded
  const { status } = req.body

  const user = await User.findByIdAndUpdate(
    userId,
    { activated: status },
    { new: true }
  )

  if (!user) {
    return res.status(404).send({ error: 'User Not Found' })
  }

  res.status(200).json({
    message: 'Authentication Updated successfully.',
    user: user,
  })
}

exports.ChangePassword = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  }

  const { userId } = req.decoded
  const { currentPassword, newPassword } = req.body

  const user = await User.findById({ _id: userId })

  if (!user) {
    return res.status(404).send({ error: 'User Not Found' })
  }

  user
    .comparePassword(newPassword)
    .then((result) => {
      if (result) {
        res.status(400).json({
          message: 'Use password other than your old password',
        })
      }
    })
    .catch((err) => {
      res.status(500).send({ error: err })
    })

  user
    .comparePassword(currentPassword)
    .then((result) => {
      if (result) {
        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            res.status(500).send({ error: err })
          }

          bcrypt.hash(newPassword, salt, async (err, hash) => {
            if (err) {
              res.status(500).send({ error: err })
            }

            const updatedUser = await User.findByIdAndUpdate(
              userId,
              { password: hash },
              { new: true }
            )

            if (!updatedUser) {
              return res.status(404).send({ error: 'User Not Found' })
            }

            res.status(200).json({
              message: 'Password Changed successfully.',
              user: updatedUser,
            })
          })
        })
      } else {
        res.status(401).send({ error: 'Password did not matched' })
      }
    })
    .catch((err) => {
      res.status(500).send({ error: err })
    })
}

exports.GetAddresses = (req, res) => {
  const { userId } = req.decoded
  User.findById(userId)
    .then((results) =>
      res.status(200).json({
        message: 'Fetched User successfully.',
        addresses: results.addresses,
        firstName: results.firstName,
        lastName: results.lastName,
      })
    )
    .catch((error) => res.status(400).send({ error: err }))
}

exports.AddAddress = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  }

  const { userId } = req.decoded

  const {
    // addressName,
    // companyName,
    // email,
    // phone,
    address,
    street,
    postalCode,
    city,
    state,
    country,
  } = req.body

  const data = {}

  // if (addressName) {
  //   data["addressName"] = addressName
  // }
  // if (companyName) {
  //   data["companyName"] = companyName
  // }
  // if (email) {
  //   data["email"] = email
  // }
  // if (phone) {
  //   data["phone"] = phone
  // }
  if (address) {
    data['address'] = address
  }
  if (street) {
    data['street'] = street
  }
  if (postalCode) {
    data['postalCode'] = postalCode
  }
  if (city) {
    data['city'] = city
  }
  if (state) {
    data['state'] = state
  }
  if (country) {
    data['country'] = country
  }

  const user = await User.findById({ _id: userId })

  if (!user) {
    return res.status(404).send({ error: 'User Not Found' })
  }

  data['activated'] = true
  user.addresses.push(data)

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { addresses: user.addresses },
    { new: true }
  )

  if (!updatedUser) {
    return res.status(404).send({ error: 'User Not Found' })
  }

  res.status(200).json({
    message: 'Address Added successfully.',
    user: updatedUser,
  })
}

exports.RemoveAddress = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  }

  const { userId } = req.decoded
  const { addressId } = req.body

  const user = await User.findById({ _id: userId })

  if (!user) {
    return res.status(404).send({ error: 'User Not Found' })
  }

  let isAddressNotFound = true
  let modifiedAddresses = []

  user.addresses.map((item) => {
    if (item._id.equals(mongoose.Types.ObjectId(addressId))) {
      isAddressNotFound = false
    } else {
      modifiedAddresses.push(item)
    }
  })

  if (isAddressNotFound === true) {
    return res.status(404).send({ error: 'Address Not Found' })
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { addresses: modifiedAddresses },
    { new: true }
  )

  if (!updatedUser) {
    return res.status(404).send({ error: 'User Not Found' })
  }

  res.status(200).json({
    message: 'Address Removed successfully.',
    user: updatedUser,
  })
}

exports.EditAddress = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  }

  const { userId } = req.decoded
  const { addressId, modifiedAddress } = req.body
  const {
    addressName,
    companyName,
    email,
    phone,
    address,
    postcode,
    city,
    state,
    country,
  } = modifiedAddress

  const data = {}
  if (addressName) {
    data['addressName'] = addressName
  }
  if (companyName) {
    data['companyName'] = companyName
  }
  if (email) {
    data['email'] = email
  }
  if (phone) {
    data['phone'] = phone
  }
  if (address) {
    data['address'] = address
  }
  if (postcode) {
    data['postcode'] = postcode
  }
  if (city) {
    data['city'] = city
  }
  if (state) {
    data['state'] = state
  }
  if (country) {
    data['country'] = country
  }

  const user = await User.findById({ _id: userId })

  if (!user) {
    return res.status(404).send({ error: 'User Not Found' })
  }

  let isAddressNotFound = true
  let modifiedAddresses = []

  user.addresses.map((item) => {
    if (item._id.equals(mongoose.Types.ObjectId(addressId))) {
      isAddressNotFound = false
      modifiedAddresses.push(data)
    } else {
      modifiedAddresses.push(item)
    }
  })

  if (isAddressNotFound === true) {
    return res.status(404).send({ error: 'Address Not Found' })
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { addresses: modifiedAddresses },
    { new: true }
  )

  if (!updatedUser) {
    return res.status(404).send({ error: 'User Not Found' })
  }

  res.status(200).json({
    message: 'Address Modified successfully.',
    user: updatedUser,
  })
}

exports.UpdateAddressStatus = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //     return res.status(422).json({ error: errors.array() });
  // }

  const { userId } = req.decoded
  const { addressId } = req.body

  const user = await User.findById({ _id: userId })

  if (!user) {
    return res.status(404).send({ error: 'User Not Found' })
  }

  let isAddressNotFound = true
  let modifiedAddresses = []

  user.addresses.map((item) => {
    if (item._id.equals(mongoose.Types.ObjectId(addressId))) {
      isAddressNotFound = false
      let modifiedAddress = item
      modifiedAddress['activated'] = !item.activated
      modifiedAddresses.push(modifiedAddress)
    } else {
      modifiedAddresses.push(item)
    }
  })

  if (isAddressNotFound === true) {
    return res.status(404).send({ error: 'Address Not Found' })
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { addresses: modifiedAddresses },
    { new: true }
  )

  if (!updatedUser) {
    return res.status(404).send({ error: 'User Not Found' })
  }

  res.status(200).json({
    message: 'Address Status Modified successfully.',
    user: updatedUser,
  })
}

exports.GetUsersCount = async (req, res) => {
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
  try {
    let TODAY = new Date()
    let YEAR_BEFORE = new Date(
      new Date().setFullYear(new Date().getFullYear() - 1)
    )
    let WEEK_BEFORE = new Date(
      new Date().setDate(new Date().getDate() - 84)
    )
    let DAYS_BEFORE = new Date(
      new Date().setDate(new Date().getDate() - 12)
    )

    let totalUsers = []
    let yearData = await User.aggregate([
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
    let usersYearData = yearData[0].data;
    for (var i in usersYearData) {
      delete usersYearData[i];
      break;
    }

    let dayData = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: DAYS_BEFORE, $lte: TODAY },
        },
      },
      {
        $group: {
          _id: { days: { $substrCP: ['$createdAt', 0, 10] } },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          data: { $push: { days: '$_id.days', count: '$count' } },
        },
      },
    ])

    let dailyDates = [];
    let daysCounts = dayData[0].data;
    for (let i = 11; i >= 0; i--) {
      dailyDates.push({ "days": moment().subtract(i, "days").format("YYYY-MM-DD"), "count": 0 });
    }
    let dailyData = dailyDates.map(v => ({ ...v, ...daysCounts.find(sp => sp.days === v.days) }));

    // Find 12 Weeks data
    let weekData = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: WEEK_BEFORE, $lte: TODAY },
        },
      },
      {
        $group: {
          _id: { week: { $week: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.week': 1 },
      },
      {
        $group: {
          _id: null,
          data: { $push: { week: '$_id.week', count: '$count' } },
        },
      },
    ])
    let weeksCounts = weekData[0].data;
    let WeeksDateCount = [];
    for (let i = 0; i < 12; i++) {
      let start = moment().subtract(i, "weeks").weekday(1);
      let end = moment().subtract(i, "weeks").weekday(7);
      WeeksDateCount.push({ "days": start.format('DD MMM') + " - " + end.format('DD MMM'), "count": 0, "week": parseInt(start.format('w')) - 1 })
    }
    let WeeksData = WeeksDateCount.map(v => ({ ...v, ...weeksCounts.find(sp => sp.week === v.week) }));

    res.status(200).json({
      message: 'Fetched users count successfully.',
      results: usersYearData,
      days: dailyData,
      weeks: WeeksData.reverse(),
    })

  } catch (error) {
    console.log('error', error)
    res.status(422).json({ error: error })
  }
}

