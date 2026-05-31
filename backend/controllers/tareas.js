// Importamos el modelo para hablar con MongoDB
const Tarea = require("../models/Tarea");
const etag = require("etag");

// Obtener tareas del usuario autenticado
const obtenerTareas = async (req, res) => {
  try {
    // filtramos por usuario — solo sus tareas
    const tareas = await Tarea.find({ usuario: req.usuario._id });

    const et = etag(JSON.stringify(tareas));
    if (req.headers["if-none-match"] === et) {
      return res.status(304).end();
    }

    res.set("Cache-Control", "no-cache");
    res.set("ETag", et);
    res.set("Content-Type", "application/json");
    res.set("X-Total-Count", tareas.length);
    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las tareas", error });
  }
};

// Crear una nueva tarea asociada al usuario
const crearTarea = async (req, res) => {
  try {
    const { titulo, categoria, prioridad } = req.body;

    const nuevaTarea = new Tarea({
      titulo,
      categoria,
      prioridad,
      usuario: req.usuario._id, // asociamos la tarea al usuario
    });

    await nuevaTarea.save();
    res.set("Content-Type", "application/json");
    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la tarea", error });
  }
};

// Actualizar una tarea del usuario
const actualizarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, completado, categoria, prioridad } = req.body;

    // verificamos que la tarea pertenezca al usuario
    const tareaActualizada = await Tarea.findOneAndUpdate(
      { _id: id, usuario: req.usuario._id },
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

// Cambiar solo el estado completado
const cambiarEstado = async (req, res) => {
  try {
    const { id } = req.params;
    const { completado } = req.body;

    // verificamos que la tarea pertenezca al usuario
    const tareaActualizada = await Tarea.findOneAndUpdate(
      { _id: id, usuario: req.usuario._id },
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

// Eliminar una tarea del usuario
const eliminarTarea = async (req, res) => {
  try {
    const { id } = req.params;

    // verificamos que la tarea pertenezca al usuario
    const tareaEliminada = await Tarea.findOneAndDelete({
      _id: id,
      usuario: req.usuario._id,
    });

    if (!tareaEliminada) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    res.set("Content-Type", "application/json");
    res.status(200).json({ mensaje: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la tarea", error });
  }
};

module.exports = {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  cambiarEstado,
  eliminarTarea,
};