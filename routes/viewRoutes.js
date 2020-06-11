const express = require("express");
const viewControllers = require("../controllers/viewsController");
const router = express.Router();

router.get("/", viewControllers.home);
router.get("/categories", viewControllers.categories);
router.get("/categories/:products", viewControllers.productsPage);

router.get("/addproducts", viewControllers.addProducts);

module.exports = router;
