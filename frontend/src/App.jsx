//este archivo nos permite mostrar las tareas y los archivos en la misma página, y también contiene los formularios para crear tareas y subir archivos, es el punto de entrada de nuestra aplicación frontend

import { useState, useEffect } from "react";
import FormularioTarea from "./components/FormularioTarea";
import Tarea from "./components/Tarea";
import FormularioArchivo from "./components/FormularioArchivo";
import ListaArchivos from "./components/ListaArchivos";
import Login from "./components/Login";
import Registro from "./components/Registro";

const App = () => {
  const [tareas, setTareas] = useState([]);
  const [archivos, setArchivos] = useState([]);
  // pantalla actual: "login", "registro", "app"
  const [pantalla, setPantalla] = useState("login");

  // al cargar verificamos si ya hay token guardado
  useEffect(() => {
    const token = localStorage.getItem("token"); //localStrategy o localstorage
    if (token) setPantalla("app");
  }, []);

  useEffect(() => {
    if (pantalla === "app") {
      obtenerTareas();
      obtenerArchivos();
    }
  }, [pantalla]); // cada vez que cambie la pantalla, volvemos a cargar los datos
  // obtenemos el token del localStorage para enviarlo en cada peticion
  const token = localStorage.getItem("token");

  // obtiene todas las tareas del backend (GET)
  const obtenerTareas = async () => {
    const respuesta = await fetch("http://localhost:3000/api/tareas", {
      cache: "no-cache",
      headers: { Authorization: `Bearer ${token}` },
    });
    const datos = await respuesta.json();
    setTareas(datos);
  };

  // obtiene todos los archivos del backend (GET)
  const obtenerArchivos = async () => {
    const respuesta = await fetch("http://localhost:3000/api/archivos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const datos = await respuesta.json();
    setArchivos(datos);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setPantalla("login");
  };

  // mostramos login o registro según la pantalla
  if (pantalla === "login") {
    return (
      <Login
        onLoginExitoso={() => setPantalla("app")}
        irARegistro={() => setPantalla("registro")}
      />
    );
  }

  if (pantalla === "registro") {
    return (
      <Registro
        onRegistroExitoso={() => setPantalla("login")}
        irALogin={() => setPantalla("login")}
      />
    );
  }

return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Mi TodoList</h1>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        {/* columna izquierda — tareas */}
        <div style={{ flex: 1 }}>
          <h2>Tareas</h2>
          <FormularioTarea onTareaCreada={obtenerTareas} token={token} />
          {tareas.map((tarea) => (
            <Tarea
              key={tarea._id}
              tarea={tarea}
              onActualizada={obtenerTareas}
              token={token}
            />
          ))}
        </div>

        {/* columna derecha — archivos */}
        <div style={{ flex: 1 }}>
          <h2>Archivos</h2>
          <FormularioArchivo onArchivoSubido={obtenerArchivos} token={token} />
          <ListaArchivos
            archivos={archivos}
            onEliminado={obtenerArchivos}
            token={token}
          />
        </div>
      </div>
    </div>
  );
};

export default App;