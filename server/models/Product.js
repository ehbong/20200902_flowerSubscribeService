/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 상품 테이블
const productSchema = mongoose.Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    // 상품이름
    type: String,
  },
  discription: {
    // 상품 설명
    type: String,
  },
  price: {
    // 가격
    type: Number,
  },
  cycle: {
    // 상품 제공 주기 (3일, 7일, 30일) 등등
    type: Number,
  },
  thumbnail: {
    // 썸네일
    type: String,
  },
  size: {
    // 크기
    type: String,
  },
  configuration: {
    // 상품구성
    type: String,
  },
  CountryOfOrigin: {
    // 원산지
    type: String,
  },
  quantity: {
    // 판매수량
    type: Number,
  },
  status: {
    // 판매여부 1(yes) or 0(no)
    type: Number,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
