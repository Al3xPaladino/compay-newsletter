//Gestione environment avvio con o senza Docker
if(process.env.NODE_ENV != 'production'){
    require("dotenv").config({ path: '../development.env'});
}

//Inclusione librerie terze parti
const express = require('express');

//Inclusione librerie personali
const userRoutes = require('./routes/users')
const appError = require('./middlewares/error')

//Costanti
var cors = require('cors')
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use(userRoutes);
app.use(appError)

app.listen(port, () => console.log(`Listening on port ${port}...`));