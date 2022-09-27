const express = require("express")
const { check } = require("express-validator")
const requireAuth = require("../middlewares/requireAuth")
const cartController = require("../controllers/cart")
const router = express.Router()

/**
 * @Route Post /api/cart/add
 * Validating the request body and passing the request to the controller
 */
router.post("/add", requireAuth, cartController.Add)

/**
 * @Route Post /api/cart/getByUser
 * Validating the request body and passing the request to the controller
 */
router.get("/getByUser", requireAuth, cartController.GetByUser)

/**
 * @Route Post /api/cart/addItem
 * Validating the request body and passing the request to the controller
 */
router.put("/addItem", requireAuth, cartController.AddItem)

/**
 * @Route Post /api/cart/addItem
 * Validating the request body and passing the request to the controller
 */
router.put("/addItems", requireAuth, cartController.AddItems)

/**
 * @Route Post /api/cart/removeItem
 * Validating the request body and passing the request to the controller
 */
router.put("/removeItem", requireAuth, cartController.RemoveItem)

/**
 * @Route Post /api/cart/removeItem
 * Validating the request body and passing the request to the controller
 */
router.put("/removeItemByList", requireAuth, cartController.RemoveItemByList)

/**
 * @Route Post /api/cart/updateQuantity
 * Validating the request body and passing the request to the controller
 */
router.put("/updateQuantity", requireAuth, cartController.UpdateQuantity)
/**
 * @Route Post /api/cart/removeItems
 * Validating the request body and passing the request to the controller
 */
router.put("/removeItems", requireAuth, cartController.RemoveItems)

/**
 * @Route Post /api/cart/getByUser
 * Validating the request body and passing the request to the controller
 */
router.get("/getBySellers", requireAuth, cartController.GetBySellers)

module.exports = router
