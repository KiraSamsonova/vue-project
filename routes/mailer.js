require('dotenv').config()
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.EMAIL_CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: process.env.EMAIL_REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken().catch(console.error)

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: "smtp.mail.ru",
    // port: 465,
    // secure: true, // true for 465, false for other ports

//     auth: {
//         type: "OAuth2",
//         user: "your.gmail.here@gmail.com", 
//         clientId: "Your ClientID Here",
//         clientSecret: "Your Client Secret Here",
//         refreshToken: "Your Refresh Token Here",
//         accessToken: accessToken
//    }

    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        // accesToken: 'ya29.a0AfH6SMBfc3zI8R02cAkNJxpV-jGULsNqkPHGT_1697I39vaaJjcCmmEvwAw06I6taKSSu0jXk6961jgq8_mm11TbIbrRLQQagk9YvD7E5Vac2Bgg06DnYU-0dE_pgjfS4Wr1e06VQMPFOKiCHITsHaUqY3BBMN81_g8',
        expires: Date.now() + 60000,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        accessToken: accessToken,
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        tls: {
            rejectUnauthorized: false
          }
        // accessUrl: 'https://oauth2.googleapis.com/token'
    }
});


module.exports.registrationEmailConfirmation = (email, confirmlink) => {
console.log(email)
    async function main() {

        transporter.verify((error, success) => {
            if (error) {
                console.log(error)
            }
            console.log('nodemailer works', success)
            // console.log(process.env.EMAIL)
            // console.log(process.env.EMAIL_REFRESH_TOKEN)
            // console.log(process.env.EMAIL_CLIENT_ID)
            // console.log(process.env.CLIENT_SECRET)
           
        })
        // send mail with defined transport object

        const mailOptions = {
            from: `"TESTTESTTEST" ${process.env.EMAIL}`, // sender address
            to: `${email}`, // list of receivers
            subject: "Завершение регистрации на rockstarbloggers", // Subject line
            text: "", // plain text body
            html: `<b>Здравствуйте!</b> Для завершения регистрации перейдите по ссылке: http://env-3501265.jelastic.regruhosting.ru/emailConfirmation/${confirmlink}`, // html body
       };

       transporter.sendMail(mailOptions, (error, response) => {
        error ? console.log(error) : console.log(response);
        transporter.close();
   });
    //     let info = await transporter.sendMail({


    //         from: `"Придумай название" ${process.env.EMAIL}`, // sender address
    //         to: `${email}`, // list of receivers
    //         subject: "Завершение регистрации на what-a-flower", // Subject line
    //         text: "", // plain text body
    //         html: `<b>Здравствуйте!</b> Для завершения регистрации перейдите по ссылке: localhost:8081/emailConfirmation/${confirmlink}`, // html body
        
    //         user: process.env.EMAIL,
            
    //         // accessUrl: 'https://oauth2.googleapis.com/token',
    //         accessToken  : accessToken,   
    //         expires: Date.now(),
    //         refreshToken : process.env.EMAIL_REFRESH_TOKEN,
    //         tls: {
    //             rejectUnauthorized: false
    //           }
        
    //     }); 

    //     console.log("Message sent: %s", info.messageId);
    //     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>


    }

    main().catch(console.error);

}

module.exports.finishingOrder = (usersEmail, userName, orderId, totalPrice, paymentType, deliveryType) => {
    console.log("H" + usersEmail + "H")
    async function main() {

        transporter.verify((error, success) => {
            if (error) {
                console.log(error)
            }
            console.log('nodemailer wirkt', success)
        })
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"Magnificent flowers" ${process.env.EMAIL}`, // sender address
            to: `${usersEmail}`, // list of receivers
            subject: "Новый заказ в магазине What-a-flower", // Subject line

            html: `
            

            <div ><p style="font-size: 1.2em;">${userName}, благодарим Вас за заказ в магазине <span style="font-weight: bold;" >Magnificent flowers </span></p>

            <div>Номер заказа: ${orderId}. </div><br>
            <div>Сумма к оплате: ${totalPrice}Р. </div><br>
            <div>Cпособ оплаты: ${paymentType}. </div><br>
            <div>Способ получение: ${deliveryType}.</div><br>
            
            </div>` // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>


    }

    main().catch(console.error);

}

module.exports.newPassLink = (user, link) => {

    async function main() {

        transporter.verify((error, success) => {
            if (error) {
                console.log(error)
            }
            console.log('nodemailer works', success)
        })
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"TESTTESTTEST" ${process.env.EMAIL}`, // sender address
            to: `${user.email}`, // list of receivers
            subject: "Восстановление пароля для рокстарблогерс", // Subject line
            text: `Здравствуйте, ${user.login}, чтобы восстановить пароль перейдите по ссылке:
            http://env-3501265.jelastic.regruhosting.ru/newpassword?passlink=${link} `
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>


    }

    main().catch(console.error);

}