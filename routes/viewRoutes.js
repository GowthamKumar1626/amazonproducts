const express = require("express");
const viewControllers = require("../controllers/viewsController");
const authController = require("../controllers/authController");
const router = express.Router();

router.get("/", authController.isLoggedIn, viewControllers.home);
router.get(
  "/categories",
  authController.isLoggedIn,
  viewControllers.categories
);
router.get(
  "/categories/:products",
  authController.isLoggedIn,
  viewControllers.productsPage
);

router.get(
  "/amazon/addproducts",
  authController.isLoggedIn,
  viewControllers.addProducts
);
router.get("/login", authController.isLoggedIn, viewControllers.getLoginForm);
router.get("/me", authController.protect, viewControllers.getAccount);

module.exports = router;
