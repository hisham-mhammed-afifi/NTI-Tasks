require("dotenv").config();
require("../database/connection");

const cors = require("cors");
const express = require("express");
const passport = require("passport");

const userRoutes = require("../routes/user.routes");
const roleRoutes = require("../routes/role.routes");
const routeRoutes = require("../routes/route.routes");
const postRoutes = require("../routes/post.routes");
const commentRoutes = require("../routes/comment.routes");
const categoryRoutes = require("../routes/category.routes");
const tagRoutes = require("../routes/tag.routes");
const groupRoutes = require("../routes/group.routes");
const topicRoutes = require("../routes/topic.routes");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/routes", routeRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/categories", categoryRoutes);
app.use("/tags", tagRoutes);
app.use("/groups", groupRoutes);
app.use("/topics", topicRoutes);

module.exports = app;
