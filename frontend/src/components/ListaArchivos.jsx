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

  return (
    <div>
      {archivos.map((archivo) => (
        <div key={archivo._id}>
          <span>{archivo.nombre}</span>
          <span> | {archivo.tipo}</span>
          <span> | {(archivo.tamaño / 1024).toFixed(2)} KB</span>

          <button onClick={() => descargarArchivo(archivo._id, archivo.nombre)}>
            Descargar
          </button>
          <button onClick={() => eliminarArchivo(archivo._id)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListaArchivos;