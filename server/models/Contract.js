const mongoose = require("mongoose");

const ContractSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = Contract = mongoose.model("Contract", ContractSchema);
