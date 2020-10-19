require('dotenv').config()
const express = require('express');
const router = express.Router()
const User = require('../models/user')
const Emails = require('../models/Emails')
const Advertiser = require('../models/advertiser')
const Blogger = require('../models/blogger')
const passport = require('passport');
require('../config/passport')(passport)
const jwt = require('jsonwebtoken');
const config = require('../config/db')
const nodemailer = require("nodemailer");
const mailer = require('./mailer')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './front/src/assets/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage })
getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};
let idDebugger = (id, cb) => {

    if (id.length !== 24) {
        cb(false)

    }
    else {
        cb(true)
    }
}

router.post('/createNewProfile', (req, res) => {


    console.log(req.body)
    let id = req.body.belongTo
    console.warn(id)
    User.getUserById(id, (err, user) => {
        if (err) throw err
        if (!user) {

            return res.json({ success: false, msg: 'Пользователь с таким id НЕ найден' })
        } else {
            let b = req.body
            console.log(b.name, user._id)
            // СОЗДАЁМ МОДЕЛЬ USER ДЛЯ BD

            let newBlogger = new Blogger({
                belongTo: user._id,
                name: b.name,
                isParticipant: false,
                description: b.description,
                image: 'default',
                instagram: b.instagram,
                telegram: telegram,
                showInCommunication: b.showInCommunication,
                themes: b.themes,
                subscribersNumber: b.subscribersNumber,
                subscribersAge: b.subscribersAge,
                country: b.country,
                city: b.city,
                SubscribersGender: b.SubscribersGender,
                AveragePost: b.AveragePost,
                AverageStory: b.AverageStory,
                postPrice: b.postPrice,
                storyPrice: b.storyPrice,
                isCoopReady: b.isCoopReady,
                engagement: b.engagement,
            })

            // СОХРАНЯЕМ НОВОГО blogger В BD 
            Blogger.addBlogger(newBlogger, (err, blogger) => {
                if (err) {
                    console.log(err)
                    res.json({ success: false, msg: 'Новый blogger не был добавлен' })
                }
                else {

                    console.log(blogger)

                    res.json({ success: true, msg: 'Новый blogger был добавлен!', blogger: blogger })
                }
            })

        }
    })

});

router.post('/uploadBloggersImage',passport.authenticate('jwt', { session: false }), upload.single('image'), (req, res) => {

    var token = getToken(req.headers);

    if (token) {

        // ПОЛУЧАЕМ ID ИЗ ИМЕНИ ФАЙЛА
        let name = req.file.originalname
        const preForWho = name.split('.')
        preForWho.pop()
        const forWho = preForWho[0]
        console.log(forWho)
        let id = { _id: forWho }
        
        idDebugger(id, (isValid) => {

            if (!isValid) return res.json({ success: false, msg: 'id не верен на этапе получения параметра' })

            if (req.file) {
                Blogger.updateBloggersImage(id, { $set: { image: name } }, (err, blogger) => {
                    if (err) throw err
                    if (!blogger) return res.json({ success: false, msg: 'проблема в обновлении бд' })
                    else res.json({ success: true, msg: 'файл вроде загружен, а бд - обновлена' })
                })

            }
        })
    } else return res.status(403).send({ success: false, msg: 'Unauthorized.' });
});

router.post('/getEditingProfileInfo', passport.authenticate('jwt', { session: false }), (req, res) => {

    var token = getToken(req.headers);
    if (token) {

        let password = req.body.userInfo.password
        let id = req.body.userInfo._id
        let profileId = req.body.profileId
        console.log(password, id, profileId)
        idDebugger(profileId, (isValid) => {

            if (!isValid) return res.json({ success: false, msg: 'profileId не верен на этапе получения параметра' })

            User.getUserById(id, (err, user) => {
                if (err) throw err
                if (!user) return res.json({ success: false, msg: 'invalid id' })
    
                User.comparePass(password, user.password, (err, isMatch) => {
                    if (err) throw err
                    if (isMatch) {

                        // НАХОДИМ ПРОФИЛЬ ПО АЙДИ И БЕЛОНГИНС                    
                        Blogger.getBloggerById(profileId, (err, blogger) => {
                            if (err) throw err
                            if (!blogger) return res.json({ success: false, msg: 'profileId не соответсвует айди ни одного блогера' })
                            if (blogger.belongTo !== id) return res.json({ success: false, msg: 'ошибка: профиль не принадлежит юзеру' })
                            return res.json({ success: true, msg: 'ура! Профиль найден!', blogger:blogger })
                        })
                    
                    } else {
                        return res.json({ success: false, reason: "invalid password", msg: 'Неверный пароль' })
                    }
                })
            })        
        })
    } else return res.status(403).send({ success: false, msg: 'Unauthorized.' });

})

router.post('/replaceOneProfile', passport.authenticate('jwt', { session: false }), (req, res) => {

    var token = getToken(req.headers);

    if (token) {
        
        let b = req.body
        let id = b._id
        console.log(id)
        idDebugger(id, (isValid) => {

            if (!isValid) return res.json({ success: false, msg: 'id не верен на этапе получения параметра' })

            let editedBlogger = {
                belongTo: b.belongTo,
                name: b.name,
                isParticipant: b.isParticipant,
                description: b.description,
                image: b.image,
                instagram: b.instagram,
                telegram: b.telegram,
                showInCommunication: b.showInCommunication,
                themes: b.themes,
                subscribersNumber: b.subscribersNumber,
                subscribersAge: b.subscribersAge,
                country: b.country,
                city: b.city,
                SubscribersGender: b.SubscribersGender,
                AveragePost: b.AveragePost,
                AverageStory: b.AverageStory,
                postPrice: b.postPrice,
                storyPrice: b.storyPrice,
                isCoopReady: b.isCoopReady,
                engagement: b.engagement
            }
    
            // СОХРАНЯЕМ обновленного blogger В BD
            Blogger.editBlogger(id, editedBlogger, (err, blogger) => {
                if (err) {
                    console.log(err)
                    res.json({ success: false, msg: 'blogger не был отредактирован' })
                }
                else {
                    console.log(blogger)
                    res.json({ success: true, msg: 'blogger был отредактирован!', blogger: blogger })
                }
            })

        }) 
    } else return res.status(403).send({ success: false, msg: 'Unauthorized.' });

})

router.post('/deleteProfile', (req, res) => {



    let id = req.body.id
    console.log(id)
    Blogger.deleteBlogger(id, (err, blogger) => {
        if (err) throw err
        if (!blogger)
            return res.json({ success: false, msg: 'Блогеры не найдены' })
        else {
            res.json({ success: true, blogger: blogger, msg: 'Блогеры найдены' })
        }
    })
})

router.post('/allProfiles', passport.authenticate('jwt', { session: false }), (req, res) => {
    var token = getToken(req.headers);
    if (token) {
        console.log(req.body)
        let id = req.body.id
        console.log(id)
        Blogger.getBloggerByBelongTo(id, (err, blogger) => {
            if (err) throw err
            if (!blogger)
                return res.json({ success: false, msg: 'У вас ещё нет профилей' })
            else {
                res.json({ success: true, blogger: blogger, msg: 'профили найдены' })
            }
        });
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
})
module.exports = router;