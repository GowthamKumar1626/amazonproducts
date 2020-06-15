const express = require("express");
const {
  getAllUsers,
  updateMe,
  deleteMe,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("./../controllers/userController");

const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/forgotpassword", authController.forgotPassword);
router.patch("/resetpassword/:token", authController.resetPassword);
router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);

router.patch("/updateMe", authController.protect, updateMe);
router.patch("/deleteMe", authController.protect, deleteMe);

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
module.exports = router;
