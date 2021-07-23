const Topic = require("../../database/models/topic.model");
class TopicClass {
  static addTopic = async (req, res) => {
    try {
      const topic = new Topic(req.body);
      await topic.save();
      res.status(200).send("added successfully");
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static showTopic = async (req, res) => {
    try {
      const topic = await Topic.findById(req.params.id);
      res.status(200).send(topic);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static showAll = async (req, res) => {
    try {
      const topics = await Topic.find();
      res.status(200).send(topics);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static updateTopic = async (req, res) => {
    try {
      await Topic.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).send("Updated successfully");
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  static deleteTopic = async (req, res) => {
    try {
      await Topic.findByIdAndDelete(req.body._id);
      res.status(200).send("Deleted successfully");
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
}

module.exports = TopicClass;
