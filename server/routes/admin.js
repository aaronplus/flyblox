const express = require("express")
const { check } = require("express-validator")
const adminController = require("../controllers/admin")
const orderController = require("../controllers/order")
const tokenController = require("../controllers/token")
const userController = require("../controllers/user")
const landingpage = require("../controllers/landingpage")
const Upload = require("../middlewares/multer/categoryMulter")
const UploadPanelBackground = require("../middlewares/multer/registerPanelBackgroundMulter")
const UploadPanelImages = require("../middlewares/multer/panelImagesMulter")
const router = express.Router()

const addValidationRules = [
  check("name")
    .exists()
    .withMessage("Name is required")
    .notEmpty()
    .withMessage("Name must not be empty"),
]

const loginValidationRules = [
  check("identifier").exists().withMessage("Must be a email or username"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast six characters"),
];


/**
 * @Route Post /api/admin/login
 * Validating the request body and passing the request to the controller
 */
router.post("/login", adminController.login);

/**
 * @Route get /api/admin/getUsers
 * Validating the request body and passing the request to the controller
 */
router.get("/getUsers", adminController.getUsers)

/**
 * @Route get /api/admin/products
 */
router.get("/product/getAll", adminController.getProducts)

/**
 * @Route post /api/admin/category
 */
router.post(
  "/category/add",
  Upload.single("thumbnail"),
  addValidationRules,
  adminController.addCategory
)

/**
 * @Route get /api/admin/category
 */
router.get("/category/getAll", adminController.getCategories)

/**
 * @Route get /api/category/getById
 * Validating the request body and passing the request to the controller
 */
router.get("/category/:id", adminController.GetById)

/**
 * @Route put /api/category/getById
 * Validating the request body and passing the request to the controller
 */

router.put(
  "/category/:id",
  Upload.single("thumbnail"),
  adminController.updateCategory
)

/**
 * @Route get /api/admin/category
 */
router.delete("/category/:id", adminController.removeCategory)

/**
 * @Route get /api/admin/orders
 */
router.get("/orders", orderController.GetByQuery)

/**
 * @Route Post /api/admin/getSales
 * Validating the request body and passing the request to the controller
 */
router.get("/getSales", orderController.GetSales)

/**
 * @Route Post /api/admin/getUsersCount
 * Validating the request body and passing the request to the controller
 */
router.get("/getUsersCount", userController.GetUsersCount)

/**
 * @Route get /api/admin/tokens
 */
router.get("/tokens", tokenController.GetAll)


/**
 * @Route get /api/admin/tokens
 */
router.get("/tokens/:id", tokenController.GetById)

/**
 * @Route get /api/admin/tokens
 */
router.post("/tokens/add", tokenController.Add)

/**
 * @Route get /api/admin/tokens
 */
router.patch("/tokens/edit/:id", tokenController.Edit)

/**
 * @Route get /api/admin/category/delete/:id
 */
router.delete("/tokens/delete/:id", tokenController.Remove)

/**
 * @Route get /api/admin/landingpages
 */
router.get("/landingpages", landingpage.GetAll)


/**
 * @Route get /api/admin/landingpages
 */
router.get("/landingpages/:id", landingpage.GetById)

/**
 * @Route get /api/admin/landingpages
 */
router.post("/landingpages/add",
  UploadPanelImages.any('panel_images'),
  landingpage.Add)

/**
 * @Route get /api/admin/landingpages
 */
router.patch("/landingpages/edit/:id",
  UploadPanelImages.any('panel_images'),
  landingpage.Edit)

/**
 * @Route get /api/admin/category/delete/:id
 */
router.delete("/landingpages/delete/:id", landingpage.Remove)

module.exports = router