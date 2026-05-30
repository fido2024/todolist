// Corazon del backend, aquí se configura el servidor, la conexión a la base de datos y las rutas
// la ia me dijo que lo ordenara así para que sea más fácil de entender

// dotenv lee el archivo .env y carga las variables
require("dotenv").config();

// librerías
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// rutas
const tareasRoutes = require("./routes/tareas");
const archivosRoutes = require("./routes/archivos");
const authRoutes = require("./routes/auth");


// creamos la app
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rutas
app.use("/api/tareas", tareasRoutes);
app.use("/api/archivos", archivosRoutes);
app.use("/api/auth", authRoutes);

// conexión a MongoDB y arranque del servidor
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar a MongoDB:", error.message);
  });