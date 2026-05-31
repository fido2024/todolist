
// aqui definimos el modelo de datos para los archivos que subamos a MongoDB

const mongoose = require("mongoose");

const archivoSchema = new mongoose.Schema(
  {
    usuario: {
    // ObjectId es el tipo de id que usa MongoDB
    // ref: "Usuario" indica que apunta al modelo Usuario
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
    },

    // nombre original del archivo
    nombre: {
      type: String,
      required: true,
    },

    // ruta donde está guardado físicamente
    ruta: {
      type: String,
      required: true,
    },

    // tipo de archivo (pdf, image/png, etc)
    tipo: {
      type: String,
      required: true,
    },

    // tamaño en bytes
    tamaño: {
      type: Number,
      required: true,
    },
  },
  // createdAt y updatedAt automáticos
  { timestamps: true }
);

// Mongoose creará colección "archivos" en MongoDB
const Archivo = mongoose.model("Archivo", archivoSchema);

module.exports = Archivo;