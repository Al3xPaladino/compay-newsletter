//Inclusione librerie terze parti
const mysql = require("mysql2");
const fs = require("fs");
const uuid = require("uuid");

const QUERY = JSON.parse(fs.readFileSync(__dirname + "/queries.json"));

class DBModel {
    constructor() {
        this.pool = mysql
            .createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASW,
                database: process.env.DB_NAME,
            })
            .promise();
    }

    //Verifica connessione al database
    async verifyConnection() {
        try {
            const connection = await this.pool.getConnection();
            connection.release();
            return true;
        } catch {
            return false;
        }
    }

    //Ricerca utente tramite username
    async insertUser(userData) {
        try {
            const id = uuid.v4();
            console.log(id);
            const [insertResult] = await this.pool.query(QUERY.INSERT.USER, [
                id,
                userData.name,
                userData.phone,
                userData.email,
                userData.acceptPrivacy,
                userData.acceptUpdates
            ]);
            return insertResult;
        } catch (err) {
            if (err.sqlMessage.includes("Duplicate"))
                err.sqlMessage = "Email già registrata";
            return err;
        }
    }

    deletePool() {
        this.pool.end();
    }
}

module.exports = DBModel;
