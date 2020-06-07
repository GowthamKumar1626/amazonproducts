const amazonProductModel = require("./../models/amazonProductModel");
const catchAsync = require("./../utils/catchAsync");

const KurthiModel = amazonProductModel.kurthies;
const JeansTopModel = amazonProductModel.jeanTops;

exports.home = (req, res) => {
  res.status(200).render("base");
};

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
