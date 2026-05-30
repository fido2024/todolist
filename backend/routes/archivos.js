
const { Router } = require("express");
const router = Router();
const multer = require("multer");
const path = require("path");

const {
  obtenerArchivos,
  subirArchivo,
  descargarArchivo,
  eliminarArchivo,
} = require("../controllers/archivos");

// esta es la configuracion de multer le decimos dónde guardar los archivos cómo nombrarlos

const storage = multer.diskStorage({
  // destination: carpeta donde se guardan los archivos
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  // filename: cómo se nombra el archivo al guardarse
  // usamos la fecha actual para evitar duplicados
  filename: (req, file, cb) => {
    const fecha = Date.now();
    const extension = path.extname(file.originalname);
    const nombre = path.basename(file.originalname, extension);
    cb(null, `${nombre}-${fecha}${extension}`);
  },
});

const upload = multer({ storage });

// rutas
router.get("/", obtenerArchivos);                        // listar todos
router.post("/", upload.single("archivo"), subirArchivo); // subir
router.get("/:id", descargarArchivo);                    // descargar
router.delete("/:id", eliminarArchivo);                  // eliminar

module.exports = router;