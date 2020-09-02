const mongoose = require('mongoose');
// 결제 테이블
const paymentSchema = mongoose.Schema({
    productId: { // 상품 아이디
        type: Schema.Types.ObjectId,
        ref:'Product'
    },
    userId: { // 유저 아이디
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    price: { // 결제금액
        type:Number,
    }
}, { timestamps: true })

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment }