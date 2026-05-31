const Archivo = require("../models/Archivo");
const path = require("path");
const fs = require("fs");

// Listar archivos del usuario autenticado
const obtenerArchivos = async (req, res) => {
  try {
    // filtramos por usuario — solo sus archivos
    const archivos = await Archivo.find({ usuario: req.usuario._id });

    res.set("Content-Type", "application/json");
    res.set("X-Total-Count", archivos.length);
    res.set("Cache-Control", "no-cache");
    res.status(200).json(archivos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los archivos", error });
  }
};

// Subir un archivo asociado al usuario
const subirArchivo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ mensaje: "No se envió ningún archivo" });
    }

    const nuevoArchivo = new Archivo({
      nombre: req.file.originalname,
      ruta: req.file.path,
      tipo: req.file.mimetype,
      tamaño: req.file.size,
      usuario: req.usuario._id, // asociamos el archivo al usuario
    });

    await nuevoArchivo.save();
    res.set("Content-Type", "application/json");
    res.status(201).json(nuevoArchivo);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al subir el archivo", error });
  }
};

// Descargar un archivo del usuario
const descargarArchivo = async (req, res) => {
  try {
    const { id } = req.params;

    // verificamos que el archivo pertenezca al usuario
    const archivo = await Archivo.findOne({
      _id: id,
      usuario: req.usuario._id,
    });

    if (!archivo) {
      return res.status(404).json({ mensaje: "Archivo no encontrado" });
    }

    res.download(path.resolve(archivo.ruta), archivo.nombre);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al descargar el archivo", error });
  }
};

// Eliminar un archivo del usuario
const eliminarArchivo = async (req, res) => {
  try {
    const { id } = req.params;

    // verificamos que el archivo pertenezca al usuario
    const archivo = await Archivo.findOne({
      _id: id,
      usuario: req.usuario._id,
    });

    if (!archivo) {
      return res.status(404).json({ mensaje: "Archivo no encontrado" });
    }

    fs.unlinkSync(archivo.ruta);
    await Archivo.findByIdAndDelete(id);

    res.set("Content-Type", "application/json");
    res.status(200).json({ mensaje: "Archivo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el archivo", error });
  }
};

module.exports = {
  obtenerArchivos,
  subirArchivo,
  descargarArchivo,
  eliminarArchivo,
};