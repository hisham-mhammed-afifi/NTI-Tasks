const Tag = require("../../database/models/tag.model");
class TagClass {
  static addTag = async (req, res) => {
    try {
      const tag = new Tag(req.body);
      await tag.save();
      res.status(200).send("added successfully");
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static updateTag = async (req, res) => {
    try {
      await Tag.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).send("Updated successfully");
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static deleteTag = async (req, res) => {
    try {
      await Tag.findByIdAndDelete(req.body._id);
      res.status(200).send("Deleted successfully");
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
}

module.exports = TagClass;
