const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "students/files");
  },
  filename: function (req, file, cb) {
    let customFileName = crypto.randomBytes(18).toString("hex");
    let fileExtension = path.extname(file.originalname).split(".")[1];
    cb(null, customFileName + "." + fileExtension);
  },
});

const multerUtil = multer({ storage });

const deleteFile = (file) => {
  const filePath = path.resolve(process.cwd(), `students/files/${file}`);
  console.log(`Download file in ${filePath}`);
  try {
    fs.unlinkSync(filePath);
  } catch (err) {
    console.log(`Error when delete file err : ${filePath}`);
  }
};

buildFileAddress = (file) => {
  return `${file}`;
};

module.exports = {
  multer: multerUtil,
  deleteFile,
  buildFileAddress,
};
