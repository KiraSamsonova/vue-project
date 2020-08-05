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

router.post('/allBloggers', (req, res) => {

    //console.log(token)



    console.log(req.body)
    // let subscribersNumber = {
    //     city: 'Москва'
    // }

    Blogger.getBloggersWithFilters(req.body, (err, blogger) => {
        if (err) throw err
        if (!blogger)
            return res.json({ success: false, msg: 'Блогеры не найдены' })
        else {
            // console.log(blogger)
            res.json({ success: true, blogger: blogger, msg: 'Блогеры найдены' })
        }
    });


})


router.post('/showFavBloggers', passport.authenticate('jwt', { session: false }), (req, res) => {
    var token = getToken(req.headers);
    if (token) {
        let favArr = req.body.favArr
        console.log(favArr)
        console.log(typeof favArr)
        if (!favArr || typeof favArr !== 'object' || favArr.length === 0)

            return res.json({ success: false, msg: 'биг мистейк с фавАрр' })
        const filters = { _id: { $in: favArr } }

        Blogger.getBloggersWithFilters(filters, (err, blogger) => {
            if (err) throw err
            if (!blogger)
                return res.json({ success: false, msg: 'фав блогеры не отправлены' })
            else {

                res.json({ success: true, blogger: blogger, msg: 'фав блогеры отправлены' })
            }
        });


    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
})

router.post('/saveFavBloggers', passport.authenticate('jwt', { session: false }), (req, res) => {
    var token = getToken(req.headers);
    if (token) {
        let FavObj = req.body.FavObj
        console.log(FavObj)
        console.log(FavObj.favArr)
        idDebugger(FavObj.id, (isValid) => {

            if (!isValid)
                return res.json({ success: false, msg: 'id isNotValid' })


            User.updateUserFavArr(FavObj.id, FavObj.favArr, (err, response) => {
                if (err) throw err
                if (!response)
                    return res.json({ success: false, msg: 'какие-то проблемы' })
                else {
                    console.log(response)
                    res.json({ success: true, msg: 'вроде фав апдейтед' })
                }
            });
        })
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
})

module.exports = router;