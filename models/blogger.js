const mongoose = require('mongoose');

const BloggerSchema = mongoose.Schema({

    belongTo: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        required: true
    },
    isParticipant: {
        type: Boolean,
        required: true
    },
    themes: {
        type: Array,
        required: true
    },
    subscribersNumber: {
        type: Number,
        required: true
    },
    subscribersAge: {
        type: Array,
        required: true
    },
    country: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },

    SubscribersGender: {
        type: String,
        required: true
    },
    AveragePost: {
        type: Number,
        required: true
    },
    AverageStory: {
        type: Number,
        required: true
    },
    postPrice: {
        type: Number,
        required: true
    },
    storyPrice: {
        type: Number,
        required: true
    },

    telegram: {
        type: String,
        required: true
    },
    showInCommunication: {
        type: Boolean,
        required: true
    },
    isCoopReady: {
        type: Boolean,
        required: true
    },
    engagement: {
        type: Number,
        required: true 
    },
})

const Blogger = module.exports = mongoose.model('Blogger', BloggerSchema)

module.exports.addBlogger = function (newBlogger, callback) {

    newBlogger.save(callback)

}

module.exports.getBloggerById = function (id, callback) {
    Blogger.findById(id, callback)
}


module.exports.deleteBlogger = function (id, callback) {

    const query = { _id: id }
    Blogger.deleteOne(query, callback)

}

module.exports.editBlogger = function (id, editedBlogger, callback) {

    const query = { _id: id }
    const editedData = editedBlogger

    Blogger.replaceOne(query, editedData, callback)

}

module.exports.updateBloggersImage = function (id, imageString, callback) {

    const query = id
    const editedData = imageString

    Blogger.updateOne(query, editedData, callback)

}


module.exports.getBloggerByBelongTo = function (id, callback) {
    const query = { belongTo: id }
    Blogger.find(query, callback)
}

module.exports.getBloggersWithFilters = function (filtersValue, callback) {

    const query = filtersValue

    Blogger.find(query, callback)
}

module.exports.updateBloggersWithFilters = function (filterParam, changeableParam, callback) {
    const query = filterParam
    Blogger.updateMany(query, { $set: changeableParam }, callback)
}
