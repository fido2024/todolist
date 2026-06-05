// Este componente muestra una tarea individual con opciones de completar y eliminar

//estos colores de prioridad los usamos para mostrar el color segun la prioridad de cada tarea
const coloresPrioridad = {
  alta: "#C0392B",
  media: "#E67E22",
  baja: "#27AE60",
};

const Tarea = ({ tarea, onActualizada, token }) => {

  // cambia el estado completado de la tarea (PATCH)
  const cambiarEstado = async () => {
    await fetch(`https://localhost:3000/api/tareas/${tarea._id}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // agregamos el token
      },
      body: JSON.stringify({ completado: !tarea.completado }),
    });
    onActualizada();
  };

  // elimina la tarea (DELETE)
  const eliminarTarea = async () => {
    await fetch(`https://localhost:3000/api/tareas/${tarea._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    onActualizada();
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 16px",
      border: "1px solid var(--borde)",
      borderRadius: "4px",
      background: tarea.completado ? "var(--fondo)" : "white",
    }}>
      {/* info de la tarea */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* círculo de completado */}
        <div
          onClick={cambiarEstado}
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            border: `2px solid ${tarea.completado ? "var(--acento)" : "var(--borde)"}`,
            background: tarea.completado ? "var(--acento)" : "transparent",
            cursor: "pointer",
            flexShrink: 0,
          }}
        />

        <div>
          <p style={{
            fontSize: "14px",
            textDecoration: tarea.completado ? "line-through" : "none",
            color: tarea.completado ? "var(--gris)" : "var(--texto)",
          }}>
            {tarea.titulo}
          </p>
          <p style={{ fontSize: "12px", color: "var(--gris)", marginTop: "2px" }}>
            {tarea.categoria} · {" "}
            <span style={{ color: coloresPrioridad[tarea.prioridad] }}>
              {tarea.prioridad}
            </span>
          </p>
        </div>
      </div>

      {/* botón eliminar */}
      <button
        onClick={eliminarTarea}
        style={{
          padding: "6px 12px",
          border: "1px solid var(--borde)",
          borderRadius: "4px",
          background: "#C0392B",
          fontSize: "12px",
          color: "#ffffff",
        }}
      >
        Eliminar
      </button>
    </div>
  );
};

export default Tarea;