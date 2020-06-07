const mongoose = require("mongoose");

const categoryViewModel = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true,
  },
  categoryIcon: {
    type: String,
    required: true,
    trim: true,
  },
  catrgoryDescription: {
    type: String,
    required: true,
    trim: true,
  },
  types: {
    type: [String],
    required: true,
  },
  links: {
    type: [String],
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

exports.categories = mongoose.model("categories", categoryViewModel);
