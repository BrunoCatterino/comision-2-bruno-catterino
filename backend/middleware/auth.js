const errorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { token } = require("morgan");
const ErrorResponse = require("../utils/errorResponse");

// chequea que el usuario se autentica
exports.isAuthenticated = async (req, res, next) => {
  //Asegúrese de que exista el token
  if (!token) {
    return next(new ErrorResponse("Debes iniciar sesión...", 401));
  }

  try {
    // Verifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.User = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorRespons("Debes iniciar sesión", 401));
  }
};

//middleware para admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role === "user") {
    return next(
      new ErrorResponse("Acceso denegado, debes ser un administrador", 401)
    );
  }
  next();
};
