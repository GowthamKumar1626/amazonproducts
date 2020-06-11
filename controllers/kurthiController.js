const amazonProductModel = require("./../models/amazonProductModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");
const KurthiModel = amazonProductModel.kurthies;
// const kurthiesData = JSON.parse(
//   fs.readFileSync(`${__dirname}/../data/Kurthis.json`)
// );

exports.checkBody = (req, res, next) => {
  if (!req.body.productName || !req.body.price) {
    return res.status(404).json({
      status: "Fail",
      message: "Missing some parameters",
    });
  }
  next();
};

exports.getAllProducts = catchAsync(async (req, res) => {
  const features = new APIFeatures(KurthiModel.find(), req.query)
    .filter()
    .sort()
    .paginate();
  const allKurthies = await features.query;
  res.status(200).json({
    status: "success",
    totalKurthies: allKurthies.length,
    data: {
      allKurthies,
    },
  });
});

exports.createProduct = catchAsync(async (req, res) => {
  const newKurthi = await KurthiModel.create(req.body);
  res.status(201).json({
    status: "Success",
    data: {
      kurthies: newKurthi,
    },
  });
});

exports.getSingleProduct = catchAsync(async (req, res) => {
  const kurthie = await KurthiModel.findById(req.params.id);
  if (!kurthie) {
    return next(new AppError("No tour found with that id", 404));
  }
  res.status(200).json({
    status: "Success",
    data: {
      kurthie,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res) => {
  const updatedKurthie = await KurthiModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "Success",
    data: {
      updatedKurthie,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res) => {
  await KurthiModel.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "Success",
    data: null,
  });
});

exports.getAllProductsStatistics = catchAsync(async (req, res) => {
  const stats = await KurthiModel.aggregate([
    {
      $match: { ratingsAverage: { $gte: 3.0 } },
    },
    {
      $group: {
        _id: null, // _id: '$colors';
        avgRating: { $avg: "$ratingsAverage" },
        maxRating: { $max: "$ratingsAverage" },
        minRating: { $min: "$ratingsAverage" },
      },
    },
  ]);
  res.status(200).json({
    status: "Success",
    data: stats,
  });
});
