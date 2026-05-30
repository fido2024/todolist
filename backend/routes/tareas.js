// La logica de cada ruta esta en controllers/tareas.js

const { Router } = require("express");
const router = Router();
// importamos el middleware que protege las rutas
const verificarToken = require("../middleware/verificarToken");

// Aca importo todos los metodos del controller
const {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  cambiarEstado,
  eliminarTarea,
} = require("../controllers/tareas");

// verificarToken protege todas las rutas
// sin token válido no se puede acceder
router.get("/", verificarToken, obtenerTareas);
router.post("/", verificarToken, crearTarea);
router.put("/:id", verificarToken, actualizarTarea);
router.patch("/:id", verificarToken, cambiarEstado);
router.delete("/:id", verificarToken, eliminarTarea);

module.exports = router;