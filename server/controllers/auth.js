// const mongoose = require("mongoose");
// const moment = require("moment");
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const { MY_SECRET_KEY } = require('../config/constants')
const User = require('../models/User')
const GenerateToken = require('../utils/tokkenGenerator')
const { sendEmail } = require('../config/email')
const welocomeMail = require('../mailers/welcomeMail')
//Login user Controller
exports.login = async (req, res) => {
  const { identifier, password, role } = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  }
  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }]
  })
  if (!user) {
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

//Register User Controller
exports.register = async (req, res) => {
  const { firstName, username, email, password } = req.body

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ error: "Can't validate your request at server" })
    // return res.status(422).json({ error: errors.array() })
  }

  const isEmailExist = await User.findOne({ email })
  const isUsernameExist = await User.findOne({ username })

  if (isEmailExist) {
    return res.status(409).json({ error: 'Email already exist.' })
  }

  if (isUsernameExist) {
    return res.status(409).json({ error: 'Username already exist.' })
  }

  //Create User
  const user = new User({
    firstName,
    // lastName,
    username,
    email,
    password
  })
  try {
    const newUser = await user.save()
    const token = jwt.sign({ userId: newUser._id }, MY_SECRET_KEY)
    welocomeMail(newUser);
    // sendEmail({
    //   from: process.env.FROM_EMAIL, // sender address
    //   to: newUser.email, // list of receivers
    //   subject: 'Welcome to Flyblox.', // Subject line
    //   // text: 'Hello there?', // plain text body
    //   html: `Hi ${newUser.firstName},<br/>
    //   Welcome to Flyblox. You're ready to start earning crypto by buying and selling on Flyblox.com.<br/>

    //   Here is your free ebook the ultimate guide for stacking crypto.<br/>
    //   <br/>
    //   Kind Regards<br/>
    //   Team@Flyblox`
    // })
    res.status(201).json({
      message: 'You have registered successfully.',
      token: token
    })
  } catch (error) {
    res.status(422).json({ error: error })
  }
}

//Forgot Password Controller
exports.ForgotPassword = async (req, res) => {
  const { email } = req.params

  const token = GenerateToken(8)
  const user = await User.findOneAndUpdate(
    { email },
    { token: token },
    { new: true }
  )

  if (!user) {
    return res.status(404).send({ error: 'Email Not Found' })
  }

  sendEmail({
    from: process.env.SMTP_USER, // sender address
    to: email, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello there?', // plain text body
    html: '<b>Hello world?</b>' // html body
  })

  res.status(200).json({
    message: 'A mail has been sent to email'
  })
}

exports.ResetPassword = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  }

  const { token, password } = req.body

  const user = await User.findOne({ token })

  if (!user) {
    return res.status(404).send({ error: 'Token Not Found' })
  }

  user
    .comparePassword(password)
    .then(result => {
      if (result) {
        res.status(400).json({
          message: 'Use password other than recent'
        })
      }
    })
    .catch(err => {
      res.status(500).send({ error: err })
    })

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      res.status(500).send({ error: err })
    }

    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        res.status(500).send({ error: err })
      }

      const updatedUser = await User.findOneAndUpdate(
        { token },
        { password: hash },
        { new: true }
      )

      if (!updatedUser) {
        return res.status(404).send({ error: 'Token Not Found' })
      }

      res.status(200).json({
        message: 'Password has been reset.'
      })
    })
  })
}
