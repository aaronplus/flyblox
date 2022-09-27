const express = require("express")
const { check } = require("express-validator")
const requireAuth = require("../middlewares/requireAuth")
const tokenController = require("../controllers/token")
const router = express.Router()

const addValidationRules = [
  check("name")
    .exists()
    .withMessage("Name is required")
    .notEmpty()
    .withMessage("Name must not be empty"),
]

/**
 * @Route Post /api/token/add
 * Validating the request body and passing the request to the controller
 */
router.post("/add", requireAuth, addValidationRules, tokenController.Add)

/**
 * @Route Post /api/token/getAll
 * Validating the request body and passing the request to the controller
 */
router.get("/getAll", requireAuth, tokenController.GetAll)

/**
 * @Route Post /api/token/getAll
 * Validating the request body and passing the request to the controller
 */
router.post("/convertUSD", tokenController.ConvertUSD)

module.exports = router
