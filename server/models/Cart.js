const mongoose = require('mongoose')

const CartItemSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  mainImage: {
    type: String,
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  maxQuantity: {
    type: Number,
    required: true
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  attributes: {
    type: Object
  }
})
const CartSchema = new mongoose.Schema({
  cartItems: [CartItemSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = Cart = mongoose.model('Cart', CartSchema)
