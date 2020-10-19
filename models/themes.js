const mongoose = require('mongoose');

const ThemesSchema = mongoose.Schema({
    'Без темы': {
        type: Number,
        required: true
    },
    'Авто': {
        type: Number,
        required: true
    }    ,
    'Бизнес': {
        type: Number,
        required: true
    }    ,
    'Дом, интерьер, ремонт': {
        type: Number,
        required: true
    }    ,
    'Животные': {
        type: Number,
        required: true
    }    ,
    'Жизнь заграницей': {
        type: Number,
        required: true
    }    ,
    'Здоровье': {
        type: Number,
        required: true
    }    ,
    'Изучение языков': {
        type: Number,
        required: true
    }    ,
    'Искусство': {
        type: Number,
        required: true
    }    ,
    'Книги': {
        type: Number,
        required: true
    }    ,
    'Красота, косметика': {
        type: Number,
        required: true
    }    ,
    'Лайфстайл': {
        type: Number,
        required: true
    }    ,
    'Лайфхаки': {
        type: Number,
        required: true
    }    ,
    'Мамочки': {
        type: Number,
        required: true
    }    ,
    'Маркетинг, реклама, бренд': {
        type: Number,
        required: true
    }    ,
    'Медицина': {
        type: Number,
        required: true
    }    ,
    'Мода, стиль': {
        type: Number,
        required: true
    }    ,
    'Мотивация': {
        type: Number,
        required: true
    }    ,
    'Музыка': {
        type: Number,
        required: true
    }    ,
    'Наука': {
        type: Number,
        required: true
    }    ,
    'Образование': {
        type: Number,
        required: true
    }    ,
    'Отношения': {
        type: Number,
        required: true
    }    ,
    'Похудение': {
        type: Number,
        required: true
    }    ,
    'Правильное питание, ЗОЖ': {
        type: Number,
        required: true
    }    ,
    'Природа, экология': {
        type: Number,
        required: true
    }    ,
    'Продуктивность': {
        type: Number,
        required: true
    }    ,
    'Профессии': {
        type: Number,
        required: true
    }    ,
    'Психология': {
        type: Number,
        required: true
    }    ,
    'Путешествия': {
        type: Number,
        required: true
    }    ,
    'Рецепты, еда': {
        type: Number,
        required: true
    }    ,
    'Рукоделие': {
        type: Number,
        required: true
    }    ,
    'СММ, продвижение блогов': {
        type: Number,
        required: true
    }    ,
    'Сад, огород, цветы': {
        type: Number,
        required: true
    }    ,
    'Саморазвитие': {
        type: Number,
        required: true
    }    ,
    'Секс': {
        type: Number,
        required: true
    }    ,
    'Семья': {
        type: Number,
        required: true
    }    ,
    'Спорт, фитнес': {
        type: Number,
        required: true
    }    ,
    'Танцы': {
        type: Number,
        required: true
    }    ,
    'Творчество': {
        type: Number,
        required: true
    }    ,
    'Феминизм': {
        type: Number,
        required: true
    }    ,
    'Фильмы, сериалы': {
        type: Number,
        required: true
    }    ,
    'Фотография': {
        type: Number,
        required: true
    }    ,
    'Эзотерика': {
        type: Number,
        required: true
    }    ,
    'Юмор': {
        type: Number,
        required: true
    }    ,
    'Другая тема': {
        type: Number,
        required: true
    }    



})

const Themes = module.exports = mongoose.model('Themes', ThemesSchema)

// module.exports.addThemes = function (themesObj, callback) {

//     themesObj.save(callback)

// }

module.exports.getAllThemes = function (callback) {

    Themes.find(callback)
}

// module.exports.editBlogger = function (id, editedBlogger, callback) {

//     const query = { _id: id }
//     const editedData = editedBlogger

//     Blogger.replaceOne(query, editedData, callback)

// }