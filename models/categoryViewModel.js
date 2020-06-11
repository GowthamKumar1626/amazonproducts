const mongoose = require("mongoose");
const slugify = require("slugify");

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
  slug: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

categoryViewModel.pre("save", function (next) {
  this.slug = slugify(this.category, { lower: true });
  next();
});

exports.categories = mongoose.model("categories", categoryViewModel);
