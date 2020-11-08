require('dotenv').config()
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router()
const User = require('../models/user')
const Emails = require('../models/emails')
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

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(email, salt, (err, hash) => {
                    if (err) throw err
                    // passlink creation process
                    let emailConfirmLink = hash
                    emailConfirmLink = emailConfirmLink.split('.').join('').split('/').join('')
           
            // Проверяем isParticipant 
                    Emails.getEmails((err, emails) => {
                        if (err) res.json({ success: false, msg: 'Ошибка в бд' })
                        let emailArr = emails[0].emails
                        let isParticipant = false
                        if (emailArr.includes(email))
                            isParticipant = true

                        // СОЗДАЁМ МОДЕЛЬ USER ДЛЯ BD
                        let newUser = new User({

                            email: email,
                            isConfirmed: false,
                            emailConfirmLink: emailConfirmLink,
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
                })
            })    
        }
    })
});

router.post('/confirmEmail', (req, res) => {

    let confirmLink = req.body.confirmLink
    console.log('Конфирмейшнлинк: ' + confirmLink)
  
    User.emailConfirmation(confirmLink, (err, user) => {
        if (err) throw err
        if (user.n == 0) return res.json({ success: false, msg: 'такой email не зарегестрирован или ссылка подтверждения невалидна' })
        
        res.json({ success: true, msg: 'ваша электронная почта подтверждена' })

    })
        
    
})

router.post('/changeEmail', passport.authenticate('jwt', { session: false }), (req, res) => {

    var token = getToken(req.headers);
    if (token) {

        let password = req.body.password
        let newEmail = req.body.newEmail
        let id = req.body.id

        idDebugger(id, (isValid) => {

            if (!isValid) return res.json({ success: false, msg: 'id isNotValid' })

            console.log(id, password, newEmail)

            User.getUserById(id, (err, user) => {
                if (err) throw err
                if (!user) return res.json({ success: false, msg: 'invalid id' })
    
                User.comparePass(password, user.password, (err, isMatch) => {
                    if (err) throw err
                    if (isMatch) {

                    // ПРОВЕРЯЕМ АУТЕНТИЧНОСТЬ EMAIL
                    User.getUserByEmail(newEmail, (err, user) => {
                        if (err) throw err
                        if (user) return res.json({ success: false, msg: 'Пользователь с таким email уже существует' })

                        // Проверяем isParticipant 
                        Emails.getEmails((err, emails) => {
                            if (err) res.json({ success: false, msg: 'Ошибка в бд' })
                            let emailArr = emails[0].emails
                            let isParticipant = false
                            if (emailArr.includes(newEmail)) isParticipant = true

                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(newEmail, salt, (err, hash) => {
                                    if (err) throw err
                                    // passlink creation process
                                    let emailConfirmLink = hash
                                    emailConfirmLink = emailConfirmLink.split('.').join('').split('/').join('')

                                    User.changeEmail(id, newEmail, isParticipant, emailConfirmLink, (err, response) => {
                                        if (err) throw err
                                        if (!response || response.n === 0) {
                                            console.log(response)
                                            return res.json({ success: false, msg: 'smth got absolutely wrong' })
                                        }
                                        mailer.registrationEmailConfirmation(newEmail, emailConfirmLink)
                                        return res.json({ success: true, msg: 'email изменен', email: newEmail, isParticipant: isParticipant })

                                    })
                                })
                            })
                        })
                    })
                } else {
                    return res.json({ success: false, reason: "invalid password", msg: 'Неверный пароль' })
                }
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

        let id = req.body.id
        idDebugger(id, (isValid) => {
            if (!isValid) return res.json({ success: false, msg: 'id isNotValid' })

        let newPass = req.body.newPass
        let oldPass = req.body.oldPass

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
            return res.json({ success: false, reason: "invalid email", msg: 'email' })

        User.comparePass(password, user.password, (err, isMatch) => {
            if (err) throw err
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret);
                user.password = undefined
                user.emailConfirmLink = undefined
                return res.json({ success: true, token: 'JWT ' + token, user: user });

            } else {
                return res.json({ success: false, reason: "invalid password", msg: 'password' })
            }
        })
    })
});

router.post('/createNewPassLink', (req, res) => {
    const email = req.body.email

    User.getUserByEmail(email, (err, user) => {
        if (err) throw err
        if (!user) {
            return res.json({ success: false, msg: 'email' })
        }
        else {
            let idString = `${user._id}`.slice(20, 24)
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(idString, salt, (err, hash) => {
                    if (err) throw err

                    // passlink creation process
                    let newPassLink = hash
                    console.log('newPassLink')
                    newPassLink = newPassLink.split('.').join('').split('/').join('')

                    User.changingPassProcess(user._id, newPassLink, (err, result) => {
                        if (err) throw err
                        if (!result) {
                            return res.json({ success: false, msg: 'otherReason' })
                        }
                        else {
                            console.log(newPassLink)
                            mailer.newPassLink(user, newPassLink)
                        }
                    })

                    return res.json({ success: true, msg: 'письмо с инструкцией по восстановлению пароля отправлено на вашу почту' })
                })
            })
        }
    })

    //
})

router.post('/passLinkCheck', (req, res) => {
    const passLink = req.body.passLink
    console.log(passLink)
    User.changingPassCheck(passLink, (err, user) => {
        if (err) throw err
        if (!user) {
            return res.json({ success: false, msg: 'passLink not valid' })
        }
        return res.json({ success: true, msg: 'passLink is valid, придумайте новый пароль' })
    })
})

router.post('/newPassSave', (req, res) => {
    const passLink = req.body.passLink
    const newPass = req.body.newPass
    console.log(passLink, newPass)
    User.newPassSave(passLink, newPass, (err, newValue) => {
        if (err) throw err
        console.log(newValue)
        res.json({ success: true, msg: "пароль обновлен" })
    })
})

router.post('/changeRole', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('i was used')
    var token = getToken(req.headers);
    if (token) {
        let changeRole = req.body.changeRole
        console.log(changeRole)

        idDebugger(changeRole.id, (isValid) => {

            if (!isValid) return res.json({ success: false, msg: 'id isNotValid' })

            User.changeRole(changeRole.id, changeRole.role, (err, response) => {
                if (err) throw err
                if (!response)
                    return res.json({ success: false, msg: 'какие-то проблемы' })
                else {
                    console.log(response)
                    res.json({ success: true, msg: 'вроде role апдейтед' })
                }
            });
        })
    } else {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
    }
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