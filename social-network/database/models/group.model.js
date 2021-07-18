const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["public", "private"],
    },
    members: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

//relation
postSchema.virtual("groupTopics", {
  ref: "Topic",
  localField: "_id",
  foreignField: "groupId",
});

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
