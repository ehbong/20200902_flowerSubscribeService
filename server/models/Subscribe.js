/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 구독 테이블
const subscribeSchema = mongoose.Schema(
  {
    productId: {
      //상품 Id
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    userId: {
      // 유저 Id
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    contractMonth: {
      // 구독 개월
      type: String,
    },
    contractUse: {
      // 구독 유효 여부
      type: String,
    },
  },
  { timestamps: true },
);

const Subscribe = mongoose.model("Subscribe", subscribeSchema);

module.exports = { Subscribe };
