const mongoose = require("mongoose");

const amazonProductSchema = new mongoose.Schema({
  productBy: {
    type: String,
    required: true,
    trim: true,
  },
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  imageCover: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: true,
    trim: true,
  },
  colors: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  ratingsAverage: {
    type: Number,
    default: 0,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  link: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

exports.kurthies = mongoose.model("Kurthies", amazonProductSchema);
exports.jeanTops = mongoose.model("JeanTops", amazonProductSchema);
exports.sandals = mongoose.model("sandals", amazonProductSchema);
