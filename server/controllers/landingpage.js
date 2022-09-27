const LandingPage = require('../models/landingpage')
const { validationResult } = require('express-validator')
const createImageUrl = require('../utils/createImageUrl')
const getImagePath = require('../utils/getImagePath')
const fs = require('fs')
exports.GetAll = (req, res) => {
    LandingPage.find().sort({ "_id": -1 })
        .then(results =>
            res.status(200).json({
                message: 'Fetched landing page data successfully.',
                data: results
            })
        )
        .catch(error => res.status(400).send({ error: error }))
}

exports.GetById = (req, res) => {
    const { id } = req.params
    LandingPage.findById(id)
        .then(result =>
            res.status(200).json({
                message: 'Fetched landing page data successfully.',
                data: result
            })
        )
        .catch(error => res.status(400).send({ error: error }))
}

exports.Add = async (req, res) => {
    const { name, slug, register_form_location, register_button_colour, register_button_label, thumbnail, panel_images } = req.body

    let checklandingName = await LandingPage.findOne({ name: name })
    if (checklandingName) {
        return res.status(404).json({ message: 'Name already exist' })
    }
    let checklandingSlug = await LandingPage.findOne({ slug: slug })
    if (checklandingSlug) {
        return res.status(404).json({ message: 'Slug name already exist' })
    }
    const landingpage = new LandingPage({
        name,
        slug,
        register_form_location,
        register_button_colour,
        register_button_label
    })
    landingpage.panel_images = []

    if (req.files !== undefined) {
        for (let i = 0; i < req.files.length; i++) {
            if (req.files[i].fieldname === "thumbnail") {
                const { destination, filename } = req.files[i]
                image = createImageUrl(destination, filename)
                landingpage.register_panel_background = image
            } else {
                const { destination, filename } = req.files[i]
                image = createImageUrl(destination, filename)
                landingpage.panel_images.push(image)
            }
        }
    }
    try {
        const newlandingpage = await landingpage.save()
        res.status(200).json({
            message: 'Landing Page added successfully.',
            data: newlandingpage
        })
    } catch (error) {
        res.status(422).json({ error: error })
    }
}

exports.Edit = async (req, res) => {
    let id = req.body.id
    let oldData = await LandingPage.findById(id);
    const { name, slug, thumbnail, register_form_location, register_button_colour, register_button_label } = req.body
    const data = {}
    if (name) {
        data['name'] = name
    }
    if (slug) {
        data['slug'] = slug
    }
    if (register_form_location) {
        data['register_form_location'] = register_form_location
    }
    if (register_button_colour) {
        data['register_button_colour'] = register_button_colour
    }
    if (register_button_label) {
        data['register_button_label'] = register_button_label
    }
    data.panel_images = []
    if (req.files !== undefined) {
        for (let i = 0; i < req.files.length; i++) {
            if (req.files[i].fieldname === "thumbnail") {
                const { destination, filename } = req.files[i]
                image = createImageUrl(destination, filename)
                data.register_panel_background = image
            } else {
                const { destination, filename } = req.files[i]
                image = createImageUrl(destination, filename)
                data.panel_images.push(image)
            }
        }
    }
    const landingpage = await LandingPage.findByIdAndUpdate(id, data, { new: true })

    if (!landingpage) {
        return res.status(404).send({ error: 'landing page Not Found' })
    }
    for (let i = 0; i < oldData.panel_images.length; i++) {
        const path = getImagePath(oldData.panel_images[i])
        console.log(path)
        if (fs.existsSync(path)) {
            fs.unlinkSync(path)
        }
    }
    res.status(200).json({
        message: 'Landing page Modified successfully.',
        data: landingpage
    })
}

exports.Remove = (req, res) => {
    const { id } = req.params
    LandingPage.findOneAndDelete({ _id: id })
        .then((result) => {
            for (let i = 0; i < result.panel_images.length; i++) {
                const path = getImagePath(result.panel_images[i])
                console.log(path)
                if (fs.existsSync(path)) {
                    fs.unlinkSync(path)
                }
            }
            let unlinkPanelBackground = getImagePath(result.register_panel_background)
            if (fs.existsSync(unlinkPanelBackground)) {
                fs.unlinkSync(unlinkPanelBackground)
            }
            res.status(200).json({
                message: 'Landing page successfully Deleted.'
            })
        })
        .catch(error => res.status(400).send({ error: error }))
}

exports.GetBySlug = async (req, res) => {
    const { slug } = req.params
    try {
        let landingpageBySlug = await LandingPage.findOne({ slug: slug })
        if (!landingpageBySlug) {
            return res.status(404).send({ error: 'landing page Not Found' })
        }
        return res.status(200).json({
            message: 'Landing page fetch successfully.',
            result: landingpageBySlug
        })
    }
    catch (error) {
        return res.status(400).send({ error: error })
    }
}