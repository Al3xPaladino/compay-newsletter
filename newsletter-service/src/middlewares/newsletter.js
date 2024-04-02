const ErrorHandler = require("../helper/ErrorHandler");

const regexName = new RegExp(/^[a-zA-ZàèéìòùÀÈÉÌÒÙáéíóúüÁÉÍÓÚÜ' ]+$/)
const regexEmail = new RegExp(/^(\s)*([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+(\s)*$/)
const regexPhone = new RegExp(/^(32[^15]|33[^20]|34[0-9]|35[^2-46-9]|36[^45790]|37[^6]|38[^125-7]|39[^4-689])(\d){6,7}/)

function validateSubscription(req, res, next) {
    const { name, phone, email, acceptPrivacy, acceptUpdates } = req.body;
    if (!name || !email)
        return next(new ErrorHandler(400, "Dati errati o mancanti"));

    if (!acceptPrivacy)
        return next(new ErrorHandler(400, "Devi accettare la privacy policy e i termini per continuare"));

    //Controllare che l'email e il nome siano corretti
    if(!regexEmail.test(email) || !regexName.test(name) || !regexPhone.test(phone))
        return next(new ErrorHandler(400, "Dati errati o mancanti"));

    res.locals.name = name.trim();
    res.locals.email = email.trim();
    res.locals.acceptPrivacy = acceptPrivacy == true ? "true" : "false";
    res.locals.acceptUpdates = acceptUpdates == true ? "true" : "false";
    res.locals.phone = phone ? "" : phone.trim();


    if (!res.locals.email || !res.locals.name)
        return next(new ErrorHandler(400, "Dati errati o mancanti"));

    return next();
}

module.exports = {
    validateSubscription,
};
