const Newsletter = require("../models/Newsletter")
const { validationResult } = require("express-validator")

exports.Add = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() })
    }

    const { email } = req.body
    const size = new Newsletter({ email })

    try {
        const newSize = await size.save()
        res.json({
            message: "Subscribe successfully.",
            size: newSize,
        })
    } catch (error) {
        res.status(422).json({ error: error })
    }
}