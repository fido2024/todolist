// Define cómo se ve un usuario en MongoDB

const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    // nombre de usuario único — no pueden existir dos iguales
    nombre: {
      type: String,
      required: true,
    },

    // email único — sirve para iniciar sesión
    email: {
      type: String,
      required: true,
      unique: true, // no pueden existir dos emails iguales
    },

    // contraseña — se guardará encriptada con bcryptjs
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Mongoose creará colección "usuarios" en MongoDB
const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;