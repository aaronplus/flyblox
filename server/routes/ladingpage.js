const express = require("express")
const landingpage = require("../controllers/landingpage")
const router = express.Router()

/**
 * @Route get /api/landingpages/getBySlug
 * Validating the request body and passing the request to the controller
 */
router.get("/getBySlug/:slug", landingpage.GetBySlug)


module.exports = router