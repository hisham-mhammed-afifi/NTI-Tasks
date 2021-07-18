const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Group",
    },
    title: {
      type: String,
      trim: true,
      unique: true,
    },
    content: {
      type: String,
      trim: true,
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

const Topic = mongoose.model("Topic", topicSchema);
module.exports = Topic;
