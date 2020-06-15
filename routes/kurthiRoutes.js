const express = require("express");
const {
  checkBody,
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAllProductsStatistics,
} = require("./../controllers/kurthiController");
const authController = require("./../controllers/authController");

const router = express.Router();

//router.param("id", checkId);

router
  .route("/")
  .get(authController.protect, getAllProducts)
  .post(createProduct);
router.route("/stats").get(getAllProductsStatistics);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "seller"),
    deleteProduct
  );

module.exports = router;
