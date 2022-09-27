const mongoose = require("mongoose")

const OrderItemsSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  quantity: {
    type: String,
  },
  name: {
    type: String,
  },
  amount: {
    type: String,
  },
  status: {
    type: String,
  },
  paymentRecieved: {
    type: Boolean,
  },
  total: {
    type: String,
  }
})
const ShippingAdressScheme = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  address: {
    type: String,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  postalCode: {
    type: Number,
  },
  country: {
    type: String,
  },
})
const OrderSchema = new mongoose.Schema(
  {
    orderItems: [OrderItemsSchema],
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Token",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    total: {
      type: String,
    },
    status: {
      type: String,
    },
    orderNo: {
      type: String,
    },
    trackingNumber: {
      type: String,
    },
    shippingDate: {
      type: Date,
    },
    shippingAddress: {
      type: ShippingAdressScheme,
    },
    contract: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract",
    },
    shippingCharges: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = Order = mongoose.model("Order", OrderSchema)
