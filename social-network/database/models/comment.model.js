const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    postId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    body: {
      type: String,
      trim: true,
      required: true,
    },
    replys: [
      {
        userId: {
          type: mongoose.Types.ObjectId,
          required: true,
        },
        body: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
