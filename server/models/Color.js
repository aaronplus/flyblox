const mongoose = require("mongoose");

const ColorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hexCode: {
    type: String,
  },
});

module.exports = Color = mongoose.model("Color", ColorSchema);
