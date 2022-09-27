const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    name: { type: String },
  },
  { timestamps: true }
)

const DisputeSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    details: {
      type: String,
    },
    status: {
      type: String,
    },
    messages: [MessageSchema],
  },
  { timestamps: true }
)

module.exports = Dispute = mongoose.model('Dispute', DisputeSchema)
