const User = require("../../database/models/user.model");
const jwt = require("jsonwebtoken");

class UserClass {
  static signup = async (req, res) => {
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

  static login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) res.send("not found");
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          const token = jwt.sign(user.toJSON(), process.env.JWTKEY);
          user.tokens = user.tokens.concat({ token });
          user.save();
          res.send({
            user,
            token: "jwt " + token,
            message: "Loged In",
          });
        } else res.send(err);
      });
    } catch (e) {
      res.send(e.message);
    }
  };

  static logout = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((el) => {
        return el.token != req.header("Authorization").replace("jwt ", "");
      });
      await req.user.save();
      res.status(200).send({
        apiStatus: true,
        message: "logged out",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e.message,
        message: "error in logout",
      });
    }
  };

  static logoutAll = async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.status(200).send({
        apiStatus: true,
        message: "logged out from all devices",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e.message,
        message: "error in logout",
      });
    }
  };

  static me = async (req, res) => {
    res.status(200).send({
      apiStatus: true,
      data: req.user,
      message: "data fetched",
    });
  };

  static activateUser = async (req, res) => {
    try {
      const userData = await User.findOne({
        otp: req.params.otp,
        userStatus: false,
      });
      if (!userData) throw new Error("no users to activate");
      userData.userStatus = true;
      userData.otp = "";
      await userData.save();
      res.status(200).send({
        apiStatus: true,
        data: userData,
        message: "activated",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: false,
        data: e.message,
        message: "error",
      });
    }
  };

  static showAll = async (req, res) => {
    try {
      const data = await User.find();
      res.send(data);
    } catch (e) {
      res.send(e);
    }
  };
  static profileImage = async (req, res) => {
    req.user.image = req.file.path;
    await req.user.save();
    res.send({
      data: req.user,
    });
  };
}

module.exports = UserClass;
