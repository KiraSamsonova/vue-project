require('dotenv').config()
const express = require('express');
const router = express.Router()
const Themes = require('../models/themes')
const config = require('../config/db')


router.post('/getAllThemes', (req, res) => {
    Themes.getAllThemes((err, themes) => {
        if (err) throw err
        if (!themes)
            return res.json({ success: false, msg: 'themes не найдены' })
        else {
            res.json({ success: true, themes: themes, msg: 'themes найдены' })
        }
    });
})

// router.post('/savethemes', (req, res) => {
//     console.log(req.body)

//                 // СОЗДАЁМ МОДЕЛЬ USER ДЛЯ BD
//              let themesArr = [
//                     'Авто',
//                     'Бизнес',
//                     'Красота, косметика',
//                     'Жизнь заграницей',
//                     'Здоровье',
//                     'Медицина',
//                     'Изучение языков',
//                     'Книги',
//                     'Лайфстайл',
//                     'Мамочки',
//                     'Маркетинг, реклама, бренд',
//                     'Мотивация',
//                     'Наука',
//                     'Фотография',
//                     'Образование',
//                     'Отношения',
//                     'Похудение',
//                     'Правильное питание, ЗОЖ',
//                     'Психология',
//                     'Путешествия',
//                     'Саморазвитие',
//                     'Секс',
//                     'Семья',
//                     'Сад, огород, цветы',
//                     'СММ, продвижение блогов',
//                     'Спорт, фитнес',
//                     'Танцы',
//                     'Искусство',
//                     'Творчество',
//                     'Феминизм',
//                     'Лайфхаки',
//                     'Дом, интерьер, ремонт',
//                     'Животные',
//                     'Мода, стиль',
//                     'Музыка',
//                     'Природа, экология',
//                     'Продуктивность',
//                     'Профессии',
//                     'Рецепты, еда',
//                     'Рукоделие',
//                     'Фильмы, сериалы',
//                     'Эзотерика',
//                     'Юмор']

//                 themesArr.sort();
//                 themesArr.push('Другая тема');
//                 themesArr.unshift('Без темы');
//                 console.log(themesArr)
//                 let themesOBJ = new Themes({

//                     'Без темы': 1,
//                     'Авто': 0,
//                     'Бизнес': 0,
//                     'Дом, интерьер, ремонт': 0,
//                     'Животные': 0,
//                     'Жизнь заграницей': 0,
//                     'Здоровье': 0,
//                     'Изучение языков': 0,
//                     'Искусство': 0,
//                     'Книги': 0,
//                     'Красота, косметика': 0,
//                     'Лайфстайл': 0,
//                     'Лайфхаки': 0,
//                     'Мамочки': 1,
//                     'Маркетинг, реклама, бренд': 1,
//                     'Медицина': 0,
//                     'Мода, стиль': 0,
//                     'Мотивация': 0,
//                     'Музыка': 1,
//                     'Наука': 1,
//                     'Образование': 0,
//                     'Отношения': 0,
//                     'Похудение': 0,
//                     'Правильное питание, ЗОЖ': 0,
//                     'Природа, экология': 1,
//                     'Продуктивность': 0,
//                     'Профессии': 0,
//                     'Психология': 0,
//                     'Путешествия': 0,
//                     'Рецепты, еда': 0,
//                     'Рукоделие': 0,
//                     'СММ, продвижение блогов': 1,
//                     'Сад, огород, цветы': 0,
//                     'Саморазвитие': 0,
//                     'Секс': 0,
//                     'Семья': 0,
//                     'Спорт, фитнес': 0,
//                     'Танцы': 0,
//                     'Творчество': 0,
//                     'Феминизм': 0,
//                     'Фильмы, сериалы': 0,
//                     'Фотография': 0,
//                     'Эзотерика': 0,
//                     'Юмор': 0,
//                     'Другая тема': 0

//                 })


    
//                 // СОХРАНЯЕМ НОВОГО blogger В BD 
//                 Themes.addThemes(themesOBJ, (err, themes) => {
//                     if (err) {
//                         console.log(err)
//                         res.json({ success: false, msg: 'Новый result не был добавлен' })
//                     }
//                     else {
    
//                         console.log(themes)
    
//                         res.json({ success: true, themes: themes, msg: 'themes найдены' })    
//                     }
//                 })
    
//     })


module.exports = router;







module.exports = router;