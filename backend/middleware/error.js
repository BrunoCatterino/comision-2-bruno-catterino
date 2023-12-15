const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    if (err.name === "CastError") {
        const message = `Ressource not found ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    //Mongoose valor duplicado
    if (err.code === 11000) {
        const message = "Valor de campo duplicado ingresado";
        error = new ErrorResponse(message, 400);
    }

    //Mongoose validación error
    if (err.name === "ValidaciónError") {
        const message = Object.values(err.errors).map(val => ' ' + val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.codeStatus || 500).json({
        success: false,
        error: error.message || "server error"
    })

}

module.exports = errorHandler;