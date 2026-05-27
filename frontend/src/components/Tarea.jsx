// Este componente muestra una tarea individual
// con opciones de completar y eliminar

const Tarea = ({ tarea, onActualizada }) => {

  // cambia el estado completado de la tarea (PATCH)
  const cambiarEstado = async () => {
    await fetch(`http://localhost:3000/api/tareas/${tarea._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completado: !tarea.completado }),
    });
    onActualizada();
  };

  // elimina la tarea (DELETE)
  const eliminarTarea = async () => {
    await fetch(`http://localhost:3000/api/tareas/${tarea._id}`, {
      method: "DELETE",
    });
    onActualizada();
  };

  return (
    <div>
      {/* si completado es true tacha el titulo */}
      <span style={{ textDecoration: tarea.completado ? "line-through" : "none" }}>
        {tarea.titulo}
      </span>

      <span> | {tarea.categoria}</span>
      <span> | {tarea.prioridad}</span>

      <button onClick={cambiarEstado}>
        {tarea.completado ? "Descompletar" : "Completar"}
      </button>

      <button onClick={eliminarTarea}>Eliminar</button>
    </div>
  );
};

export default Tarea;