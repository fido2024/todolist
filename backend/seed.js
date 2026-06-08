// seed.js — Datos de prueba para MongoDB Atlas

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Usuario = require("./models/Usuario");
const Tarea = require("./models/Tarea");

const cargarDatos = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB para cargar datos de prueba");

    // limpiamos datos anteriores de prueba
    await Usuario.deleteMany({ email: "prueba@todolist.com" });
    await Tarea.deleteMany({ titulo: { $regex: "[PRUEBA]" } });

    // creamos usuario de prueba
    const passwordEncriptado = await bcrypt.hash("prueba123", 10);
    const usuario = await Usuario.create({
      nombre: "Usuario Prueba",
      email: "prueba@todolist.com",
      password: passwordEncriptado,
    });

    console.log("✅ Usuario de prueba creado");

    // creamos tareas de prueba
    await Tarea.insertMany([
      {
        titulo: "[PRUEBA] Estudiar para el examen",
        categoria: "estudio",
        prioridad: "alta",
        completado: false,
        usuario: usuario._id,
      },
      {
        titulo: "[PRUEBA] Ir al gimnasio",
        categoria: "salud",
        prioridad: "media",
        completado: false,
        usuario: usuario._id,
      },
      {
        titulo: "[PRUEBA] Llamar a mama",
        categoria: "familia",
        prioridad: "alta",
        completado: true,
        usuario: usuario._id,
      },
      {
        titulo: "[PRUEBA] Comprar víveres",
        categoria: "personal",
        prioridad: "baja",
        completado: false,
        usuario: usuario._id,
      },
      {
        titulo: "[PRUEBA] Revisar correos",
        categoria: "trabajo",
        prioridad: "media",
        completado: false,
        usuario: usuario._id,
      },
    ]);

    console.log("✅ Tareas de prueba creadas");
    console.log("----------------------------");
    console.log("Credenciales de prueba:");
    console.log("Email:    prueba@todolist.com");
    console.log("Password: prueba123");
    console.log("----------------------------");

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error al cargar datos:", error.message);
    mongoose.connection.close();
  }
};

cargarDatos();