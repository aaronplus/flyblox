const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String
  },
  icon: {
    type: String
  },
  contract: {
    type: String,
    required: true
  },
  abi: {
    type: [],
    required: true
  },
  price: {
    type: Number
  },
  status: {
    type: String,
    default: 'Enable'
  }
})

module.exports = Token = mongoose.model('Token', TokenSchema)
