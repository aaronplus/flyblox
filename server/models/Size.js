const mongoose = require("mongoose");

const SizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = Size = mongoose.model("Size", SizeSchema);
