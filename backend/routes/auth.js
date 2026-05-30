const { Router } = require("express");
const router = Router();

const { registro, login } = require("../controllers/auth");

// ruta para registrar un nuevo usuario
router.post("/registro", registro);

// ruta para iniciar sesión y obtener el token
router.post("/login", login);

module.exports = router;