const mongoose = require('mongoose');
const config = require('../config/db');

const UserSchema = mongoose.Schema({


    UsersEmail: {
        type: String,
        required: true
    },

    orderValue: {
        type: Object, // [{артикул: количество}, {артикул2: количество2}]
        required: true
    },

    orderInfo: {
        type: Object, // [{поле: значение}, {поле: значение}]
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    },



})

const Order = module.exports = mongoose.model('Order', UserSchema)

module.exports.addOrder = function (newOrder, callback) {

    newOrder.save(callback)

}

module.exports.getOrderById = function (id, callback) {
    Order.findById(id, callback)
}