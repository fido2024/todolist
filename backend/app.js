// app.js — Servidor principal
// Ayudado por Claude (Anthropic)

// dotenv lee el archivo .env y carga las variables
// como MONGO_URI para no escribir contraseñas en el código
require("dotenv").config();

// express es el framework que crea el servidor
const express = require("express");

// mongoose conecta Node.js con MongoDB
const mongoose = require("mongoose");