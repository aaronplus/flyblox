const mongoose = require("mongoose")

const AttributeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  options: [{ label: String, sku: String, quantity: String, price: String, }]
})

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    mainImage: {
      type: String,
      required: true,
    },
    additionalImage1: {
      type: String,
    },
    additionalImage2: {
      type: String,
    },
    additionalImage3: {
      type: String,
    },
    additionalImage4: {
      type: String,
    },
    additionalImage5: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    token: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Token",
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    shippingCharges: {
      type: Number,
      default: 0,
    },
    shippingDays: {
      type: Number,
      required: true,
    },
    freeInternationalShipping: {
      type: Boolean,
      default: false,
    },
    internationalshippingCharges: {
      type: Number,
      default: 0,
    },
    internationalshippingDays: {
      type: Number,
    },
    dueDate : {
      type: Number,
    },
    countryOfSale: {
      type: String,
      required: true,
    },
    freeInternationally: {
      type: Boolean,
      default: false,
    },
    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
    },
    size: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Size",
    },
    sku: {
      type: String,
    },
    manufacturePartNo: {
      type: String,
    },
    productSerialNo: {
      type: String,
    },
    terms: {
      type: String,
    },
    tags: [
      {
        type: String,
      },
    ],
    activated: {
      type: Boolean,
      default: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    attributes: [AttributeSchema],
  },
  {
    timestamps: true,
  }
)

module.exports = Product = mongoose.model("Product", ProductSchema)
