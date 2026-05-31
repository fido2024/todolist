// Muestra todos los archivos subidos con opciones de descargar y eliminar

const ListaArchivos = ({ archivos, onEliminado, token }) => {

  const eliminarArchivo = async (id) => {
    await fetch(`http://localhost:3000/api/archivos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    onEliminado();
  };

 const descargarArchivo = async (id, nombre) => {
    const respuesta = await fetch(`http://localhost:3000/api/archivos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // convertimos la respuesta en un blob (archivo binario)
    const blob = await respuesta.blob();

    // creamos un enlace temporal para descargar
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = nombre;
    link.click();

    // limpiamos el enlace temporal
    window.URL.revokeObjectURL(url);
  };

  // en estas fuentes se puede ver mas emojis segun el tipo de archivo :
  // Aqui buscar el termino en ingles: https://emojipedia.org/
  // Aqui solo copias el emoji o icono: https://getemoji.com/

  const iconoTipo = (tipo) => {
    if (
    tipo.includes("pdf") ||
    tipo.includes("presentation") ||  // pptx
    tipo.includes("spreadsheet") ||   // xlsx (excel)
    tipo.includes("word")             // docx
  ) return "🗎";
    if (tipo.includes("image")) return "🖼️";
    if (tipo.includes("video")) return "🎬";
    if (tipo.includes("audio")) return "🎵";
    return "📁";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {archivos.map((archivo) => (
        <div
          key={archivo._id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 16px",
            border: "1px solid var(--borde)",
            borderRadius: "4px",
            background: "white",
          }}
        >
          {/* info del archivo */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "20px" }}>{iconoTipo(archivo.tipo)}</span>
            <div>
              <p style={{ fontSize: "14px", fontWeight: "500" }}>
                {archivo.nombre}
              </p>
              <p style={{ fontSize: "12px", color: "var(--gris)", marginTop: "2px" }}>
                {(archivo.tamaño / 1024).toFixed(2)} KB · {archivo.nombre.split(".").pop().toUpperCase()}
              </p>
            </div>
          </div>

          {/* botones */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => descargarArchivo(archivo._id, archivo.nombre)}
              style={{
                padding: "6px 12px",
                border: "1px solid var(--acento)",
                borderRadius: "4px",
                background: "transparent",
                fontSize: "12px",
                color: "var(--acento)",
                cursor: "pointer",
              }}
            >
              Descargar
            </button>

            <button
              onClick={() => eliminarArchivo(archivo._id)}
              style={{
                padding: "6px 12px",
                border: "none",
                borderRadius: "4px",
                background: "#C0392B",
                fontSize: "12px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaArchivos;