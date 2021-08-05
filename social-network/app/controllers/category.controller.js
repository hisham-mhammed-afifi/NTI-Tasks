const Category = require("../../database/models/category.model");

class CategoryClass {
  static addCategory = async (req, res) => {
    try {
      const category = new Category(req.body);
      await category.save();
      res.status(200).send("added successfully");
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static showAll = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).send(categories);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static deleteCategory = async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.body._id);
      res.status(200).send("Deleted successfully");
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
}

module.exports = CategoryClass;
