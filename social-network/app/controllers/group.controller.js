const Group = require("../../database/models/group.model");

class GroupClass {
  static addGroup = async (req, res) => {
    try {
      const group = new Group(req.body);
      await group.save();
      res.status(200).send("added successfully");
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static updateGroup = async (req, res) => {
    try {
      await Group.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).send("Updated successfully");
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static deleteGroup = async (req, res) => {
    try {
      await Group.findByIdAndDelete(req.body._id);
      res.status(200).send("Deleted successfully");
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static joinGroup = async (req, res) => {
    try {
      const userId = req.user._id;
      const group = await Group.findById(req.body._id);
      group.members = group.members.concat(userId);
      await group.save();
      res.status(200).send("Joined successfully");
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
}

module.exports = GroupClass;
