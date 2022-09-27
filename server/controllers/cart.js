const Cart = require('../models/Cart')
const { validationResult } = require('express-validator')
const mongoose = require('mongoose')
const Contract = require('../models/Contract')

exports.Add = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() })
  }

  const { userId } = req.decoded
  const { cartItems } = req.body
  const cart = new Cart({ cartItems, user: userId })

  try {
    const newCart = await cart.save()
    res.json({
      message: 'Cart added successfully.',
      cart: newCart
    })
  } catch (error) {
    res.status(422).json({ error: error })
  }
}

exports.AddItem = async (req, res) => {
  // const errors = validationResult(req)
  // if (!errors.isEmpty()) {
  //     return res.status(422).json({ error: errors.array() })
  // }

  const { userId } = req.decoded
  const { cartItem } = req.body
  const isUserCartExist = await Cart.findOne({ user: userId })

  if (isUserCartExist) {
    const cart = isUserCartExist
    const cartItems = cart.cartItems
    let existItem = false
    let indexOfExistingItem
    await Promise.all(
      cartItems.map((item, index) => {
        if (item.id == cartItem.id) {
          if (cartItem.attributes) {
            if (
              JSON.stringify(item.attributes) ===
              JSON.stringify(cartItem.attributes)
            ) {
              existItem = true
              indexOfExistingItem = index
            }
          } else {
            existItem = true
            indexOfExistingItem = index
          }
        }
      })
    )
    if (existItem) {
      cartItems[indexOfExistingItem].quantity += parseInt(
        cartItem.quantity
      )
      cartItems[indexOfExistingItem].maxQuantity += parseInt(
        cartItem.maxQuantity
      )
    } else {
      cartItems.push(cartItem)
    }

    try {
      const newCart = await Cart.findOneAndUpdate(
        { user: userId },
        { cartItems },
        { new: true }
      )

      res.json({
        message: 'CartItem added successfully.',
        cart: newCart
      })
    } catch (error) {
      res.status(422).json({ error: error })
    }
  } else {
    const cart = new Cart({ cartItems: cartItem, user: userId })
    try {
      const newCart = await cart.save()
      res.json({
        message: 'Cart added successfully.',
        cart: newCart
      })
    } catch (error) {
      res.status(422).json({ error: error })
    }
  }
}

exports.AddItems = async (req, res) => {
  // const errors = validationResult(req)
  // if (!errors.isEmpty()) {
  //     return res.status(422).json({ error: errors.array() })
  // }

  const { userId } = req.decoded
  const { newCartItems } = req.body

  if (newCartItems == undefined || newCartItems.length < 1) {
    return res.status(400).json({ error: 'Empty cart items.' })
  }

  const isUserCartExist = await Cart.findOne({ user: userId })

  if (isUserCartExist) {
    const cart = isUserCartExist
    const cartItems = cart.cartItems
    await Promise.all(
      newCartItems.map(async cartItem => {
        let existItem = false
        let indexOfExistingItem
        await Promise.all(
          cartItems.map((item, index) => {
            if (item.id == cartItem.id) {
              if (cartItem.attributes) {
                if (
                  JSON.stringify(item.attributes) ===
                  JSON.stringify(cartItem.attributes)
                ) {
                  existItem = true
                  indexOfExistingItem = index
                }
              } else {
                existItem = true
                indexOfExistingItem = index
              }
            }
          })
        )
        if (existItem) {
          cartItems[indexOfExistingItem].quantity += parseInt(
            cartItem.quantity
          )
          cartItems[indexOfExistingItem].maxQuantity += parseInt(
            cartItem.maxQuantity
          )
        } else {
          cartItems.push(cartItem)
        }
      })
    )
    try {
      const newCart = await Cart.findOneAndUpdate(
        { user: userId },
        { cartItems },
        { new: true }
      )

      res.json({
        message: 'CartItem added successfully.',
        cartItems: newCart.cartItems
      })
    } catch (error) {
      res.status(422).json({ error: error })
    }
  } else {
    const cart = new Cart({ cartItems: cartItems, user: userId })
    try {
      const newCart = await cart.save()
      res.json({
        message: 'Cart Added successfully.',
        cartItems: newCart.cartItems
      })
    } catch (error) {
      res.status(422).json({ error: error })
    }
  }
}

exports.RemoveItem = async (req, res) => {
  const { userId } = req.decoded
  const { cartItem } = req.body
  const isUserCartExist = await Cart.findOne({ user: userId })
  if (isUserCartExist) {
    const cart = isUserCartExist
    const cartItems = cart.cartItems
    let existItem = false
    let newCartItems = []
    await Promise.all(
      cartItems.map(item => {
        if (item.id == cartItem.id) {
          if (cartItem.attributes) {
            if (
              JSON.stringify(item.attributes) ===
              JSON.stringify(cartItem.attributes)
            ) {
              existItem = true
            } else {
              newCartItems.push(item)
            }
          } else {
            existItem = true
          }
        } else {
          newCartItems.push(item)
        }
      })
    )
    if (existItem) {
      try {
        const newCart = await Cart.findOneAndUpdate(
          { user: userId },
          { cartItems: newCartItems },
          { new: true }
        )

        res.json({
          message: 'CartItem Removed successfully.',
          cart: newCart
        })
      } catch (error) {
        res.status(422).json({ error: error })
      }
    } else {
      res.status(404).json({ error: "Cart Item doesn't exist" })
    }
  } else {
    res.status(404).json({ error: "User Cart doesn't exist" })
  }
}

