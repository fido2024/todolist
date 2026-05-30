//este archivo es el componente principal de la aplicación, donde se muestra la lista de tareas y el formulario para crear nuevas tareas

import { useState, useEffect } from "react";
import FormularioTarea from "./components/FormularioTarea";
import Tarea from "./components/Tarea";
import FormularioArchivo from "./components/FormularioArchivo";
import ListaArchivos from "./components/ListaArchivos";


const App = () => {
  const [tareas, setTareas] = useState([]);
  const [archivos, setArchivos] = useState([]);
  useEffect(() => {
    obtenerTareas();
    obtenerArchivos();
  }, []);

  // obtiene todas las tareas del backend (GET)
  const obtenerTareas = async () => {
    const respuesta = await fetch("http://localhost:3000/api/tareas");
    const datos = await respuesta.json();
    setTareas(datos);
  };

  // obtiene todos los archivos del backend (GET)
  const obtenerArchivos = async () => {
    const respuesta = await fetch("http://localhost:3000/api/archivos");
    const datos = await respuesta.json();
    setArchivos(datos);
  };

return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>

      {/* columna izquierda — tareas */}
      <div style={{ flex: 1 }}>
        <h2>Tareas</h2>
        <FormularioTarea onTareaCreada={obtenerTareas} />
        {tareas.map((tarea) => (
          <Tarea
            key={tarea._id}
            tarea={tarea}
            onActualizada={obtenerTareas}
          />
        ))}
      </div>

      {/* columna derecha — archivos */}
      <div style={{ flex: 1 }}>
        <h2>Archivos</h2>
        <FormularioArchivo onArchivoSubido={obtenerArchivos} />
        <ListaArchivos
          archivos={archivos}
          onEliminado={obtenerArchivos}
        />
      </div>

    </div>
  );
};

export default App;