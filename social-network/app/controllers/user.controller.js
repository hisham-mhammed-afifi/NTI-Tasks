const User = require("../../database/models/user.model");
const jwt = require("jsonwebtoken");
const macaddress = require('macaddress');
const nodemailer = require("nodemailer");
const port = process.env.PORT;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MYEMAIL,
    pass: process.env.PASSWORD,
  },
});

class UserClass {
  static signup = async (req, res) => {
    try {
      console.log(req.body);
      const userData = new User(req.body);
      await userData.save();
      const mailOption = {
        from: "hish.abdelshafouk@gmail.com",
        to: "hish.abdelshafouk@gmail.com",
        subject: "to activate account",
        text: `http://${req.hostname}:${port}/users/activate/${userData.otp}`,
      };
      //send email==>
      transporter.sendMail(mailOption, (err, info) => {
        if (err) {
          res.send("Error" + err);
        }
      });
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

  static activateUser = async (req, res) => {
    try {
      const userData = await User.findOne({
        otp: req.params.otp,
        accountStatus: false,
      });
      if (!userData) throw new Error("no users to activate");
      userData.accountStatus = true;
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

  static login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) res.send("not found");
      if (!user.accountStatus) throw new Error("Account NOT activated.");
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {  
                 
          macaddress.one((err, mac) => {
            if(err)  {
              console.log("err in mac address", err);
            }else{
              if(!user.macs.includes(mac)) {
                const token = jwt.sign(user.toJSON(), process.env.JWTKEY); 
            user.macs = user.macs.concat(mac)
            user.tokens = user.tokens.concat({ token });
            console.log(mac);
          }  
          }
            }
          );
          const token = user.tokens[0].token
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

  static me = async (req, res) => {
    res.status(200).send({
      apiStatus: true,
      data: req.user,
      message: "data fetched",
    });
  };

  static showAll = async (req, res) => {
    try {
      const data = await User.find();
      res.send(data);
    } catch (e) {
      res.send(e);
    }
  };

  static image = async (req, res) => {
    const photoPath = req.file.path;
    req.user.photos = req.user.photos.concat({ photo: photoPath });
    await req.user.save();
    res.send({
      data: req.user.photos,
    });
  };

  static logout = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token != req.header("Authorization").replace("jwt ", "");
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
}

module.exports = UserClass;
