const Route = require("../../database/models/route.model");

const auth = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) throw new Error("no user in the request");

    const route = await Route.findOne({ url_name: req.originalUrl });
    const role = route.roles.find((role) => {
      return role.toString() == user.role.toString();
    });

    if (!role) throw new Error("there is NO role.");

    req.user = user;
    next();
  } catch (e) {
    res.status(500).send({
      apiStatus: false,
      data: e.message,
      message: "unauthorized user",
    });
  }
};

module.exports = auth;
