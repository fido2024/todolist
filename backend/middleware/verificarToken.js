// Protege las rutas verificando que el token sea válido

const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  // el token viene en el header Authorization
  // formato: "Bearer eyJhbGci..."
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  // separamos "Bearer" del token real
  const token = authHeader.split(" ")[1];

  try {
    // verificamos que el token sea válido con JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // guardamos el id del usuario para usarlo en las rutas
    req.usuarioId = decoded.id;

    // next() permite continuar a la ruta protegida
    next();
  } catch (error) {
    res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};

module.exports = verificarToken;