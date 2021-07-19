const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, done) {
    const imagePath = path.join("uploads", req.user._id.toString());
    fs.mkdir(imagePath, (err) => {
      if (err) return;
    });
    done(null, imagePath);
  },
  filename: function (req, file, done) {
    done(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 150000,
  },
  //   fileFilter: function (req, file, done) {
  //     const fileType = "." + req.body.fileType;
  //     const ext = path.extname(file.originalname);
  //     if (ext != fileType) {
  //       return done(new Error("invalid extension"));
  //     }
  //     done(null, true);
  //   },
});

module.exports = upload;
