//Inclusione librerie terze parti
const express = require('express')

//Inclusione librerie personali
const DbModel = require('../models/db/db_model')
const middlewaresNewsletter = require('../middlewares/newsletter')
const ErrorHandler = require('../helper/ErrorHandler')

const fs = require('fs');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');


const transporter = nodemailer.createTransport({
    host: "smtp.compay.it",
    logger: true,
    secure: false,
    port: 587,
    auth: {
        user: "newsletter@compay.it",
        pass: "NewsWebm4il2024@",
    },
    tls: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: false
    }
});


//Costanti
const db = new DbModel()
const router = express.Router()
const path = require('path');




router.post('/subscribe', middlewaresNewsletter.validateSubscription, async (req, res, next) => {
    try {
        if(! await db.verifyConnection())
            throw new ErrorHandler(500, 'Errore del sistema')

        const insertResult = await db.insertUser(res.locals)
        if(insertResult instanceof Error)
            throw new ErrorHandler(400, insertResult.sqlMessage)

        const filePath = path.join(__dirname, '../templates/mail.html');
            
        // Leggi il file HTML
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        // Compila il template
        const template = handlebars.compile(source);

        // I dati da inserire nel template
        const data = { name: res.locals.name };

        // HTML finale
        const htmlToSend = template(data);

        const info = await transporter.sendMail({
            from: 'newsletter@compay.it', // sender address
            to: res.locals.email, // list of receivers
            subject: "Iscrizione newsletter Compay", // Subject line
            html: htmlToSend, // html body
        });

        if(info instanceof Error)
            throw new ErrorHandler(400, "Errore durante l'invio della mail")

        return res.json(true)

    } catch (err) {
        next(err)
    }
})

module.exports = router;