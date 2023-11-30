const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, rtes, next) => {
  let error = { ...err };

  if (err.name === "CastError") {
    const message = `Ressource not found ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //Mongoose valor duplicado
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ErrorResponse(message, 400);
  }

  //Mongoose error de validación
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => " " + val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.codeStatus || 500).json({
    success: false,
    error: error.message || "server error",
  });
};

module.exports = errorHandler;
