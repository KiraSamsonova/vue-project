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

router.post('/registration', (req, res) => {
    let email = req.body.email
    // ПРОВЕРЯЕМ АУТЕНТИЧНОСТЬ EMAIL
    User.getUserByEmail(email, (err, user) => {
        if (err) throw err
        if (user) {
            return res.json({ success: false, msg: 'Пользователь с таким email уже существует' })

        } else {
            console.log('Email is origin, new user creation proccess is beginning')

            // СОЗДАЕМ ССЫЛКУ ДЛЯ ПОДТВЕРЖДЕНИЯ EMAIL
            // function confirmEmailString() {
            //     // Создаём псевдоуникальную строку на основе почты
            //     let confirmEmailStringRow = `${req.body.email.length * 3}${req.body.email[1]}${req.body.login[1]}g${req.body.email.length * 4}mo${req.body.email[2]}bh${req.body.login[0]}${req.body.email.length * 5}${req.body.email[3]}tt${req.body.email[0]}${req.body.login[2]}${req.body.login.length * 3}`


            //     let confirmation = `confirm${confirmEmailStringRow}`
            //     return confirmation
            // }

            // Проверяем isParticipant 
            Emails.getEmails((err, emails) => {
                if (err)
                    res.json({ success: false, msg: 'Ошибка в бд' })
                let emailArr = emails[0].emails
                let isParticipant = false
                if (emailArr.includes(email))
                    isParticipant = true


                // СОЗДАЁМ МОДЕЛЬ USER ДЛЯ BD
                let newUser = new User({

                    email: email,
                    isConfirmed: false,
                    password: req.body.password,
                    registrationDate: Date.now(),
                    role: req.body.role,
                    isParticipant: isParticipant,
                    favourites: [],
                })
                console.log(newUser)
                // СОХРАНЯЕМ НОВОГО ПОЛЬЗОВАТЕЛЯ В BD 
                User.addUser(newUser, (err, user) => {
                    if (err)
                        res.json({ success: false, msg: 'Новый пользователь не был добавлен' })

                    mailer.registrationEmailConfirmation(user.email, user._id)
                    console.log(user)

                    res.json({ success: true, msg: 'Новый пользователь был добавлен!' })

                })
            })
        }

    })

});

router.post('/confirmEmail', (req, res) => {


    let confirmLink = req.body.confirmLink
    console.log('Конфирмейшнлинк, ну или айди: ' + confirmLink)
    if (confirmLink.length != 24) {
        return res.json({ success: false, msg: 'ссылка подтверждения невалидна' })

    }
    User.getUserById(confirmLink, (err, user) => {
        if (err) throw err
        if (!user)
            return res.json({ success: false, msg: 'такой email не зарегестрирован или ссылка подтверждения невалидна' })

        if (user.isConfirmed === true) {
            console.log('user with email: ' + user.email + ' is already confirmed')
            return res.json({ success: false, msg: 'этот email уже подтвержден' })
        }
        if (user && user.isConfirmed === false) {

            User.isConfirmedTrue(confirmLink, (err, newValue) => {
                if (err) throw err
                if (!newValue)
                    return res.send({ success: false, msg: 'не удалось подтвердить email' })
                res.send({ success: true, msg: 'ваша электронная почта подтверждена' })

            })
        }
    })
})

