const amazonProductModel = require("../models/amazonProductModel");

const JeanTopModel = amazonProductModel.jeanTops;
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

exports.getAllProducts = async (req, res) => {
  try {
    const allJeanTops = await JeanTopModel.find();
    res.status(200).json({
      status: "success",
      totaLJeanTops: allJeanTops.length,
      data: {
        allJeanTops,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newJeanTop = await JeanTopModel.create(req.body);
    res.status(201).json({
      status: "Success",
      data: {
        jeanTop: newJeanTop,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const jeanTop = await JeanTopModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        jeanTop,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updatedJeanTop = await JeanTopModel.findByIdAndUpdate(
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
        updatedJeanTop,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await JeanTopModel.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "Success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err,
    });
  }
};
