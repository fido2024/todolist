const Archivo = require("../models/Archivo");
// path nos permite manejar rutas de archivos es una librería nativa de Node, no necesita instalarse
const path = require("path");

// Subir un archivo
const subirArchivo = async (req, res) => {
  try {
    // multer guarda el archivo en uploads/ y pone
    // la info en req.file
    if (!req.file) {
      return res.status(400).json({ mensaje: "No se envió ningún archivo" });
    }

    // guardamos los metadatos en MongoDB
    const nuevoArchivo = new Archivo({
      nombre: req.file.originalname,
      ruta: req.file.path,
      tipo: req.file.mimetype,
      tamaño: req.file.size,
    });

    await nuevoArchivo.save();

    res.set("Content-Type", "application/json");
    res.status(201).json(nuevoArchivo);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al subir el archivo", error });
  }
};

// Descargar un archivo
const descargarArchivo = async (req, res) => {
  try {
    const { id } = req.params;

    // buscamos el archivo en MongoDB por su id
    const archivo = await Archivo.findById(id);

    if (!archivo) {
      return res.status(404).json({ mensaje: "Archivo no encontrado" });
    }

    // res.download() envía el archivo físico al cliente
    // path.resolve convierte la ruta relativa en absoluta
    res.download(path.resolve(archivo.ruta), archivo.nombre);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al descargar el archivo", error });
  }
};

// Eliminar un archivo
const eliminarArchivo = async (req, res) => {
  try {
    const { id } = req.params;

    // buscamos el archivo en MongoDB
    const archivo = await Archivo.findById(id);

    if (!archivo) {
      return res.status(404).json({ mensaje: "Archivo no encontrado" });
    }

    // fs nos permite eliminar el archivo físico de uploads/
    // también es nativo de Node, no necesita instalarse
    const fs = require("fs");
    fs.unlinkSync(archivo.ruta);

    // eliminamos también los metadatos de MongoDB
    await Archivo.findByIdAndDelete(id);

    res.set("Content-Type", "application/json");
    res.status(200).json({ mensaje: "Archivo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el archivo", error });
  }
};

module.exports = {
  subirArchivo,
  descargarArchivo,
  eliminarArchivo,
};