import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  fileName(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const checkFileType = (file, cb) => {
  const fileTypes = /jpg|jpeg|png/;
  const extNames = fileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeType = fileTypes.test(file.mimetype);

  if (extNames && mimeType) {
    console.log("IN UPLOADER", file.mimetype);

    return cb(null, true);
  } else {
    cb("Images only!");
  }
};

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  console.log("IN UPLOADER");
  res.send(`/${req.file.path}`);
});

export default router;
