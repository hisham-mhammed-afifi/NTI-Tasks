const mongoose = require("mongoose");

const options = {
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose.connect(process.env.DBURL, options);
