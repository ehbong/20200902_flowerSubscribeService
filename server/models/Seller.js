/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellerSchema = Schema(
  {
    userId: {
      // 유저 아이디
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    serviceArea: {
      type: String,
    },
    storeName: {
      type: String,
    },
  },
  { timestamps: true },
);

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = { Seller };