exports.RemoveItemByList = async (req, res) => {
  const { userId } = req.decoded
  const { orderItems } = req.body

  let list = orderItems.map(item => item.id)

  try {
    let cart = await Cart.findOneAndUpdate(
      { user: userId },
      {
        $pull: {
          cartItems: {
            id: { $in: list }
          }
        }
      },
      {
        upsert: false,
        new: true
      }
    )

    res.json({
      message: 'CartItem Removed successfully.',
      cartItems: cart.cartItems
    })
  } catch (error) {
    res.status(422).json({ error: error })
  }
}
exports.GetByUser = (req, res) => {
  const { userId } = req.decoded
  console.log(userId)
  Cart.find({ user: userId })
    .then(results => {
      let cartItems = results[0].cartItems
      res.status(200).json({
        message: 'Fetched CartItems successfully.',
        cartItems: cartItems
      })
    })
    .catch(error => res.status(400).send({ error: error }))
}

exports.GetBySellers = async(req, res) => {
  const { userId } = req.decoded
  const contract = await Contract.findOne({status:'current'})
  Cart.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(userId)
      }
    },
    {
      $unwind: '$cartItems'
    },
    {
      $lookup: {
        from: 'products',
        localField: 'cartItems.id',
        foreignField: '_id',
        as: 'cartItems.product'
      }
    },
    {
      $unwind: '$cartItems.product'
    },
    {
      $group: {
        _id: '$cartItems.seller',
        cartItems: {
          $push: {
            id: '$cartItems.id',
            name: '$cartItems.name',
            quantity: '$cartItems.quantity',
            amount: '$cartItems.amount',
            mainImage: '$cartItems.mainImage',
            product: '$cartItems.product'
          }
        }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'seller'
      }
    },
    {
      $unwind: '$seller'
    },
    {
      $project: {
        cartItems: {
          id: 1,
          name: 1,
          quantity: 1,
          amount: 1,
          mainImage: 1,
          product: { shippingDays: 1, shippingCharges: 1 }
        },
        seller: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          walletAddress: 1
        }
      }
    }
  ])
    .then(results => {
      res.status(200).json({
        message: 'Fetched CartItems successfully.',
        cartItemsBySeller: results,
        contract:contract
      })
    })
    .catch(error => res.status(400).send({ error: error }))
}

exports.RemoveItems = (req, res) => {
  const { userId } = req.decoded
  Cart.deleteMany({ user: userId })
    .then(results => {
      let cartItems = results[0].cartItems
      res.status(200).json({
        message: 'Cart items cleared.',
        cartItems: cartItems
      })
    })
    .catch(error => res.status(400).send({ error: error }))
}
exports.UpdateQuantity = async (req, res) => {
  // const errors = validationResult(req)
  // if (!errors.isEmpty()) {
  //     return res.status(422).json({ error: errors.array() })
  // }

  const { userId } = req.decoded
  const { cartItem, action } = req.body
  const isUserCartExist = await Cart.findOne({ user: userId })

  if (isUserCartExist) {
    const cart = isUserCartExist
    const cartItems = cart.cartItems
    let existItem = false
    let newCartItems = []
    await Promise.all(
      cartItems.map(item => {
        if (item.id == cartItem.id) {
          if (cartItem.attributes) {
            if (
              JSON.stringify(item.attributes) ===
              JSON.stringify(cartItem.attributes)
            ) {
              existItem = true
              if (action === 'increase') {
                item.quantity += 1
                newCartItems.push(item)
              } else if (action === 'decrease') {
                if (item.quantity - 1 > 0) {
                  item.quantity -= 1
                  newCartItems.push(item)
                } else {
                  newCartItems.push(item)
                }
              }
            } else {
              newCartItems.push(item)
            }
          } else {
            existItem = true
            if (action === 'increase') {
              item.quantity += 1
              newCartItems.push(item)
            } else if (action === 'decrease') {
              if (item.quantity - 1 > 0) {
                item.quantity -= 1
                newCartItems.push(item)
              } else {
                newCartItems.push(item)
              }
            }
          }
        } else {
          newCartItems.push(item)
        }
      })
    )
    if (existItem) {
      try {
        const newCart = await Cart.findOneAndUpdate(
          { user: userId },
          { cartItems: newCartItems },
          { new: true }
        )

        res.json({
          message: 'CartItem Quantity Updated successfully.',
          cart: newCart
        })
      } catch (error) {
        res.status(422).json({ error: error })
      }
    } else {
      res.status(404).json({ error: "Cart Item doesn't exist" })
    }
  } else {
    res.status(404).json({ error: "User Cart doesn't exist" })
  }
}
