const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // Specify the directory for uploads
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original file name
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit to 10MB
  },
});

module.exports = upload;
