"use strict";


module.exports = (err, req, res, next) => {
    const statusCode = res.errorStatusCode ?? 500
    res.status(statusCode).send({
        error: true, 
        message: err.message, 
        cause: err.cause
        
    })
}