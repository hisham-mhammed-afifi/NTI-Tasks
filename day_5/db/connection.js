const mongoose = require("mongoose");
const db = process.env.DB;

mongoose.connect(db, {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
