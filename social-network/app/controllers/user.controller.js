const User = require("../../database/models/user.model");

class UserController {
  static register = async (req, res) => {
    try {
      const userData = new User(req.body);
      await userData.save();
      //send email==>
      res.status(200).send({
        apiStatus: true,
        data: userData,
        message: "user added successful",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e.message,
        message: "error adding new user",
      });
    }
  };
}

module.exports = UserController;
