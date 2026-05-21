
// todas las rutas relacionadas a tareas
const { Router } = require("express");
const router = Router();

// Importamos el modelo Tarea para saber como es la estructura de las tareas en la base de datos
const Tarea = require("../models/Tarea")

// metodo o endpoint POST para crear una nueva tarea, recibe el titulo, categoria y prioridad en el cuerpo de la peticion
router.post("/", async (req, res) => {
  try {
    const { titulo, categoria, prioridad } = req.body;

    const nuevaTarea = new Tarea({ titulo, categoria, prioridad });

    await nuevaTarea.save();

    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la tarea", error });
  }
});

// metodo o endpoint GET para obtener todas las tareas, no recibe nada en el cuerpo de la peticion
router.get("/", async (req, res) => {
  try {
    // .find() sin filtros trae TODAS las tareas
    const tareas = await Tarea.find();

    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las tareas", error });
  }
});

// metodo o endpoint PUT para actualizar una tarea, recibe el id de la tarea a actualizar en la URL y el titulo, categoria y prioridad en el cuerpo de la peticion
router.put("/:id", async (req, res) => {
  try {
    // req.params.id captura el id que viene en la URL
    // ejemplo: /api/tareas/abc123 → id = "abc123"
    const { id } = req.params;
    const { titulo, completado, categoria, prioridad } = req.body;

    const tareaActualizada = await Tarea.findByIdAndUpdate(
      id,
      { titulo, completado, categoria, prioridad },
      { new: true } // devuelve la tarea ya actualizada
    );

    if (!tareaActualizada) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    res.status(200).json(tareaActualizada);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la tarea", error });
  }
});

// metodo o endpoint DELETE para eliminar una tarea, recibe el id de la tarea a eliminar en la URL
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const tareaEliminada = await Tarea.findByIdAndDelete(id);

    if (!tareaEliminada) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    res.status(200).json({ mensaje: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la tarea", error });
  }
});

// Exportamos el router para usarlo en app.js
module.exports = router;