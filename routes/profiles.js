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
                communication: b.communication,
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
                isCoopReady: b.isCoopReady
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

router.post('/uploadBloggersImage', upload.single('image'), (req, res) => {
    console.log('11111111111111111111111111')
    console.log(req.file.originalname)
    console.log('11111111111111111111111111')
    let name = req.file.originalname
    const preForWho = name.split('.')
    preForWho.pop()
    const forWho = preForWho[0]
    console.log(forWho)
    let id = { _id: forWho }


    if (req.file) {
        Blogger.updateBloggersImage(id, { $set: { image: name } }, (err, blogger) => {
            if (err) throw err
            if (!blogger)
                return res.json({ success: false, msg: 'проблема в обновлении бд' })

        })


        res.json({ success: true, msg: 'файл вроде загружен, а бд - обновлена' })
    }
    else res.json({ success: false, msg: 'файл вроде НЕ загружен' })
});

router.post('/replaceOneProfile', (req, res) => {

    console.log(req.body)
    // console.log(req.body._id)
    let id = req.body._id
    //  console.log(id)


    let b = req.body
    //   console.log('5ebca6b14d7f3f1e3c1703d9')

    // console.log(b.belongTo.slice(1, b.belongTo.length - 1))

    // .slice(1, req.body._id.length - 1),
    let editedBlogger = {
        belongTo: b.belongTo,
        name: b.name,
        isParticipant: b.isParticipant,
        description: b.description,
        image: b.image,
        instagram: b.instagram,
        communication: b.communication,
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
        isCoopReady: b.isCoopReady
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

});

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