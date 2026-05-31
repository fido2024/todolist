// Este componente maneja el formulario
// para crear una nueva tarea

import { useState } from "react";

const FormularioTarea = ({ onTareaCreada, token }) => {

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
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // agregamos el token
      },
      body: JSON.stringify({ titulo, categoria, prioridad }),
    });

    // limpiamos el formulario
    setTitulo("");
    setCategoria("personal");
    setPrioridad("media");

    // avisamos a App.jsx que se creó una tarea
    onTareaCreada();
  };

  const inputStyle = {
    padding: "10px 14px",
    border: "1px solid var(--borde)",
    borderRadius: "4px",
    fontSize: "14px",
    outline: "none",
    background: "var(--fondo)",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <input
        type="text"
        placeholder="Nueva tarea..."
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        style={{ ...inputStyle, width: "100%" }}
      />
      <div style={{ display: "flex", gap: "8px" }}>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          style={{ ...inputStyle, flex: 1 }}
        >
          <option value="personal">Personal</option>
          <option value="trabajo">Trabajo</option>
          <option value="estudio">Estudio</option>
          <option value="familia">Familia</option>
          <option value="salud">Salud</option>
          <option value="otros">Otros</option>
        </select>

        <select
          value={prioridad}
          onChange={(e) => setPrioridad(e.target.value)}
          style={{ ...inputStyle, flex: 1 }}
        >
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>

        <button
          onClick={crearTarea}
          style={{
            padding: "10px 20px",
            background: "var(--acento)",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default FormularioTarea;