

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
  const [paginaTareas, setPaginaTareas] = useState(1);
  
  const [paginaArchivos, setPaginaArchivos] = useState(1);
  
  // pantalla actual: "login", "registro", "app"
  const [pantalla, setPantalla] = useState("login");
  
  //aca podemos controlar cuantas tareas o archivos se muestran por página, si queremos mostrar mas, solo cambiamos este numero
  const TAREAS_POR_PAGINA = 5; 
  const ARCHIVOS_POR_PAGINA = 5;
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
  
  // si la página actual queda vacía después de eliminar, volvemos a la anterior
  useEffect(() => {
    if (paginaTareas > 1 && tareasPaginadas.length === 0) {
    setPaginaTareas(p => p - 1);
    }
  }, [tareas]);

    // igual para archivos
  useEffect(() => {
    if (paginaArchivos > 1 && archivosPaginados.length === 0) {
    setPaginaArchivos(p => p - 1);
    }
  }, [archivos]);

  // obtiene todas las tareas del backend (GET)
  const obtenerTareas = async () => {
    const token = localStorage.getItem("token"); // lee el token fresco
    const respuesta = await fetch("https://localhost:3000/api/tareas", {
      cache: "no-cache",
      headers: { Authorization: `Bearer ${token}` },
    });

    // si el token expiró mandamos al login
    if (respuesta.status === 401) {
      cerrarSesion();
      return;
    }

    const datos = await respuesta.json();
    setTareas(datos);
  };

  // obtiene todos los archivos del backend (GET)
  const obtenerArchivos = async () => {
    const token = localStorage.getItem("token"); // lee el token fresco
    const respuesta = await fetch("https://localhost:3000/api/archivos", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (respuesta.status === 401) {
      cerrarSesion();
      return;
    }

    const datos = await respuesta.json();
    setArchivos(datos);
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

// si estamos en la pantalla de la app, mostramos las tareas y archivos
const cerrarSesion = () => {
    localStorage.removeItem("token");
    setPantalla("login");
  };

// obtenemos el token del localStorage para enviarlo en cada peticion
  const token = localStorage.getItem("token");

  const tareasPaginadas = tareas.slice(
      (paginaTareas - 1) * TAREAS_POR_PAGINA,
      paginaTareas * TAREAS_POR_PAGINA
    );
    const totalPaginasTareas = Math.ceil(tareas.length / TAREAS_POR_PAGINA);

    const archivosPaginados = archivos.slice(
      (paginaArchivos - 1) * ARCHIVOS_POR_PAGINA,
      paginaArchivos * ARCHIVOS_POR_PAGINA
    );
  const totalPaginasArchivos = Math.ceil(archivos.length / ARCHIVOS_POR_PAGINA);

return (
    <div style={{ minHeight: "100vh", background: "var(--fondo)" }}>

      {/* header */}
      <div style={{
        padding: "20px 40px",
        borderBottom: "1px solid var(--borde)",
        background: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <h1 style={{ fontSize: "24px" }}>TodoList</h1>
        <button onClick={cerrarSesion} style={{
          padding: "8px 16px",
          border: "1px solid var(--borde)",
          borderRadius: "4px",
          background: "transparent",
          fontSize: "13px",
          color: "var(--gris)",
        }}>
          Cerrar sesión
        </button>
      </div>

      {/* contenido principal */}
      <div style={{
        display: "flex",
        gap: "1px",
        background: "var(--borde)",
        minHeight: "calc(100vh - 65px)",
      }}>

        {/* columna izquierda — tareas */}
        <div style={{ flex: 1, background: "white", padding: "32px" }}>
          <h2 style={{ fontSize: "20px", marginBottom: "24px" }}>Tareas</h2>
          <FormularioTarea onTareaCreada={obtenerTareas} token={token} />
          <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {tareasPaginadas.map((tarea) => (
              <Tarea key={tarea._id} tarea={tarea} onActualizada={obtenerTareas} token={token} />
            ))}
          </div>

          {/* paginación tareas — solo aparece si hay más de 5 */}
          {totalPaginasTareas > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
              <button
                onClick={() => setPaginaTareas(p => p - 1)}
                disabled={paginaTareas === 1}
                style={{
                  padding: "6px 12px",
                  border: "1px solid var(--borde)",
                  borderRadius: "4px",
                  background: "transparent",
                  cursor: paginaTareas === 1 ? "not-allowed" : "pointer",
                  color: paginaTareas === 1 ? "var(--gris)" : "var(--texto)",
                }}
              >← Anterior</button>

              <span style={{ padding: "6px 12px", fontSize: "14px", color: "var(--gris)" }}>
                {paginaTareas} / {totalPaginasTareas}
              </span>

              <button
                onClick={() => setPaginaTareas(p => p + 1)}
                disabled={paginaTareas === totalPaginasTareas}
                style={{
                  padding: "6px 12px",
                  border: "1px solid var(--borde)",
                  borderRadius: "4px",
                  background: "transparent",
                  cursor: paginaTareas === totalPaginasTareas ? "not-allowed" : "pointer",
                  color: paginaTareas === totalPaginasTareas ? "var(--gris)" : "var(--texto)",
                }}
              >Siguiente →</button>
            </div>
          )}
        </div>

        {/* columna derecha — archivos */}
        <div style={{ flex: 1, background: "white", padding: "32px" }}>
          <h2 style={{ fontSize: "20px", marginBottom: "24px" }}>Archivos Drive</h2>
          <FormularioArchivo onArchivoSubido={obtenerArchivos} token={token} />
          <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <ListaArchivos archivos={archivosPaginados} onEliminado={obtenerArchivos} token={token} />
          </div>

          {/* paginación archivos — solo aparece si hay más de 5 */}
          {totalPaginasArchivos > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
              <button
                onClick={() => setPaginaArchivos(p => p - 1)}
                disabled={paginaArchivos === 1}
                style={{
                  padding: "6px 12px",
                  border: "1px solid var(--borde)",
                  borderRadius: "4px",
                  background: "transparent",
                  cursor: paginaArchivos === 1 ? "not-allowed" : "pointer",
                  color: paginaArchivos === 1 ? "var(--gris)" : "var(--texto)",
                }}
              >← Anterior</button>

              <span style={{ padding: "6px 12px", fontSize: "14px", color: "var(--gris)" }}>
                {paginaArchivos} / {totalPaginasArchivos}
              </span>

              <button
                onClick={() => setPaginaArchivos(p => p + 1)}
                disabled={paginaArchivos === totalPaginasArchivos}
                style={{
                  padding: "6px 12px",
                  border: "1px solid var(--borde)",
                  borderRadius: "4px",
                  background: "transparent",
                  cursor: paginaArchivos === totalPaginasArchivos ? "not-allowed" : "pointer",
                  color: paginaArchivos === totalPaginasArchivos ? "var(--gris)" : "var(--texto)",
                }}
              >Siguiente →</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default App;