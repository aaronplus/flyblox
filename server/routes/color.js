const express = require("express");
const { check } = require("express-validator");
const requireAuth = require("../middlewares/requireAuth");
const colorController = require("../controllers/color");
const router = express.Router();

const addValidationRules = [
  check("name")
    .exists()
    .withMessage("Name is required")
    .notEmpty()
    .withMessage("Name must not be empty"),
];

/**
 * @Route Post /api/color/add
 * Validating the request body and passing the request to the controller
 */
router.post("/add", requireAuth, addValidationRules, colorController.Add);

/**
 * @Route Post /api/color/getAll
 * Validating the request body and passing the request to the controller
 */
router.get("/getAll", requireAuth, colorController.GetAll);

module.exports = router;
