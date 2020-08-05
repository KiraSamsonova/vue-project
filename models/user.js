const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/db');

const UserSchema = mongoose.Schema({


    email: {
        type: String,
        required: true
    },
    isConfirmed: {
        type: Boolean,
        required: true
    },
    newPassLink: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },

    registrationDate: {
        type: Date,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    isParticipant: {
        type: Boolean,
        required: true
    },
    favourites: {
        type: Array,
        required: true
    },

})

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.addUser = function (newUser, callback) {

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser.save(callback)
        })
    })

}

module.exports.comparePass = function (passFromUser, userDBPass, callback) {
    bcrypt.compare(passFromUser, userDBPass, (err, isMatch) => {
        if (err) throw err
        callback(null, isMatch)
    })
}

module.exports.getAllUsersWithFilters = function (filters, callback) {
    const query = filters
    User.find(query, callback)
}

module.exports.getUserByEmail = function (email, callback) {
    const query = { email: email }
    User.findOne(query, callback)
}

module.exports.changeEmail = function (id, newEmail, isParticipant, callback) {
    const query = { _id: id }
    User.updateOne(query, { $set: { email: newEmail, isConfirmed: false, isParticipant: isParticipant } }, callback)
}

module.exports.updateUsersWithFilters = function (filterParam, changeableParam, callback) {
    const query = filterParam
    User.updateMany(query, { $set: changeableParam }, callback)
}


module.exports.isConfirmedTrue = function (id, callback) {
    const query = { _id: id }
    User.updateOne(query, { $set: { isConfirmed: true } }, callback)
}

module.exports.changingPassProcess = function (id, newPassLink, callback) {
    const query = { _id: id }
    User.updateOne(query, { $set: { newPassLink: newPassLink } }, callback)
}


module.exports.changingPassCheck = function (passLink, callback) {
    const query = { newPassLink: passLink }

    User.findOne(query, callback)
}

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback)
}

module.exports.updatePass = function (id, newPass, callback) {

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPass, salt, (err, hash) => {
            if (err) throw err
            //  newPass = hash

            const query = { _id: id }
            User.updateOne(query, { $set: { password: hash } }, callback)

        })
    })

}

module.exports.newPassSave = function (passLink, newPass, callback) {

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newPass, salt, (err, hash) => {
            if (err) throw err
            //  newPass = hash

            const query = { newPassLink: passLink }
            User.updateOne(query, { $set: { password: hash }, $unset: { newPassLink: "" } }, callback)

        })
    })

    // User.updateOne(query, { $unset: { newPassLink: "" } }, callback)
}

module.exports.updateUserFavArr = function (id, favArr, callback) {

    const query = { _id: id }
    const editedData = { favourites: favArr }

    User.updateOne(query, editedData, { upsert: true, }, callback)

}
