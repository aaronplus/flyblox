const multer = require("multer");
const fs = require("fs");

const isImage = (type) => {
  const mimeTypes = ["image/jpeg", "image/png"];
  return mimeTypes.includes(type);
};

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    let path;
    if (isImage(file.mimetype)) {
      path = "./public/uploads/" + req.decoded.userId + "/";
    }

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    callback(null, path);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, " ") + "-" + file.originalname
    );
  },
});

const Upload = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    if (!isImage(file.mimetype)) {
      cb(new Error("only upload files with jpg or jpeg format."));
    }
    cb(undefined, true);
  },
});

module.exports = Upload;
