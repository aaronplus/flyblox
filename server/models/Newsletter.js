const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
},
   {
        timestamps: true,
    });

module.exports = NewsLetter = mongoose.model("NewsLetter", NewsSchema);
