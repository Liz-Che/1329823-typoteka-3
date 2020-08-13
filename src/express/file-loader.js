'use strict';

const path = require(`path`);
const multer = require(`multer`);
const VALID_MIME_TYPES = [`image/png`, `image/jpg`, `image/jpeg`];

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, path.resolve(__dirname, `../express/public`, `img`));
  },
  filename: (req, file, cb) =>{
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file && VALID_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    req.fileValidationError = true;
    cb(null, false);
  }
};

module.exports = {
  multer,
  storage,
  fileFilter
};
