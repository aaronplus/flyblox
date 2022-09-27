const express = require("express")
const { check } = require("express-validator")
const requireAuth = require("../middlewares/requireAuth")
const userController = require("../controllers/user")
const Upload = require("../middlewares/multer/userMulter")
const router = express.Router()

const updateAuthenticationValidationRules = [
  check("activated")
    .exists()
    .withMessage("Activated is required")
    .isIn([true, false])
    .withMessage("activated must not be true/false"),
]

const changeStatusValidationRules = [
  check("status")
    .exists()
    .withMessage("Activated is required")
    .isIn([true, false])
    .withMessage("activated must not be true/false"),
]

const changePasswordValidationRules = [
  check("currentPassword")
    .exists()
    .withMessage("Current Password is required")
    .isLength({ min: 6 })
    .withMessage("Current Password must be atleast eight characters"),
  check("newPassword")
    .exists()
    .withMessage("New Password is required")
    .isLength({ min: 6 })
    .withMessage("New Password must be atleast eight characters"),
]

const addAddressValidationRules = [
  // check("addressDetials").exists().withMessage("Address Detials is required"),
  check("address").exists().withMessage("Address is required"),
  check("street").exists().withMessage("Street is required"),
  check("postalCode").exists().withMessage("Postcode is required"),
  check("city").exists().withMessage("City is required"),
  check("state").exists().withMessage("State is required"),
  check("country").exists().withMessage("Country is required"),
]

const editAddressValidationRules = [
  check("addressId").exists().withMessage("Address Id is required"),
  check("modifiedAddress").exists().withMessage("Address Detials is required"),
  check("modifiedAddress.addressName")
    .exists()
    .withMessage("Address Name is required"),
  check("modifiedAddress.email").isEmail().withMessage("Must be a email"),
  check("modifiedAddress.phone")
    .exists()
    .withMessage("Phone Number is required"),
  check("modifiedAddress.address").exists().withMessage("Addressis required"),
  check("modifiedAddress.postcode")
    .exists()
    .withMessage("Postcode is required"),
  check("modifiedAddress.city").exists().withMessage("City is required"),
  check("modifiedAddress.state").exists().withMessage("State is required"),
  check("modifiedAddress.country").exists().withMessage("Country is required"),
]

const addressIdValidationRules = [
  check("addressId").exists().withMessage("Address Id is required"),
]


/**
 * @Route Post /api/user/getUser
 * Validating the request body and passing the request to the controller
 */
router.get("/getUser", requireAuth, userController.GetUser)

/**
 * @Route Post /api/user/updateAccount
 * Validating the request body and passing the request to the controller
 */
router.put(
  "/updateAccount",
  requireAuth,
  Upload.single("photo"),
  userController.UpdateAccount
)

/**
 * @Route Post /api/user/updateAuthentication
 * Validating the request body and passing the request to the controller
 */
router.patch(
  "/updateAuthentication",
  requireAuth,
  updateAuthenticationValidationRules,
  userController.UpdateAuthentication
)

/**
 * @Route Post /api/user/changeStatus
 * Validating the request body and passing the request to the controller
 */
router.patch(
  "/changeStatus",
  requireAuth,
  changeStatusValidationRules,
  userController.ChangeStatus
)

/**
 * @Route Post /api/user/updateAuthentication
 * Validating the request body and passing the request to the controller
 */
router.patch(
  "/changePassword",
  requireAuth,
  changePasswordValidationRules,
  userController.ChangePassword
)


/**
 * @Route Post /api/user/getUser
 * Validating the request body and passing the request to the controller
 */
router.get("/getAddresses", requireAuth, userController.GetAddresses)

/**
 * @Route Post /api/user/addAddress
 * Validating the request body and passing the request to the controller
 */
router.put(
  "/addAddress",
  requireAuth,
  addAddressValidationRules,
  userController.AddAddress
)

/**
 * @Route Post /api/user/removeAddress
 * Validating the request body and passing the request to the controller
 */
router.delete(
  "/removeAddress",
  requireAuth,
  addressIdValidationRules,
  userController.RemoveAddress
)

/**
 * @Route Post /api/user/removeAddress
 * Validating the request body and passing the request to the controller
 */
router.put(
  "/editAddress",
  requireAuth,
  editAddressValidationRules,
  userController.EditAddress
)

/**
 * @Route Post /api/user/updateAddressStatus
 * Validating the request body and passing the request to the controller
 */
router.patch(
  "/updateAddressStatus",
  requireAuth,
  addressIdValidationRules,
  userController.UpdateAddressStatus
)

module.exports = router
