const express = require("express");
const viewControllers = require("../controllers/viewsController");
const router = express.Router();

router.get("/", viewControllers.home);
router.get("/categories", viewControllers.categories);

router.get("/kurthies", viewControllers.kurthiesPage);
router.get("/jeantops", viewControllers.jeanTopsPage);
router.get("/sandals", viewControllers.sanadalsPage);

module.exports = router;
