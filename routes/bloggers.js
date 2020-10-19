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

    let r = req.body
    // Чистим от пустых строк и нулевых значений
    for (var elem in r) {
        let el = r[elem]
        if (el === '' || el === null || el === false || typeof el === 'object' && el.length === 0) 
            delete r[elem] 
    }
    console.log(r)

    const createFiltersObj = () => {
        let filtersObj = {}
        if(r.themes) filtersObj.themes = { $in: r.themes }
        if(r.country) filtersObj.country = r.country
        if(r.city) filtersObj.city = r.city
        if(r.subscribersAge) filtersObj.subscribersAge = { $in: r.subscribersAge }
        if(r.SubscribersGender && !r.SubscribersGender.includes('Любой')) filtersObj.SubscribersGender = { $in: r.SubscribersGender}

        if (r.sbcMin || r.sbcMax) {

            let subscribersNumber = {
                $gte: r.sbcMin || 0, 
                $lte: r.sbcMax || 1000000000
            }
            filtersObj.subscribersNumber = subscribersNumber
        }

        if (r.postRangeMin || r.postRangeMax) {
            let AveragePost = {
                $gte: r.postRangeMin || 0, 
                $lte: r.postRangeMax || 1000000000
            }
            filtersObj.AveragePost = AveragePost
        }

        if (r.storyRangeMin || r.storyRangeMax) {
            let AverageStory = {
                $gte: r.storyRangeMin || 0, 
                $lte: r.storyRangeMax || 1000000000
            }
            filtersObj.AverageStory = AverageStory
        }

        if (r.engagementMin || r.engagementMax) {
            let engagement = {
                $gte: r.engagementMin || 0, 
                $lte: r.engagementMax || 100000000
            }
            filtersObj.engagement = engagement
        }

        if (r.postPriceMin || r.postPriceMax) {
            let postPrice = {
                $gte: r.postPriceMin || 0, 
                $lte: r.postPriceMax || 1000000000
            }
            filtersObj.postPrice = postPrice
        }

        if (r.storyPriceMin || r.storyPriceMax) {
            let storyPrice = {
                $gte: r.storyPriceMin || 0, 
                $lte: r.storyPriceMax || 1000000000
            }
            filtersObj.storyPrice = storyPrice
        }

        if(r.isParticipant) filtersObj.isParticipant = r.isParticipant
        
        if(r.isCoopReady) filtersObj.isCoopReady = r.isCoopReady

        console.log(filtersObj)
        return filtersObj
// Тестить, тестить и ещё раз тестить!
    }

    Blogger.getBloggersWithFilters(createFiltersObj(), (err, blogger) => {
        if (err) throw err
        if (!blogger)
            return res.json({ success: false, msg: 'Блогеры не найдены' })
        else {
             console.log(blogger.length)
            res.json({ success: true, blogger: blogger, msg: 'Блогеры найдены' })
        }
    });


})

router.post('/findBloggerById', (req, res) => {

    let r = req.body.id

    console.log(r)

    idDebugger(r, (isValid) => {

        if (!isValid) return res.json({ success: false, msg: 'id isNotValid' })

        Blogger.getBloggerById(r, (err, blogger) => {
            if (err) throw err
            if (!blogger)
                return res.json({ success: false, msg: 'Блогер не найден' })
            else {

                res.json({ success: true, blogger: blogger, msg: 'Блогер найден' }) 
            }
        });
    })
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