const amazonProductModel = require("./../models/amazonProductModel");
const categoryViewModel = require("./../models/categoryViewModel");
const catchAsync = require("./../utils/catchAsync");

const KurthiModel = amazonProductModel.kurthies;
const JeansTopModel = amazonProductModel.jeanTops;
const categories = categoryViewModel.categories;

exports.home = catchAsync(async (req, res) => {
  res.status(200).render("base");
});
exports.categories = catchAsync(async (req, res) => {
  const allCategories = await categories.find();
  res.status(200).render("categories", {
    title: "GoodStyles|Categories",
    allCategories,
  });
});

exports.kurthiesPage = catchAsync(async (req, res) => {
  const products = await KurthiModel.find();

  res.status(200).render("overview", {
    title: "GoodStyles|Kurthies",
    products,
  });
});
exports.jeanTopsPage = catchAsync(async (req, res) => {
  const products = await JeansTopModel.find();

  res.status(200).render("overview", {
    title: "GoodStyles|Kurthies",
    products,
  });
});
