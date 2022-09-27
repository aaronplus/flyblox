const mongoose = require('mongoose')

const LadingPageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    register_panel_background: {
        type: String,
        // required: true
    },
    register_form_location: {
        type: String,
        required: true
    },
    register_button_colour: {
        type: String
    },
    register_button_label: {
        type: String,
    },
    panel_images: {
        type : Array,
    }
})

module.exports = LadingPage = mongoose.model('LadingPage', LadingPageSchema)
