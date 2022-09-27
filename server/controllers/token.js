const Token = require('../models/Token')
const { validationResult } = require('express-validator')

exports.Add = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  }

  const { name, symbol, icon, contract, price, status } = req.body
  const token = new Token({
    name,
    symbol,
    icon,
    contract,
    price,
    status
  })

  try {
    const newToken = await token.save()
    res.json({
      message: 'Token added successfully.',
      token: newToken
    })
  } catch (error) {
    res.status(422).json({ error: error })
  }
}

exports.GetAll = (req, res) => {
  const { title_contains } = req.query
  let aggregatePipeline = []

  aggregatePipeline.push({ $sort: { createdAt: 1 } })
  if (title_contains) {
    aggregatePipeline.push({
      $match: { name: { $regex: title_contains, $options: 'i' } }
    })
  }

  Token.aggregate(aggregatePipeline)
    .then(results =>
      res.status(200).json({
        message: 'Fetched Tokens successfully.',
        tokens: results
      })
    )
    .catch(error => res.status(400).send({ error: error }))
}

exports.GetById = (req, res) => {
  const { id } = req.params
  Token.findById(id)
    .then(result =>
      res.status(200).json({
        message: 'Fetched Token successfully.',
        token: result
      })
    )
    .catch(error => res.status(400).send({ error: error }))
}

exports.Edit = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //     return res.status(422).json({ error: errors.array() });
  // }

  const { id } = req.params
  const { name, symbol, icon, contract, price, status } = req.body

  const data = {}
  if (name) {
    data['name'] = name
  }
  if (symbol) {
    data['symbol'] = symbol
  }
  if (icon) {
    data['icon'] = icon
  }
  if (contract) {
    data['contract'] = contract
  }
  if (price) {
    data['price'] = price
  }
  if (status) {
    data['status'] = status
  }

  const token = await Token.findByIdAndUpdate(id, data, { new: true })

  if (!token) {
    return res.status(404).send({ error: 'Token Not Found' })
  }

  res.status(200).json({
    message: 'Token Modified successfully.',
    token: token
  })
}

exports.Remove = (req, res) => {
  const { id } = req.params
  Token.findOneAndDelete({ _id: id })
    .then(() =>
      res.status(200).json({
        message: 'Token successfully Deleted.'
      })
    )
    .catch(error => res.status(400).send({ error: error }))
}

exports.ConvertUSD = async (req, res) => {
  const { price } = req.body
  try {
    const tokens = await Token.find({ status: 'Enable' })

    const calculatedPrices = tokens.map(token => ({
      ...token.toJSON(),
      amount: price / token.price
    }))

    res.status(200).json({
      message: 'success',
      amount: calculatedPrices
    })
  } catch (error) {
    res.status(422).json({ error: error })
  }
}
