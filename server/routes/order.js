const express = require('express')
const { check } = require('express-validator')
const requireAuth = require('../middlewares/requireAuth')
const orderController = require('../controllers/order')
const router = express.Router()

const addValidationRules = [
  check('product').exists().withMessage('Product Id is required'),
  // check("seller").exists().withMessage("Seller Id is required"),
  // check("buyer").exists().withMessage("Buyer Id is required"),
]

const getByStatusValidationRules = [
  check('status').exists().withMessage('Status is required'),
]

const getOrderFeedbackValidationRules = [
  check('orderId').exists().withMessage('Order Id is required'),
  check('productId').exists().withMessage('Product Id is required'),
]

/**
 * @Route Post /api/order/add
 * Validating the request body and passing the request to the controller
 */
router.post('/add', requireAuth, orderController.Add)

/**
 * @Route Post /api/order/getAll
 * Validating the request body and passing the request to the controller
 */
router.get('/getAll', requireAuth, orderController.GetAll)

/**
 * @Route Post /api/order/getByStatus
 * Validating the request body and passing the request to the controller
 */
router.get(
  '/getByStatus',
  requireAuth,
  getByStatusValidationRules.includes,
  orderController.GetByStatus
)

/**
 * @Route Post /api/order/getSellerOrders
 * Validating the request body and passing the request to the controller
 */
router.get('/getSellerOrders', requireAuth, orderController.GetSellerOrders)

/**
 * @Route Post /api/order/getBuyerOrders
 * Validating the request body and passing the request to the controller
 */
router.get('/getBuyerOrders', requireAuth, orderController.GetBuyerOrders)

/**
 * @Route Post /api/product/update
 * Validating the request body and passing the request to the controller
 */
router.put('/edit/:id', requireAuth, orderController.Edit)

/**
 * @Route Post /api/product/update
 * Validating the request body and passing the request to the controller
 */
router.put('/changeStatus/:id', requireAuth, orderController.changeStatus)

/**
 * @Route Post /api/orderFeedback
 * Validating the request body and passing the request to the controller
 */
router.post(
  '/addFeedback/:orderId',
  requireAuth,
  orderController.addOrderFeedback
)

/**
 * @Route Post /api/addTrackingNumber
 * Validating the request body and passing the request to the controller
 */
router.post(
  '/addTrackingNumber/:orderId',
  requireAuth,
  orderController.AddTrackingNumber
)

/**
 * @Route Post /api/order/getBuyerOrders
 * Validating the request body and passing the request to the controller
 */
router.post(
  '/getOrderFeedbackByBuyer',
  requireAuth,
  getOrderFeedbackValidationRules,
  orderController.GetOrderFeedbackByBuyer
)

/**
 * @Route Post /api/order/getBuyerOrders
 * Validating the request body and passing the request to the controller
 */
router.post(
  '/getOrderFeedbackBySeller',
  requireAuth,
  getOrderFeedbackValidationRules,
  orderController.GetOrderFeedbackBySeller
)

/**
 * @Route Post /api/addDispute
 * Validating the request body and passing the request to the controller
 */
router.post(
  '/addDispute/:orderId',
  requireAuth,
  orderController.addOrderDispute
)

/**
 * @Route Post /api/getOrderDisputeBySeller
 * Validating the request body and passing the request to the controller
 */
router.post('/getOrderDispute', requireAuth, orderController.GetOrderDispute)

/**
 * @Route Post /api/getOrderDisputeBySeller
 * Validating the request body and passing the request to the controller
 */
router.post('/getOrderDisputes', requireAuth, orderController.GetOrderDisputes)

/**
 * @Route Post /api/getOrderDisputeBySeller
 * Validating the request body and passing the request to the controller
 */
router.get('/getOrderDisputesByAdmin', orderController.GetOrderDisputesByAdmin)

/**
 * @Route Post /api/getOrderDisputeBySeller
 * Validating the request body and passing the request to the controller
 */
router.post('/addDisputeMessage/:id', orderController.AddDisputeMessage)

/**
 * @Route Post /api/getOrderDisputeBySeller
 * Validating the request body and passing the request to the controller
 */
router.put('/closeDispute/:id', orderController.CloseDispute)

module.exports = router
