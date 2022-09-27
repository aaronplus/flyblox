const express = require("express");
const { check } = require("express-validator");
const requireAuth = require("../middlewares/requireAuth");
const categoryController = require("../controllers/category");
const router = express.Router();

/**
 * @Route Post /api/category/getAll
 * Validating the request body and passing the request to the controller
 */
router.get("/getAll", categoryController.GetAll);

/**
 * @Route Post /api/category/getById
 * Validating the request body and passing the request to the controller
 */
router.get("/getById/:id", categoryController.GetById);

module.exports = router;
