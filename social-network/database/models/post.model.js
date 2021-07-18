const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    title: {
      type: String,
      trim: true,
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
    tags: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

//relation
postSchema.virtual("postComments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "postId",
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
