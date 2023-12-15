const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: [true, 'primer nombre requerido'],
        maxlength: 32,
    },

    email: {
        type: String,
        trim: true,
        required: [true, 'e-mail requerido'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Agregue un correo electrónico válido'
        ]
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'contraseña requerida'],
        minlength: [6, 'La contraseña debe tener al menos (6) caracteres'],
    },

    role: {
        type: String,
        default: 'usuario'
    }
}, { timestamps: true })


//encriptar contraseña antes de guardar
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})


// Compara la contraseña de usuario
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// devuelve un token JWT
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: 3600
    });
}


module.exports = mongoose.model('User', userSchema);