const Comment = require("../../database/models/comment.model");

class CommentClass {
  static addComment = async (req, res) => {
    try {
      const comment = new Comment(req.body);
      await comment.save();
      res.status(200).send("added successfully");
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static updateComment = async (req, res) => {
    try {
      await Comment.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).send("Updated successfully");
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static deleteComment = async (req, res) => {
    try {
      await Comment.findByIdAndDelete(req.body._id);
      res.status(200).send("Deleted successfully");
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
}

module.exports = CommentClass;
