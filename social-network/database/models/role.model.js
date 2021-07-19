const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
});

roleSchema.virtual("roleUsers", {
  ref: "User",
  localField: "_id",
  foreignField: "role",
});

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
