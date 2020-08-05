const mongoose = require('mongoose');

const AdvertiserSchema = mongoose.Schema({

    belongTo: {
        type: String,
        required: true
    },



})

const Advertiser = module.exports = mongoose.model('Advertiser', AdvertiserSchema)

// module.exports.getUserByEmail = function (email, callback) {
//     const query = { email: email }
//     User.findOne(query, callback)
// }

