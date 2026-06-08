# TodoList - Proyecto Web

Aplicación web de lista de tareas con gestión de archivos.
Desarrollado con Node.js, Express, MongoDB Atlas y React.

---

## Requisitos previos

Antes de clonar el proyecto asegúrate de tener instalado:

- [Node.js](https://nodejs.org) v18 o superior
- [MongoDB Atlas](https://cloud.mongodb.com) cuenta configurada (opcional, ver opción Docker)
- [Docker](https://www.docker.com) para correr MongoDB localmente (opcional)
- [Postman](https://www.postman.com) para probar la API (opcional)

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

Dentro de la carpeta `backend/` crea un archivo `.env` con estas variables:

```
MONGO_URI=aqui_va_tu_string_de_conexion_de_mongodb_atlas_o_docker_local
PORT=3000
JWT_SECRET=aqui_va_tu_clave_secreta_para_firmar_tokens
```

> ⚠️ Este archivo NO se sube a GitHub por seguridad.
> Debes crearlo manualmente cada vez que clones el proyecto.

**¿Cómo obtener el MONGO_URI?**
1. Entra a [MongoDB Atlas](https://cloud.mongodb.com)
2. Cluster → Connect → Drivers
3. Copia el string de conexión y reemplaza `<password>` con tu contraseña

**¿Qué valor usar para JWT_SECRET?**

Puede ser cualquier texto largo y seguro, por ejemplo:
```
JWT_SECRET=miProyecto2026ClaveSecreta!
```

---

## Opción con Docker (MongoDB local)

Si no tienes MongoDB Atlas puedes usar Docker para correr MongoDB localmente.
El mismo comando funciona en Windows, Mac y Linux.

### 1. Correr MongoDB con Docker

```bash
docker run -d -p 27017:27017 --name mongo mongo
```

### 2. Configurar el .env con MongoDB local

```
MONGO_URI=mongodb://localhost:27017/todolist
PORT=3000
JWT_SECRET=aqui_va_tu_clave_secreta
```

### 3. Cargar datos de prueba

```bash
cd backend
node seed.js
```

> ⚠️ Nota: Si usas MongoDB Atlas en otra red y la conexión falla,
> usa la cadena de conexión sin SRV:
> `mongodb://usuario:password@host:27017/todolist`
> en lugar de `mongodb+srv://...`

---

## Generar certificados HTTPS (Windows)

El proyecto usa HTTPS. Debes generar los certificados en tu máquina.

### 1. Descargar mkcert para Windows

Descarga el ejecutable desde:
```
https://github.com/FiloSottile/mkcert/releases/latest
```

Descarga: `mkcert-v*-windows-amd64.exe`

### 2. Renombrar y mover

- Renombra el archivo a `mkcert.exe`
- Muévelo dentro de la carpeta `backend/`

### 3. Instalar el certificado raíz (como Administrador)

Abre la terminal como **Administrador** dentro de `backend/` y corre:

```bash
.\mkcert.exe -install
```

### 4. Generar los certificados

```bash
.\mkcert.exe -key-file key.pem -cert-file cert.pem localhost
```

Esto crea dos archivos en `backend/`:
- `key.pem` → clave privada
- `cert.pem` → certificado

> ⚠️ Estos archivos NO se suben a GitHub. Cada desarrollador genera los suyos.

---

## Generar certificados HTTPS (macOS)

### 1. Instalar mkcert con Homebrew

```bash
brew install mkcert
```

### 2. Instalar el certificado raíz

```bash
mkcert -install
```

### 3. Generar los certificados dentro de `backend/`

```bash
cd backend
mkcert -key-file key.pem -cert-file cert.pem localhost
```

Esto crea dos archivos en `backend/`:
- `key.pem` → clave privada
- `cert.pem` → certificado

> ⚠️ Estos archivos NO se suben a GitHub. Cada desarrollador genera los suyos.

---

## Cargar datos de prueba

El proyecto incluye un archivo `seed.js` para cargar datos de prueba en MongoDB:

```bash
cd backend
node seed.js
```

Esto crea:
- 1 usuario de prueba
- 5 tareas de prueba

**Credenciales del usuario de prueba:**
```
Email:    prueba@todolist.com
Password: prueba123
```

---

## Cómo correr el proyecto

Necesitas **dos terminales** abiertas al mismo tiempo:

### Terminal 1 — Backend

```bash
cd backend
npm run dev
```

Servidor corriendo en: `https://localhost:3000`

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Frontend corriendo en: `https://localhost:5173`

> ⚠️ Al abrir el navegador puede aparecer una advertencia de certificado.
> Haz clic en "Avanzado" → "Continuar a localhost" para aceptarlo.

---

## Endpoints disponibles

> Todos los endpoints excepto registro y login requieren el header:
> `Authorization: Bearer <token>`

### Auth

| Método | URL | Descripción |
|--------|-----|-------------|
| POST | /api/auth/registro | Registrar usuario |
| POST | /api/auth/login | Iniciar sesión y obtener token |

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
| GET | /api/archivos | Listar todos los archivos |
| POST | /api/archivos | Subir un archivo |
| GET | /api/archivos/:id | Descargar un archivo |
| DELETE | /api/archivos/:id | Eliminar un archivo |

---

## Estructura del proyecto

```
todolist/
  backend/
    config/        ← configuración de passport
    controllers/   ← lógica del CRUD
    middleware/    ← verificación de token JWT
    models/        ← esquemas de MongoDB
    routes/        ← endpoints de la API
    uploads/       ← archivos subidos (vacío en repo)
    app.js         ← servidor principal
    seed.js        ← datos de prueba
  frontend/
    src/
      components/  ← componentes React
      App.jsx      ← componente principal
```