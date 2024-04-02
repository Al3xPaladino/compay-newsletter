function appError(err,req,res,next) {
    console.log(err)
    res.status(err.code).send(err.message)
}

module.exports = appError