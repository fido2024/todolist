// Ahora se usa Passport localStrategy para verificar el usuario

const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Registrar un nuevo usuario
// esto no cambia — passport no maneja el registro
const registro = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ mensaje: "El email ya está registrado" });
    }

    //aqui usamos bcrypt para encriptar la contraseña antes de guardarla en la base de datos, para que el usuario se sienta seguro al saber que su contraseña no se guarda en texto plano
    const passwordEncriptado = await bcrypt.hash(password, 10); //10 es el estándar de seguridad recomendado para el salt rounds
    
    //una vez que se encripte la contraseña, se crea un nuevo usuario con el modelo de Mongoose y se guarda en la base de datos. Si todo sale bien, se devuelve un mensaje de éxito al cliente. Si ocurre algún error, se devuelve un mensaje de error con el detalle del mismo.
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

// Iniciar sesión usando passport localStrategy
const login = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, usuario, info) => {
    if (err) {
      return res.status(500).json({ mensaje: "Error del servidor" });
    }

    if (!usuario) {
      // info.mensaje viene de done(null, false, { mensaje: "..." })
      return res.status(401).json({ mensaje: info.mensaje });
    }

    // generamos el token JWT con el id del usuario
    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" } // el token expira en 24 horas
    );

    res.set("Content-Type", "application/json");
    res.status(200).json({ token });
  })(req, res, next);
};

module.exports = { registro, login };