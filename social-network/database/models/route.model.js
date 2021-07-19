const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  url_name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

const Route = mongoose.model("Route", routeSchema);
module.exports = Route;
