const Post = require("../../database/models/post.model");
class PostClass {
  static addPost = async (req, res) => {
    try {
      const post = new Post(req.body);
      await post.save();
      res.status(200).send("added successfully");
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static showPost = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).send(post);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static showAll = async (req, res) => {
    try {
      const post = await Post.find();
      res.status(200).send(post);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static updatePost = async (req, res) => {
    try {
      await Post.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).send("Updated successfully");
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static deletePost = async (req, res) => {
    try {
      await Post.findByIdAndDelete(req.body._id);
      res.status(200).send("Deleted successfully");
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
}

module.exports = PostClass;
