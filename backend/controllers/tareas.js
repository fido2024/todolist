// Importamos el modelo para hablar con MongoDB
const Tarea = require("../models/Tarea");

// Obtener todas las tareas
// req = la petición que llega
// res = la respuesta que enviamos
const obtenerTareas = async (req, res) => {
  try {
    const tareas = await Tarea.find();

    // Agregamos headers a la respuesta
    // Content-Type indica que respondemos en JSON
    // X-Total-Count indica cuantas tareas hay
    res.set("Content-Type", "application/json");
    res.set("X-Total-Count", tareas.length);

    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las tareas", error });
  }
};

// Crear una nueva tarea
const crearTarea = async (req, res) => {
  try {
    const { titulo, categoria, prioridad } = req.body;

    const nuevaTarea = new Tarea({ titulo, categoria, prioridad });
    await nuevaTarea.save();

    res.set("Content-Type", "application/json");
    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la tarea", error });
  }
};

// Actualizar una tarea existente
const actualizarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, completado, categoria, prioridad } = req.body;

    const tareaActualizada = await Tarea.findByIdAndUpdate(
      id,
      { titulo, completado, categoria, prioridad },
      { returnDocument: "after" }
    );

    if (!tareaActualizada) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    res.set("Content-Type", "application/json");
    res.status(200).json(tareaActualizada);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la tarea", error });
  }
};

// Eliminar una tarea
const eliminarTarea = async (req, res) => {
  try {
    const { id } = req.params;

    const tareaEliminada = await Tarea.findByIdAndDelete(id);

    if (!tareaEliminada) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    res.set("Content-Type", "application/json");
    res.status(200).json({ mensaje: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la tarea", error });
  }
};

// Actualizar solo el campo completado de una tarea
const cambiarEstado = async (req, res) => {
  try {
    const { id } = req.params;

    // Solo tomamos completado del body
    // no necesitamos los demás campos
    const { completado } = req.body;

    const tareaActualizada = await Tarea.findByIdAndUpdate(
      id,
      { completado },
      { returnDocument: "after" }
    );

    if (!tareaActualizada) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    res.set("Content-Type", "application/json");
    res.status(200).json(tareaActualizada);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al cambiar estado de la tarea", error });
  }
};

//exportamos todos los metodos para usarlos en las rutas
module.exports = {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  cambiarEstado,
  eliminarTarea,
};