const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: [true, "Nombre requerido"],
      maxlength: 32,
    },

    email: {
      type: String,
      trim: true,
      require: [true, "El e-mail es requerido"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },

    password: {
      type: String,
      trim: true,
      require: [true, "Contraseña requerida"],
      minlength: [6, "La contraseña debe tener al menos (6) caracteres"],
    },

    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

//Encripta la contraseña antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//Compara la contraseña del User
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Devuelve el token JWT
userSchema.methods.getJwtToken = function () {
  return jwt.sing({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
};

module.exports = mongoose.model("user", userSchema);
