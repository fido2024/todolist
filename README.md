# TodoList - Proyecto Web

Aplicación web de lista de tareas con gestión de archivos.
Desarrollado con Node.js, Express, MongoDB y React.


---

## Requisitos previos

Antes de clonar el proyecto asegúrate de tener instalado:

- [Node.js](https://nodejs.org) v18 o superior
- [MongoDB Atlas](https://cloud.mongodb.com) cuenta configurada
- [Postman](https://www.postman.com) para probar la API

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/todolist.git
cd todolist
```

### 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 3. Instalar dependencias del frontend

```bash
cd ../frontend
npm install
```

---

## Configuración

### Configurar el archivo .env

Dentro de la carpeta `backend/` crea un archivo `.env`:

```
MONGO_URI=tu_string_de_conexion_de_mongodb_atlas
PORT=3000
```

> ⚠️ Este archivo no se sube a GitHub por seguridad.
> Debes crearlo manualmente cada vez que clones el proyecto.

### Carpeta uploads

La carpeta `uploads/` se crea automáticamente al clonar.
Ahí se guardan los archivos que se suben al servidor.
No necesitas configurar nada extra.

---

## Cómo correr el proyecto

Necesitas **dos terminales** abiertas al mismo tiempo:

### Terminal 1 — Backend

```bash
cd backend
npm run dev
```

Servidor corriendo en: `http://localhost:3000`

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Frontend corriendo en: `http://localhost:5173`

---

## Endpoints disponibles

### Tareas

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | /api/tareas | Obtener todas las tareas |
| POST | /api/tareas | Crear una tarea |
| PUT | /api/tareas/:id | Actualizar una tarea |
| PATCH | /api/tareas/:id | Cambiar estado completado |
| DELETE | /api/tareas/:id | Eliminar una tarea |

### Archivos (Drive)

| Método | URL | Descripción |
|--------|-----|-------------|
| POST | /api/archivos | Subir un archivo |
| GET | /api/archivos/:id | Descargar un archivo |
| DELETE | /api/archivos/:id | Eliminar un archivo |

---

## Estructura del proyecto

```
todolist/
  backend/
    controllers/   ← lógica del CRUD
    models/        ← esquemas de MongoDB
    routes/        ← endpoints de la API
    uploads/       ← archivos subidos
    app.js         ← servidor principal
  frontend/
    src/
      components/  ← componentes React
      App.jsx      ← componente principal
```