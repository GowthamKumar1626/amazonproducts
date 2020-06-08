const amazonProductModel = require("./../models/amazonProductModel");

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

exports.getAllProducts = async (req, res) => {
  try {
    const queryObj = { ...req.query }; //req.query is used for filtering
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\bgte|gt|lt|lte\b/g, (match) => `$${match}`);

    let query = KurthiModel.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-ratingsAverage");
    }

    const allKurthies = await query;
    // const allKurthies = await KurthiModel.find()
    //   .where("ratingsAverage")
    //   .equals(3.9);
    // const allKurthies = await KurthiModel.find();
    res.status(200).json({
      status: "success",
      totalKurthies: allKurthies.length,
      data: {
        allKurthies,
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
    const newKurthi = await KurthiModel.create(req.body);
    res.status(201).json({
      status: "Success",
      data: {
        kurthies: newKurthi,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const kurthie = await KurthiModel.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: {
        kurthie,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await KurthiModel.findByIdAndDelete(req.params.id);
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
