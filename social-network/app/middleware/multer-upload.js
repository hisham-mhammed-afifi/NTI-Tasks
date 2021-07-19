const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, done) {
    done(null, "uploads");
  },
  filename: function (req, file, done) {
    done(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
