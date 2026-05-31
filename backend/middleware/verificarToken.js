// Ahora estoy usando passport-jwt para verificar el token

const passport = require("passport");

const verificarToken = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, usuario) => {
    if (err) {
      return res.status(500).json({ mensaje: "Error del servidor" });
    }

    if (!usuario) {
      return res.status(401).json({ mensaje: "Token inválido o expirado" });
    }

    // guardamos el usuario en req para usarlo en los controllers
    req.usuario = usuario;
    next();
  })(req, res, next);
};

module.exports = verificarToken;