/** @format */

const express = require("express");
const router = express.Router();
const { Product } = require("../models/Product");
const { Image } = require("../models/Image");
const multer = require("multer");
const { parse, stringify } = require("flatted");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return cb(res.status(400).end("only images is allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

//=================================
//             Product
//=================================
router.post("/uploadfiles", (req, res) => {
  console.log(32, res.req.file);
  upload(req, res, (err) => {
    console.log(34, err);
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({ success: true, url: res.req.file.path, filename: res.req.file.filename });
  });
});

module.exports = router;
