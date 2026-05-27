// Corazon del backend, aquí se configura el servidor, la conexión a la base de datos y las rutas

// dotenv lee el archivo .env y carga las variables
require("dotenv").config();

// cors permite que el frontend en otro puerto pueda comunicarse con el backend
const cors = require("cors");

// express es el framework que crea el servidor
const express = require("express");

// mongoose conecta Node.js con MongoDB
const mongoose = require("mongoose");

// Creamos la aplicación Express
const app = express();

// habilitamos cors para que React pueda hacer peticiones al backend sin ser bloqueado
app.use(cors());

// MIDDLEWARE
// express.json() le permite a Express leer peticiones con cuerpo JSON
app.use(express.json());

//si alguien pide el url, que busque en tareasRoutes , osea en esa ruta, y ahí se definen las rutas para las tareas
const tareasRoutes = require("./routes/tareas");
app.use("/api/tareas", tareasRoutes);

// configuramos el puerto y la URI de MongoDB desde las variables de entorno
const PORT = process.env.PORT || 3000; //leemos el puerto del .env o usamos el 3000 por defecto
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI) // primero verificamos que la URI de MongoDB esté bien configurada
  .then(() => {
    console.log(" Conectado a MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(` Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(" Error al conectar a MongoDB:", error.message);
  });