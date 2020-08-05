require('dotenv').config()
const express = require('express');
const cors = require('cors');
const nodemon = require('nodemon');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db')
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
const account = require('./routes/account');
const profiles = require('./routes/profiles');
const bloggers = require('./routes/bloggers');

const Emails = require('./models/Emails')


const port = process.env.PORT || 8080

//для работы с POST-запросами
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = express.json();

app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

app.use(cors())
app.use('/account', account)
app.use('/bloggers', bloggers)

app.use('/profiles', profiles)
//static-files
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('connected', () => {
    console.log('Успешное подключение к MongoDB')

})
mongoose.connection.on('error', (err) => {
    console.log('Ошибка подключения MongoDB' + err)
})

//partisipants.newFunc() 




app.listen(port, () => {
    console.log('serv');
});

