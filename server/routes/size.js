const express = require("express");
const { check } = require("express-validator");
const requireAuth = require("../middlewares/requireAuth");
const sizeController = require("../controllers/size");
const router = express.Router();

const addValidationRules = [
  check("name")
    .exists()
    .withMessage("Name is required")
    .notEmpty()
    .withMessage("Name must not be empty"),
];

/**
 * @Route Post /api/size/add
 * Validating the request body and passing the request to the controller
 */
router.post("/add", requireAuth, addValidationRules, sizeController.Add);

/**
 * @Route Post /api/size/getAll
 * Validating the request body and passing the request to the controller
 */
router.get("/getAll", requireAuth, sizeController.GetAll);

module.exports = router;
