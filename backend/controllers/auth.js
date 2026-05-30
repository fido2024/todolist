const Usuario = require("../models/Usuario"); //importamos el modelo de usuario para interactuar con MongoDB

// jsonwebtoken genera y verifica tokens JWT
const jwt = require("jsonwebtoken");

// bcryptjs encripta contraseñas
const bcrypt = require("bcryptjs");

// Registrar un nuevo usuario
const registro = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // verificamos si el email ya existe en MongoDB
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ mensaje: "El email ya está registrado" });
    }

    // encriptamos la contraseña antes de guardarla
    // el 10 es el nivel de encriptación (saltRounds)
    const passwordEncriptado = await bcrypt.hash(password, 10);

    // creamos el usuario con la contraseña encriptada
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: passwordEncriptado,
    });

    await nuevoUsuario.save();

    res.set("Content-Type", "application/json");
    res.status(201).json({ mensaje: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al registrar usuario", error });
  }
};

// Iniciar sesión
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // buscamos el usuario por email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // comparamos la contraseña con la encriptada en MongoDB
    // bcrypt.compare desencripta y compara automáticamente
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    // generamos el token JWT
    // contiene el id del usuario y expira en 24 horas
    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.set("Content-Type", "application/json");
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al iniciar sesión", error });
  }
};

module.exports = { registro, login };