const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

//relation
categorySchema.virtual("categoryPosts", {
  ref: "Post",
  localField: "_id",
  foreignField: "categoryId",
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
