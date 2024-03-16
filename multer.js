const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // The folder where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    // Generating a unique filename for the uploaded file
    cb(null, Date.now() + '-' + file.originalname);
  }
});


const upload = multer({ storage: storage });

module.exports = upload