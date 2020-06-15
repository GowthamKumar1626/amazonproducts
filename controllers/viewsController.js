const amazonProductModel = require("./../models/amazonProductModel");
const categoryViewModel = require("./../models/categoryViewModel");

const catchAsync = require("./../utils/catchAsync");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");

const categories = categoryViewModel.categories;

exports.home = catchAsync(async (req, res, next) => {
  res.status(200).render("base");
});
exports.categories = catchAsync(async (req, res, next) => {
  const allCategories = await categories.find();

  res.status(200).render("categories", {
    title: "GoodStyles|Categories",
    allCategories,
  });
});

exports.productsPage = catchAsync(async (req, res, next) => {
  const pageRequested = req.params.products;
  if (!amazonProductModel[pageRequested]) {
    return next(new AppError("Product is not found", 404));
  }
  const features = new APIFeatures(
    amazonProductModel[pageRequested].find(),
    req.query
  )
    .filter()
    .sort()
    .paginate();
  const products = await features.query;
  if (!products) {
    return next(new AppError("Product is not found", 404));
  }
  res.status(200).render("overview", {
    title: `GoodStyles|${pageRequested}`,
    products,
  });
});

exports.addProducts = catchAsync(async (req, res, next) => {
  const models = { ...amazonProductModel };
  res.status(200).render("addProducts", {
    title: "GoodStyles|Sandals",
    models,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "GoodStyles|Login",
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render("account", {
    title: "GoodStyles|My Page",
  });
};
