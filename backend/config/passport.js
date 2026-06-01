// Aquí configuramos las estrategias de autenticación

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");


// LOCAL STRATEGY Verifica email y password cuando el usuario intenta iniciar sesión
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // usamos email en lugar de username
      passwordField: "password",
    },

    async (email, password, done) => {
      try {
        // buscamos el usuario por email
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
          return done(null, false, { mensaje: "Usuario no encontrado" });
        }

        // verificamos la contraseña
        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
          return done(null, false, { mensaje: "Contraseña incorrecta" });
        }

        // si todo está bien devolvemos el usuario
        return done(null, usuario);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// JWT STRATEGY Verifica el token JWT en cada petición protegida (como /api/tareas o /api/archivos)

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        // buscamos el usuario por el id que viene en el token
        const usuario = await Usuario.findById(payload.id);
        if (!usuario) {
          return done(null, false);
        }
        return done(null, usuario);
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = passport;