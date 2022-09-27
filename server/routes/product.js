const express = require('express')
const { check } = require('express-validator')
const requireAuth = require('../middlewares/requireAuth')
const productController = require('../controllers/product')
const Upload = require('../middlewares/multer/productMulter')
const router = express.Router()

const addValidationRules = [
  check('name')
    .exists()
    .withMessage('Name is required')
    .notEmpty()
    .withMessage('Name must not be empty'),
  check('category').exists().withMessage('Category is required'),
  check('description')
    .exists()
    .withMessage('Description is required'),
  check('sellingPrice')
    .exists()
    .withMessage('Selling Price is required'),
  check('quantity').exists().withMessage('Quantity is required'),
  check('shippingCharges')
    .exists()
    .withMessage('Shipping Charges is required'),
  check('shippingDays')
    .exists()
    .withMessage('Shipping Days is required'),
  check('countryOfSale')
    .exists()
    .withMessage('Country Of Sale is required')
]

const updateStockValidationRules = [
  check('id')
    .exists()
    .withMessage('Id is required')
    .notEmpty()
    .withMessage('Id must not be empty'),
  check('action')
    .exists()
    .withMessage('Action is required')
    .isIn(['add', 'remove'])
    .withMessage('Action must not be true/false'),
  check('qty').exists().withMessage('Qauntity is required')
]

const statusChangedValidationRules = [
  check('id')
    .exists()
    .withMessage('Id is required')
    .notEmpty()
    .withMessage('Id must not be empty'),
  check('status')
    .exists()
    .withMessage('Status is required')
    .isIn([true, false])
    .withMessage('Status must not be true/false')
]

/**
 * @Route Post /api/product/add
 * Validating the request body and passing the request to the controller
 */
var mutliUpload = Upload.fields([
  { name: 'mainImage' },
  { name: 'additionalImage1' },
  { name: 'additionalImage2' },
  { name: 'additionalImage3' },
  { name: 'additionalImage4' },
  { name: 'additionalImage5' }
])
router.post('/add', requireAuth, mutliUpload, productController.Add)

/**
 * @Route Post /api/product/getAll
 * Validating the request body and passing the request to the controller
 */
router.get('/getAll', productController.GetAll)
/**
 * @Route Post /api/product/getAllPaginated
 * Validating the request body and passing the request to the controller
 */
router.get('/getAllPaginated', productController.GetAllPaginated)
/**
 * @Route Post /api/product/getAll
 * Validating the request body and passing the request to the controller
 */
router.get('/total', productController.total)
/**
 * @Route Post /api/product/getById
 * Validating the request body and passing the request to the controller
 */
router.get('/getById/:id', productController.GetById)

/**
 * @Route Post /api/product/getByIds
 * Validating the request body and passing the request to the controller
 */
router.post('/getByIds', productController.GetByIds)

/**
 * @Route Post /api/product/getByCategory
 * Validating the request body and passing the request to the controller
 */
router.get('/getByCategory/:id', productController.GetByCategory)

/**
 * @Route Post /api/product/getBySeller
 * Validating the request body and passing the request to the controller
 */
router.get('/getBySeller', requireAuth, productController.GetBySeller)

/**
 * @Route Post /api/product/update
 * Validating the request body and passing the request to the controller
 */
router.put(
  '/update/:id',
  requireAuth,
  // addValidationRules,
  productController.Update
)

/**
 * @Route Post /api/product/updateImage
 * Validating the request body and passing the request to the controller
 */
router.patch(
  '/updateImage/:id',
  requireAuth,
  Upload.single('image'),
  productController.UpdateImage
)

/**
 * @Route Post /api/product/updateImages
 * Validating the request body and passing the request to the controller
 */
router.patch(
  '/updateImages/:id',
  requireAuth,
  mutliUpload,
  productController.UpdateImages
)

/**
 * @Route Post /api/product/updateStock
 * Validating the request body and passing the request to the controller
 */
router.patch(
  '/updateStock',
  requireAuth,
  productController.UpdateStock
)

/**
 * @Route Post /api/product/statusChanged
 * Validating the request body and passing the request to the controller
 */
router.patch(
  '/statusChanged',
  requireAuth,
  statusChangedValidationRules,
  productController.StatusChanged
)

/**
 * @Route Post /api/product/getReviews
 * Validating the request body and passing the request to the controller
 */
router.get('/getReviews/:id', productController.GetReviews)

/**
 * @Route Post /api/product/getRating
 * Validating the request body and passing the request to the controller
 */
router.get('/getRating/:id', productController.GetRating)

/**
 * @Route Post /api/product/getproduct
 * Validating the request body and passing the request to the controller
 */
router.get('/get-latest-product', requireAuth, productController.GetLatestProduct)

module.exports = router
