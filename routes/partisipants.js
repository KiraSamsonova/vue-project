require('dotenv').config()
const fetch = require('node-fetch');
const User = require('../models/user')
const Emails = require('../models/Emails')
const Blogger = require('../models/blogger')

let ssk = process.env.CLUB_SECRET_KEY
let askForExportKey = `https://rockstarbloggers.getcourse.ru/pl/api/account/groups/631649/users?key=${ssk}&added_at[from]=20100101`

const getOrUpdatePartisipants = () => {
    fetch(`${askForExportKey}`)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            if (!json || json.success === false) return console.log('smth wrong')

            setTimeout(() => {
                let exportKey = json.info.export_id
                console.log(exportKey)
                let gettingResult = `https://rockstarbloggers.getcourse.ru/pl/api/account/exports/${exportKey}?key=${ssk}`
                fetch(`${gettingResult}`)
                    .then(response => response.json())
                    .then(json => {

                        let emailArr = []
                        json.info.items.forEach(item => {
                            //   console.log(elem)

                            emailArr.push(item[1])


                        });
                        emailArr.unshift('advertiser2')
                        emailArr.unshift('1234')
                        emailArr.unshift('userTestPart')
                        console.log(emailArr.length)
                        console.log(emailArr[0])
                        let editedEmails = {
                            emails: emailArr,
                            date: Date.now()
                        }


                        Emails.replaceEmails(editedEmails, (err, response) => {
                            if (err) console.log(err)

                            console.log(response)
                            // ВЫПОЛНИТЬ ЗДЕСЬ ФУНКЦИЮ ПРОВЕРКИ СУЩ ЕМАИЛОВ
                            globalCheckIsParticipant(emailArr)
                        })

                    })


            }, 3000 * 10);





        })

}
// setTimeout(() => {
//     getOrUpdatePartisipants();

// }, 2000);

setInterval(() => {
    getOrUpdatePartisipants();

}, 1000 * 800 * 100);


const globalCheckIsParticipant = (emailArr) => {

    // Получить все из бд user
    User.getAllUsersWithFilters({}, (err, user) => {
        if (err) throw err
        if (!user)
            return console.log('whaaat')


        // Отсортировать email'ы на includes и нет
        let isParticipant = []
        let isNotParticipant = []
        user.forEach(elem => {
            if (emailArr.includes(elem.email)) {
                isParticipant.push(elem._id)
            } else {
                isNotParticipant.push(elem._id)
            }
        })
        //  Сделать isParticipant = True для всех User да 
        Blogger.updateBloggersWithFilters({ belongTo: isParticipant }, { isParticipant: true }, (err, response) => {
            if (err) throw err
            
            console.log(response)
        })
        Blogger.updateBloggersWithFilters({ belongTo: isNotParticipant }, { isParticipant: false }, (err, response) => {
            if (err) throw err
            
            console.log(response)
        })

        User.updateUsersWithFilters({ _id: isParticipant }, { isParticipant: true }, (err, response) => {
            if (err) throw err
           
            console.log(response)
        })
        User.updateUsersWithFilters({ _id: isNotParticipant }, { isParticipant: false }, (err, response) => {
            if (err) throw err
           
            console.log(response)
        })






    });






}
//globalCheckIsParticipant(emailArr)

