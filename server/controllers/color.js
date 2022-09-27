const Color = require("../models/Color")
const { validationResult } = require("express-validator")

exports.Add = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  }

  const { name, hexCode } = req.body
  const color = new Color({ name, hexCode })

  try {
    const newColor = await color.save()
    res.json({
      message: "Color added successfully.",
      color: newColor,
    })
  } catch (error) {
    res.status(422).json({ error: error })
  }
}

exports.GetAll = (req, res) => {
  Color.find()
    .then((results) =>
      res.status(200).json({
        message: "Fetched Colors successfully.",
        colors: results,
      })
    )
    .catch((error) => res.status(400).send({ error: error }))
}
