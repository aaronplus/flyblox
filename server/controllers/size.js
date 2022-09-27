const Size = require("../models/Size")
const { validationResult } = require("express-validator")

exports.Add = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  }

  const { name } = req.body
  const size = new Size({ name })

  try {
    const newSize = await size.save()
    res.json({
      message: "Size added successfully.",
      size: newSize,
    })
  } catch (error) {
    res.status(422).json({ error: error })
  }
}

exports.GetAll = (req, res) => {
  Size.find()
    .then((results) =>
      res.status(200).json({
        message: "Fetched Sizes successfully.",
        Sizes: results,
      })
    )
    .catch((error) => res.status(400).send({ error: error }))
}
