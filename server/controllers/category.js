const Category = require("../models/Category")
const { validationResult } = require("express-validator")
const mongoose = require("mongoose")
const createImageUrl = require("../utils/createImageUrl")

exports.GetAll = async (req, res) => {
  const categories = await Category.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "parent",
        as: "subcategories",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        thumbnail: 1,
        parent: 1,
        subcategories: 1,
        hasSubcategories: { $gt: [{ $size: "$subcategories" }, 0] },
      },
    },
    {
      $match: {
        $or: [
          {
            hasChildren: true,
          },
          {
            parent: { $exists: false },
          },
        ],
      },
    },
    {
      $addFields: {
        label: "$name",
        value: "$_id",
        children: {
          $map: {
            input: "$subcategories",
            as: "ch",
            in: {
              _id: "$$ch._id",
              name: "$$ch.name",
              thumbnail: "$$ch.thumbnail",
              label: "$$ch.name",
              value: "$$ch._id",
            },
          },
        },
      },
    },
  ])

  if (!categories) {
    return res.status(404).send({ error: "Categories Not Found" })
  }

  res.status(200).json({
    message: "Fetched Categories successfully.",
    categories: categories,
  })
}

exports.GetById = (req, res) => {
  const { id } = req.params
  Category.findById(id)
    .then((results) =>
      res.status(200).json({
        message: "Fetched Category successfully.",
        category: results,
      })
    )
    .catch((error) => res.status(400).send({ error: error }))
}
