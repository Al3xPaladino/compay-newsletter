class ErrorHandler extends Error {
    constructor(code , message){
        super(message)
        this.code = code
        this.handle()
    }

    handle() {
        switch(this.code){
            case 400: this.badRequest(); break
            case 401: this.unauthorized(); break
            case 404: this.notFound(); break
            case 500: this.serverError(); break
            default: this.message = `${this.message || 'Errore interno, riprova...'}`
        }
    }

    badRequest(){ this.message = `${this.message || 'Bad request'}` }

    notFound(){ this.message = `${this.message || 'Risorsa non trovata'}` }

    unauthorized(){ this.message = `${this.message || 'Non autorizzato'}` }

    serverError()
    { 
        console.log(this.message)
        //Inserimento dell'errore in un database o invio di una email
        this.message = `${this.message || 'Errore interno al server'}` 
    }

}

module.exports = ErrorHandler