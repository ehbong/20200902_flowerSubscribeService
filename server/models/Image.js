/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 이미지 테이블
const imageSchema = mongoose.Schema(
  {
    productId: {
      // 상품 아이디
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    userId: {
      // 유저 아이디
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    filePath: {
      // 파일 경로
      type: String,
    },
  },
  { timestamps: true },
);

const Image = mongoose.model("Image", imageSchema);

module.exports = { Image };
