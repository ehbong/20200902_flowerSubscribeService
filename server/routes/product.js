/** @format */

const express = require("express");
const router = express.Router();
const { Product } = require("../models/Product");
const { Image } = require("../models/Image");
const multer = require("multer");
const { parse, stringify } = require("flatted");
const db = require("mongoose");

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

// 이미지 파일 업로드
router.post("/uploadfiles", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({ success: true, url: res.req.file.path, filename: res.req.file.filename });
  });
});
// 상품 추가
router.post("/add", async (req, res) => {
  // 트랜젝션 생성을 위한 설정
  const SESSION = await db.startSession();
  // 트랜젝션 세션 생성
  SESSION.startTransaction();

  req.body.thumbnail = req.body.images[0] ? req.body.images[0].response.url : "";
  const product = new Product(req.body);
  try {
    await product.save((err, doc) => {
      console.log(err);
      if (err) throw new Error("some error"); // 오류시 트랜젝션 오류 쓰로우
      req.body.images.map((obj, idx) => {
        let imgParam = {
          productId: doc._id,
          userId: req.body.seller,
          filePath: obj.response.url,
        };
        const img = new Image(imgParam);
        img.save((err, doc) => {
          if (err) throw new Error("some error"); // 오류시 트랜젝션 오류 쓰로우
        });
      });
      console.log(doc);
    });
    await SESSION.commitTransaction(); // 트랜젝션 반영
  } catch (error) {
    // 오류시 트랜젝션 롤백
    await SESSION.abortTransaction();
    return res.status(400).json({ success: false, err });
  } finally {
    // 트랜젝션 종료
    SESSION.endSession();
  }
  return res.status(200).json({
    success: true,
  });
});

module.exports = router;
