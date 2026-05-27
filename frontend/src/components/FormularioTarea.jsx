// Este componente maneja el formulario
// para crear una nueva tarea

import { useState } from "react";

const FormularioTarea = ({ onTareaCreada }) => {

  // guardamos lo que el usuario escribe
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("personal");
  const [prioridad, setPrioridad] = useState("media");

  const crearTarea = async () => {
    // si el titulo esta vacio no hacemos nada
    if (!titulo) return;

    // enviamos la nueva tarea al backend
    await fetch("http://localhost:3000/api/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, categoria, prioridad }),
    });

    // limpiamos el formulario
    setTitulo("");
    setCategoria("personal");
    setPrioridad("media");

    // avisamos a App.jsx que se creó una tarea
    onTareaCreada();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        <option value="personal">Personal</option>
        <option value="trabajo">Trabajo</option>
        <option value="estudio">Estudio</option>
        <option value="familia">Familia</option>
        <option value="salud">Salud</option>
        <option value="otros">Otros</option>
      </select>

      <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
        <option value="baja">Baja</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>

      <button onClick={crearTarea}>Agregar tarea</button>
    </div>
  );
};

export default FormularioTarea;