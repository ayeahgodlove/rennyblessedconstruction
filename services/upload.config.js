const multer = require("multer");

function imageFilter(req, file, cb) {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    return cb(new Error("Invalid image type"));
  }
}

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword" ||
    file.mimetype === "text/plain" ||
    file.mimetype === "application/zip" ||
    file.mimetype === "application/vnd.ms-excel"
  ) {
    cb(null, true);
  } else {
    return cb(new Error("Invalid image type"));
  }
}

function fileStorage(folderName) {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `./public/uploads/${folderName}/`);
    },
    filename: (req, file, cb) => {
      const originalname = file.originalname;
      const filename = `${originalname.replace(/\s+/g, "").toLowerCase()}`;
      cb(null, filename);
    },
  });
}

function uploadImage(folderName) {
  return multer({
    storage: fileStorage(folderName),
    imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  });
}

function uploadFile(folderName) {
  return multer({
    storage: fileStorage(folderName),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  });
}

module.exports = { uploadImage, uploadFile };
