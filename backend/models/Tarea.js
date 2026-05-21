// Importamos mongoose para poder crear el esquema
const mongoose = require("mongoose");

// este es el esquema de la tarea, define como se ve cada tarea en la base de datos, con que datos
const tareaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },

    completado: {
      type: Boolean,
      default: false,
    },

    categoria:{
        type: String,
        enum: ["trabajo", "personal", "estudio", "familia", "salud", "otros"],
        default: "personal",
    },

    prioridad: {
      type: String,
      enum: ["baja", "media", "alta"],
      default: "media",
    },
  },

  // esto me recomendo la ia, que nos sirve para ver cuando se creo la tarea y cuando se actualizo por ultima vez
  { timestamps: true }
);

// Mongoose creará una colección llamada "tareas" en MongoDB, Moongose crea en version plural y minuscula el nombre del modelo
const Tarea = mongoose.model("Tarea", tareaSchema);


module.exports = Tarea; // es la forma para exportar , y luego importar este modelo en otros archivos