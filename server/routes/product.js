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
  console.log("업로드 라우터");
  //console.log(res);
  // 이미지를 서버에 저장한다.
  upload(req, res, (err) => {
    console.log(err);
    if (err) {
      return res.json({ success: false, err });
    }
    console.log(res.req);
    // const reqObj = parse(res.req);
    // console.log(reqObj);
    //return res.json({ success: true, url: reqObj.file.path, filename: reqObj.file.filename });
  });
});

module.exports = router;
