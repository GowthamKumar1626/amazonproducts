const express = require("express");
const {
  checkBody,
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("./../controllers/kurthiController");

const router = express.Router();

//router.param("id", checkId);

router.route("/").get(getAllProducts).post(createProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
