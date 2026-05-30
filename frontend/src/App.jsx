//este archivo es el componente principal de la aplicación, donde se muestra la lista de tareas y el formulario para crear nuevas tareas

import { useState, useEffect } from "react";
import FormularioTarea from "./components/FormularioTarea";
import Tarea from "./components/Tarea";

const App = () => {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    obtenerTareas();
  }, []);

  const obtenerTareas = async () => {
    const respuesta = await fetch("http://localhost:3000/api/tareas");
    const datos = await respuesta.json();
    setTareas(datos);
  };

  return (
    <div>
      <h1>Mi Todo List</h1>

      {/* formulario para crear tareas */}
      <FormularioTarea onTareaCreada={obtenerTareas} />

      {/* lista de tareas */}
      {tareas.map((tarea) => (
        <Tarea
          key={tarea._id}
          tarea={tarea}
          onActualizada={obtenerTareas}
        />
      ))}
    </div>
  );
};

export default App;