router.post('/changeEmail', passport.authenticate('jwt', { session: false }), (req, res) => {

    var token = getToken(req.headers);
    if (token) {

        let oldEmail = req.body.oldEmail
        let newEmail = req.body.newEmail
        let id = req.body.id

        idDebugger(id, (isValid) => {

            if (!isValid)
                return res.json({ success: false, msg: 'id isNotValid' })


            console.log(id, oldEmail, newEmail)

            // ПРОВЕРЯЕМ АУТЕНТИЧНОСТЬ EMAIL
            User.getUserByEmail(req.body.newEmail, (err, user) => {
                if (err) throw err
                if (user)
                    return res.json({ success: false, msg: 'Пользователь с таким email уже существует' })

                ///////////////////
                // Проверяем isParticipant 
                Emails.getEmails((err, emails) => {
                    if (err)
                        res.json({ success: false, msg: 'Ошибка в бд' })
                    let emailArr = emails[0].emails
                    let isParticipant = false
                    if (emailArr.includes(newEmail))
                        isParticipant = true

                    User.changeEmail(id, newEmail, isParticipant, (err, response) => {
                        if (err) throw err
                        if (!response || response.n === 0) {
                            console.log(response)
                            return res.json({ success: false, msg: 'smth got absolutely wrong' })
                        }

                        mailer.registrationEmailConfirmation(newEmail, id)
                        return res.json({ success: true, msg: 'email изменен', email: newEmail, isParticipant: isParticipant })


                    })
                })
            })
        })
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
})

router.post('/changePassword', passport.authenticate('jwt', { session: false }), (req, res) => {

    var token = getToken(req.headers);
    if (token) {

        let id = req.body.user.id
        if (id.length !== 24) return res.json({ success: false, msg: 'invalid id' })
        let oldPass = req.body.user.oldPass
        let newPass = req.body.user.newPass

        User.getUserById(id, (err, user) => {
            if (err) throw err
            if (!user)
                return res.json({ success: false, msg: 'invalid id' })

            User.comparePass(oldPass, user.password, (err, isMatch) => {
                if (err) throw err
                if (isMatch) {

                    User.updatePass(id, newPass, (err, response) => {
                        if (err) throw err
                        if (!response || response.n === 0)
                            return res.json({ success: false, msg: 'smth got absltly wrng' })

                        return res.json({ success: true, msg: 'pass was changed!' })
                    })

                } else {
                    return res.json({ success: false, reason: "invalid password", msg: 'Неверный пароль' })
                }
            })
        })
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
});

router.post('/authentification', (req, res) => {

    console.log(req.body)
    const email = req.body.email
    const password = req.body.password

    User.getUserByEmail(email, (err, user) => {
        if (err) throw err
        if (!user)
            return res.json({ success: false, reason: "invalid email", msg: 'Пользователь с таким email не был найден' })

        User.comparePass(password, user.password, (err, isMatch) => {
            if (err) throw err
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret);
                user.password = undefined
                return res.json({ success: true, token: 'JWT ' + token, user: user });

            } else {
                return res.json({ success: false, reason: "invalid password", msg: 'Неверный пароль' })
            }
        })
    })
});

router.post('/createNewPassLink', (req, res) => {
    const email = req.body.email

    User.getUserByEmail(email, (err, user) => {
        if (err) throw err
        if (!user) {
            return res.json({ success: false, msg: 'Пользователь с таким email не был найден' })
        }
        else {

            let newPassLink = user._id

            User.changingPassProcess(user._id, newPassLink, (err, result) => {
                if (err) throw err
                if (!result) {
                    return res.json({ success: false, msg: 'Не знаю, что пошло не так' })
                }
                else {
                    console.log(newPassLink)
                    mailer.newPassLink(user, newPassLink)
                }
            })


            return res.json({ success: true, msg: 'письмо с инструкцией по восстановлению пароля отправлено на вашу почту' })
        }
    })

    //
})

router.post('/passConfirmLinkCheck', (req, res) => {
    const confirmLink = req.body.confirmLink
    console.log(confirmLink)
    User.changingPassCheck(confirmLink, (err, user) => {
        if (err) throw err
        if (!user) {
            // || user.n === 0
            return res.json({ success: false, msg: 'confirmLink not valid' })
        }

        return res.json({ success: true, msg: 'confirmLink valid, придумайте новый пароль' })

    })

    //
})

router.post('/newPassSave', (req, res) => {
    const confirmLink = req.body.confirmLink
    const newPass = req.body.newPass
    console.log(confirmLink, newPass)
    User.newPassSave(confirmLink, newPass, (err, newValue) => {
        if (err) throw err

        console.log(newValue)
        res.json({ success: true, msg: "пароль обновлен" })

    })

})









// not needed










// not needed
router.get('/dashboard', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('что-то сработало')
    res.send('личный кабинет');
});
// not needed
router.get('/checkout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('checkout');
    //re.sjon true or false
});

// Не нужно
router.post('/sendEmail', (req, res) => {
    if (!req.body) return res.sendStatus(400);

    mailer.registrationEmailConfirmation()



    res.send(JSON.stringify({ data: 'alles ist okey' }))
})

router.post('/orderInfo', (req, res) => {
    console.log(req.body.order)
    Order.getOrderById(req.body.order, (err, order) => {
        if (err) throw err
        if (!order) {
            return res.json({ success: false, msg: 'какая-то странная ошибка' })

        } else {
            res.json(order);

        }
    })
})


module.exports = router;