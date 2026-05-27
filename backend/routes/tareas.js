// La logica de cada ruta esta en controllers/tareas.js

const { Router } = require("express");
const router = Router();

// Aca importo todos los metodos del controller
const {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  cambiarEstado,
  eliminarTarea,
} = require("../controllers/tareas");

// se añadio un nuevo endpoint para cambiar solo el estado de la tarea, sin necesidad de enviar el titulo o descripcion
router.get("/", obtenerTareas);
router.post("/", crearTarea);
router.put("/:id", actualizarTarea);
router.patch("/:id", cambiarEstado);
router.delete("/:id", eliminarTarea);

module.exports = router;