const express = require("express");
const { check } = require("express-validator");
const requireAuth = require("../middlewares/requireAuth");
const newsletterController = require("../controllers/newsletter");
const router = express.Router();

const addValidationRules = [
    check("email")
        .exists()
        .withMessage("email is required")
        .notEmpty()
        .withMessage("email must not be empty"),
];

/**
 * @Route Post /api/newsletter/add
 * Validating the request body and passing the request to the controller
 */
router.post("/add", requireAuth, addValidationRules, newsletterController.Add);


module.exports = router;