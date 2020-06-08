const amazonProductModel = require("./../models/amazonProductModel");
const categoryViewModel = require("./../models/categoryViewModel");
const catchAsync = require("./../utils/catchAsync");

const KurthiModel = amazonProductModel.kurthies;
const JeansTopModel = amazonProductModel.jeanTops;
const sandalModel = amazonProductModel.sandals;
const categories = categoryViewModel.categories;

const filtering = (req, model) => {
  const queryObj = { ...req.query }; //req.query is used for filtering
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\bgte|gt|lt|lte\b/g, (match) => `$${match}`);

  let query = model.find(JSON.parse(queryStr));

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-ratingsAverage");
  }
  return query;
};

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
  const query = filtering(req, KurthiModel);
  const products = await query;

  res.status(200).render("overview", {
    title: "GoodStyles|Kurthies",
    products,
  });
});
exports.jeanTopsPage = catchAsync(async (req, res) => {
  const query = filtering(req, JeansTopModel);
  const products = await query;

  res.status(200).render("overview", {
    title: "GoodStyles|Jean-Tops",
    products,
  });
});
exports.sanadalsPage = catchAsync(async (req, res) => {
  const query = filtering(req, sandalModel);
  const products = await query;

  res.status(200).render("overview", {
    title: "GoodStyles|Sandals",
    products,
  });
});
