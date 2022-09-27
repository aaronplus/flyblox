const mongoose = require("mongoose")

const FeedbackSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  stars: {
    type: Number,
  },
  description: {
    type: Number,
  },
  time: {
    type: Number,
  },
  communication: {
    type: Number,
  },
  feedbackText: {
    type: String,
  },
})

module.exports = Feedback = mongoose.model("Feedback", FeedbackSchema)
