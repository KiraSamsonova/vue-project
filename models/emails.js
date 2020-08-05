const mongoose = require('mongoose');

const EmailsSchema = mongoose.Schema({

    emails: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        required: true
    },


})

const Emails = module.exports = mongoose.model('Emails', EmailsSchema)




module.exports.replaceEmails = function (emails, callback) {

    const query = {}
    const editedData = emails

    Emails.replaceOne(query, editedData, { upsert: true }, callback)

}

module.exports.getEmails = function (callback) {

    const query = {}

    Emails.find(query, callback)

}