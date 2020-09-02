const mongoose = require('mongoose');
// 상품 테이블
const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    name: { // 상품이름
        type:String,
        unique: 1 
    },
    price: { // 가격
        type:Number
    },
    thumbnail :{ // 썸네일
        type: String
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }